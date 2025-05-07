import React from "react";
import { cn } from "@/app/utils/cn";
import { InputProps } from "@/app/models/inputModel";

export default function Input({
  className,
  type,
  placeholder,
  name,
  value,
  icon: Icon,
}: InputProps) {
  return (
    <div
      className={cn(
        "bg-gray-100 dark:bg-black flex rounded-lg items-center overflow-hidden outline outline-gray-100 dark:outline-secondary-2",
        className
      )}
    >
      {Icon && (
        <span className="py-2 pl-4 pr-0 text-secondary-2">
          <Icon size={20} />
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-4 outline-none"
        name={name}
        defaultValue={value ?? ""}
      />
    </div>
  );
}
