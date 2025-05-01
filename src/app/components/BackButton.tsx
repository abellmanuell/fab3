"use client";
import { cn } from "@/app/utils/cn";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  function back() {
    router.back();
  }

  return (
    <button
      onClick={back}
      className={cn(
        "cursor-pointer p-2 bg-secondary-2/10 hover:bg-secondary-2/20 transition-all rounded-full",
        className
      )}
    >
      <MoveLeft />
    </button>
  );
}
