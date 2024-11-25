import React, { useEffect, useRef } from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import L from "leaflet";

interface ActualMapProps {
  category: string;
  userLocation: { latitude: number; longitude: number } | undefined;
}

const ActualMap: React.FC<ActualMapProps> = ({ category, userLocation }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  if (userLocation === undefined) {
    return <div>No user location.</div>;
  }

  useEffect(() => {
    if (mapInstanceRef.current) return; // Prevent multiple initializations

    if (mapContainerRef.current) {
      // Initialize map only if the container is available
      mapInstanceRef.current = L.map(mapContainerRef.current).setView(
        [userLocation.latitude, userLocation.longitude], //users location
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      // Adding a marker to the map
      L.marker([userLocation.latitude, userLocation.longitude])
        .addTo(mapInstanceRef.current)
        .bindPopup("This is a marker!");
    }

    return () => {
      // Cleanup map instance on component unmount
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Ensure correct dimensions and map updates
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize(); // Recalculate map size
    }
  }, []); // Empty dependency ensures this only runs once after initialization

  return (
    <div
      ref={mapContainerRef}
      style={{ height: "500px", width: "100%" }} // Full width and height
    />
  );
};

export default ActualMap;
