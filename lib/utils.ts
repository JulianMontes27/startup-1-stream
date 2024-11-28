import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("We need your geolocation permission.", error);
          reject(new Error("Geolocation permission denied."));
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

interface Location {
  latitude: number;
  longitude: number;
}

export const getNearbyServicesByCategory = async (
  location: Location,
  category: string,
  radiusInMeters: number
) => {
  // Earth's radius in kilometers
  const EARTH_RADIUS_KM = 6371;

  // Convert radius to kilometers
  const radiusInKm = radiusInMeters / 1000;

  // Calculate bounding box
  const latDiff = radiusInKm / EARTH_RADIUS_KM;
  const lonDiff =
    radiusInKm /
    (EARTH_RADIUS_KM * Math.cos((Math.PI / 180) * location.latitude));

  const minLat = location.latitude - latDiff;
  const maxLat = location.latitude + latDiff;
  const minLon = location.longitude - lonDiff;
  const maxLon = location.longitude + lonDiff;

  // Query services within the bounding box
  const body = {
    category: category.toUpperCase(),
    location,
    minLat,
    maxLat,
    maxLon,
    minLon,
  };
  const services = await axios.post("/api/services/bounding-box", body);

  return services;
};

export const getAddressFromCoordinates = async (
  lat: number = 0.0,
  long: number = 0.0
) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`;
  //try calling the API
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.error) {
      throw new Error("Unable to find address");
    }
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const findOrCreateConversation = async () => {};

