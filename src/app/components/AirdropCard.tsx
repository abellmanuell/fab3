import Image from "next/image";
import Link from "next/link";
import React from "react";
import Heading1 from "@/components/Heading1";
import Paragraph from "@/components/Paragraph";
import { ArrowUpRight, Dot, Eye, Pencil, Trash } from "lucide-react";
import { AirdropProps } from "@/models/airdropModel";
import { cn } from "@/utils/cn";

export default function AirdropCard({
  href,
  date,
  title,
  className,
  img_src,
  status,
}: AirdropProps) {
  return (
    <div
      className={cn(
        "flex rounded-lg overflow-hidden bg-secondary-1 dark:bg-black",
        className
      )}
    >
      <Link href={href} className="flex items-center justify-between grow p-4">
        <div className="flex items-center space-x-2">
          <div>
            <Image src={img_src} height="40" width="40" alt={title} />
          </div>
          <div>
            <Heading1 className="font-medium text-md">{title}</Heading1>
            <Paragraph className="text-xs text-secondary-2">{date}</Paragraph>
          </div>
        </div>

        <div
          className={cn(
            "flex justify-center items-center",
            !status ? "text-red-500" : "text-green-500"
          )}
        >
          <Dot size={50} />
        </div>
      </Link>

      <Link
        href=""
        className="bg-primary-1 text-black h-full px-6 py-2 flex justify-center items-center"
      >
        <Eye size={20} />
      </Link>
    </div>
  );
}
