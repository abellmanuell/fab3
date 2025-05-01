"use client";
import React from "react";
import { cn } from "@/app/utils/cn";
import { ButtonProps } from "@/app/models/buttonModel";
import { MoveRight } from "lucide-react";
import { ScaleLoader } from "react-spinners";

export default function Button({
  children,
  className,
  isSubmitting,
}: ButtonProps) {
  return (
    <button
      disabled={isSubmitting}
      className={cn(
        "flex bg-primary-1 font-bold justify-center items-center group rounded-full w-full p-4 dark:text-black space-x-1 cursor-pointer disabled:opacity-50",
        className
      )}
    >
      {isSubmitting ? (
        <ScaleLoader height={20} width={3} />
      ) : (
        <>
          <span>{children ?? "Submit"}</span>
          <span className="group-hover:translate-x-1 transition-all">
            <MoveRight size={20} />
          </span>
        </>
      )}
    </button>
  );
}
