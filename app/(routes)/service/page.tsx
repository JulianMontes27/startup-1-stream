"use client";

import { getLocation } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

// Dynamically import the map component (disable SSR)
const MapComponent = dynamic(() => import("@/components/map/actual-map"), {
  ssr: false,
});

const MapPage: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  // Use React Query to fetch and manage location data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["location"],
    queryFn: getLocation,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: false,
  });

  if (!category) {
    return <div>No category to search for.</div>;
  }

  if (isLoading) {
    return <div>Loading your location...</div>;
  }

  if (isError) {
    return <div>Failed to fetch your location. Please enable geolocation.</div>;
  }

  return (
    <div className="p-3 mt-4">
      <MapComponent category={category} userLocation={data} />
    </div>
  );
};

export default MapPage;
