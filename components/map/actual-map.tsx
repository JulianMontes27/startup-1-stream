import React, { useEffect, useRef } from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import L from "leaflet";

const ActualMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapInstanceRef.current) return; // Prevent multiple initializations

    if (mapContainerRef.current) {
      // Initialize map only if the container is available
      mapInstanceRef.current = L.map(mapContainerRef.current).setView(
        [10.391, -75.4797], // Coordinates for Cartagena, Colombia
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      // Adding a marker to the map
      L.marker([51.505, -0.09])
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
