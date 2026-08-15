"use client";

import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("./location-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-muted">
      map loading...
    </div>
  ),
});

interface LocationMapWrapperProps {
  lat: number;
  lng: number;
  radius?: number;
  zoom?: number;
  color?: string;
  opacity?: number;
}

export default function LocationMapWrapper(props: LocationMapWrapperProps) {
  return <LocationMap {...props} />;
}
