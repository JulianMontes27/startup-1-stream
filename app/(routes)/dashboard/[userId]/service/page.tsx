"use client";

import dynamic from "next/dynamic";

// Dynamically import the map component (disable SSR)
const MapComponent = dynamic(() => import("@/components/map/actual-map"), {
  ssr: false,
});

const TestMapPage: React.FC = () => {
  return (
    <div className="p-7 mt-4">
      <h1>Leaflet Map Example</h1>
      <MapComponent />
    </div>
  );
};

export default TestMapPage;
