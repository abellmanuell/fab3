import { cn } from "@/utils/cn";
import React from "react";

export default function Heading1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h1 className={cn("font-medium text-xl", className)}>{children}</h1>;
}
