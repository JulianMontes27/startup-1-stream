"use client";

import MyMap from "@/components/map/test-map";
import { useEffect, useRef } from "react";

const TestPage = () => {
  const isInitialized = useRef(false);
  useEffect(() => {
    isInitialized.current = true;
    return () => {
      isInitialized.current = false;
    };
  }, []);
  if (!isInitialized) return null;
  return <div><MyMap /></div>;
};

export default TestPage;
