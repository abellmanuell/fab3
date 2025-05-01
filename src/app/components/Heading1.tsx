import React from "react";
import { cn } from "@/app/utils/cn";

export default function Heading1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h1 className={cn("font-medium text-xl", className)}>{children}</h1>;
}
