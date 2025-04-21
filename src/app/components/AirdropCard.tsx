import Image from "next/image";
import Link from "next/link";
import React from "react";
import Heading1 from "@/components/Heading1";
import Paragraph from "@/components/Paragraph";
import { Trash } from "lucide-react";
import { AirdropProps } from "@/models/airdropModel";
import { cn } from "@/utils/cn";

export default function AirdropCard({
  href,
  date,
  title,
  className,
  img_src,
}: AirdropProps) {
  return (
    <div
      className={cn(
        "flex rounded-lg overflow-hidden bg-secondary-1 dark:bg-black",
        className
      )}
    >
      <Link href={href} className="flex items-center space-x-2 grow p-4">
        <div>
          <Image src={img_src} height="40" width="40" alt={title} />
        </div>
        <div>
          <Heading1 className="font-medium text-md">{title}</Heading1>
          <Paragraph className="text-xs text-secondary-2">{date}</Paragraph>
        </div>
      </Link>

      <Link
        href=""
        className="bg-red-500 text-red-900 h-full px-6 py-2 flex justify-center items-center"
      >
        <Trash size={20} />
      </Link>
    </div>
  );
}
