import Image from "next/image";
import Link from "next/link";
import React from "react";
import Heading1 from "@/components/Heading1";
import Paragraph from "@/components/Paragraph";
import { CircleCheck, CircleX, Trash } from "lucide-react";
import { AirdropProps } from "@/models/airdropModel";
import { cn } from "@/utils/cn";

export default function AirdropTask({
  href,
  date,
  title,
  className,
  img_src,
}: AirdropProps) {
  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden bg-secondary-1 dark:bg-black p-6",
        className
      )}
    >
      <div className="flex items-center justify-center ">
        <div className="flex space-x-2 grow">
          <div>
            <Image src={img_src} height="40" width="40" alt={title} />
          </div>
          <div>
            <Heading1 className="font-medium text-md">{title}</Heading1>
            <Paragraph className="text-xs text-secondary-2">{date}</Paragraph>
          </div>
        </div>

        <div>
          {false ? (
            <div className="flex text-center space-x-2 text-sm text-green-500">
              <CircleCheck size={20} />
            </div>
          ) : (
            <div className="flex text-center space-x-2 text-sm text-pink-500">
              <CircleX size={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
