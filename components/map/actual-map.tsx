"use client";
import React, { useEffect } from "react";
import L from "leaflet";

const ActualMapComponent = () => {
  useEffect(() => {
    const map = L.map("map").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default ActualMapComponent;
