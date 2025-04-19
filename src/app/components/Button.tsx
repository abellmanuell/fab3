import React from "react";
import { cn } from "@/utils/cn";
import { ButtonProps } from "@/models/buttonModel";

export default function Button({ children, className }: ButtonProps) {
  return (
    <button
      className={cn(
        "flex bg-primary-1 font-bold justify-center rounded-full w-full p-4 dark:text-black",
        className
      )}
    >
      <span>{children ?? "Submit"}</span>
    </button>
  );
}
