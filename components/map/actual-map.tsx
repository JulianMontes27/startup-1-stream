import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";
import { Location, Service } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ActualMapProps {
  category: string;
  userLocation: { latitude: number; longitude: number } | undefined;
  services: (Service & { location: Location })[];
}

// Summary of How It All Works:
// Initialization: The map is initialized once during component mount, and markers are added when services data is available. Each marker corresponds to a service on the map.
// Reactivity: When the services data changes (e.g., after a category change or location update), the useEffect hooked to services updates the map by:
// Clearing the previous markers.
// Adding new markers corresponding to the updated services.
// Efficient Cleanup: Previous markers are cleaned up using marker.remove() to ensure no memory leaks or redundant markers on the map.
// State Persistence: Using useRef for both the map instance and markers allows these values to persist between re-renders, ensuring proper map behavior and cleanup without unnecessary reinitializations.
const ActualMap: React.FC<ActualMapProps> = ({ userLocation, services }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]); // To store markers for cleanup

  const router = useRouter();

  if (userLocation === undefined) {
    return <div>No user location.</div>;
  }

  // Initialize map only once
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
    }

    return () => {
      // Cleanup map instance on component unmount
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []); // Only run once after component mount

  // Add or update markers when services change
  useEffect(() => {
    if (mapInstanceRef.current && services.length > 0) {
      // Remove old markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = []; // Clear the markers array

      // Add new markers
      services.forEach((service) => {
        const marker = L.marker([
          service.location.latitude,
          service.location.longitude,
        ])
          .addTo(mapInstanceRef.current!)
          .bindPopup(service.title || "Service")
          .on("click", () => {
            router.push(`/service/${service.id}`);
          });

        markersRef.current.push(marker); // Store marker reference for cleanup
      });
    }
  }, [services]); // Only re-run when services change

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
