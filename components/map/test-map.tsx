import dynamic from "next/dynamic";
const map = dynamic(() => import("@/components/map/actual-map"), {
  ssr: false,
});
