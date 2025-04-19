import React from "react";
import { cn } from "@/utils/cn";

export default function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "px-4 py-10 sm:min-w-80 md:w-[30rem] lg:w-lg transition-all sm:m-auto",
        className
      )}
    >
      {children}
    </main>
  );
}
