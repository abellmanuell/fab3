import { ButtonProps } from "@/models/buttonModel";
import { cn } from "@/utils/cn";
import React from "react";
import { ScaleLoader } from "react-spinners";

export default function ButtonOutline({
  children,
  className,
  icon: Icon,
  isSubmitting,
}: ButtonProps) {
  return (
    <button
      disabled={isSubmitting}
      className={cn(
        "flex space-x-4 border border-primary-1 items-center justify-center rounded-full w-full p-4 hover:bg-primary-2/20 dark:hover:bg-black/20 cursor-pointer disabled:opacity-50",
        className
      )}
    >
      {isSubmitting ? (
        <ScaleLoader height={20} width={3} />
      ) : (
        Icon && (
          <span>
            <Icon />
          </span>
        )
      )}
      <span>{children}</span>
    </button>
  );
}
