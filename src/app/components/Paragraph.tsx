import { cn } from "@/utils/cn";
import React from "react";

export default function Paragraph({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("text-sm", className)}>{children}</p>;
}
