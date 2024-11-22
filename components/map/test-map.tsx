// components/map/TestMap.tsx
import dynamic from "next/dynamic";
const DynamicMap = dynamic(() => import("@/components/map/actual-map"), {
  ssr: false, // Disable server-side rendering
});

export default DynamicMap;
