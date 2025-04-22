import { ButtonProps } from "@/models/buttonModel";
import { cn } from "@/utils/cn";
import React from "react";

export default function ButtonOutline({
  children,
  className,
  icon: Icon,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex space-x-4 border border-primary-1 items-center justify-center rounded-full w-full p-4 hover:bg-primary-2/20 dark:hover:bg-black/20 cursor-pointer",
        className
      )}
    >
      {Icon && (
        <span>
          <Icon />
        </span>
      )}
      <span>{children}</span>
    </button>
  );
}
