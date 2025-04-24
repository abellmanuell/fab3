import React from "react";
import { cn } from "@/utils/cn";
import { ButtonProps } from "@/models/buttonModel";
import { MoveRight } from "lucide-react";

export default function Button({ children, className, props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "flex bg-primary-1 font-bold justify-center items-center group rounded-full w-full p-4 dark:text-black space-x-1 cursor-pointer",
        className
      )}
    >
      <span>{children ?? "Submit"}</span>
      <span className="group-hover:translate-x-1 transition-all">
        <MoveRight size={20} />
      </span>
    </button>
  );
}
