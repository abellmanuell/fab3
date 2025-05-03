"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingCard({
  height,
  width,
}: {
  height?: number;
  width?: number;
}) {
  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <Skeleton
      baseColor={!isDark ? "#2c2c2c" : "#ebebeb"}
      highlightColor={!isDark ? "#3c3c3c" : "#f5f5f5"}
      height={height ?? 50}
      width={width}
      className="p-4 my-2"
    />
  );
}
