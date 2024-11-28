"use client";

import { getLocation } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { getNearbyServicesByCategory } from "@/lib/utils";

// Dynamically import the map component (disable SSR)
const MapComponent = dynamic(() => import("@/components/map/actual-map"), {
  ssr: false,
});

const MapPage: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // Use React Query to fetch user's location
  const locationQuery = useQuery({
    queryKey: ["location"],
    queryFn: getLocation,
    retry: false,
  });

  // Use React Query to fetch nearby services
  const servicesQuery = useQuery({
    queryKey: ["nearbyServices", locationQuery.data, category],
    queryFn: async () => {
      if (!locationQuery.data || !category) throw new Error("Invalid inputs");
      const radius = 7000; // 5 km
      return getNearbyServicesByCategory(locationQuery.data, category, radius);
    },
    staleTime: 0,
    enabled: !!locationQuery.data && !!category, // Only fetch services if location and category are available
  });

  if (!category) {
    return <div>No category to search for.</div>;
  }

  if (locationQuery.isLoading) {
    return <div>Loading your location...</div>;
  }

  if (locationQuery.isError) {
    return <div>Failed to fetch your location. Please enable geolocation.</div>;
  }

  if (servicesQuery.isLoading) {
    return <div>Loading services near you...</div>;
  }

  if (servicesQuery.isError) {
    return <div>Failed to fetch services. Please try again later.</div>;
  }

  return (
    <div className="p-3 mt-4">
      <MapComponent
        category={category}
        userLocation={locationQuery.data}
        services={servicesQuery.data?.data} // Pass services data to the map component
      />
    </div>
  );
};

export default MapPage;
