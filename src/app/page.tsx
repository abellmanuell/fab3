import { Plus, Search, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Heading1 from "@/components/Heading1";
import Paragraph from "@/components/Paragraph";

export default function Page() {
  return (
    <Wrapper>
      <header className="flex flex-col justify-center items-center">
        <div>
          <Image src="/logo.svg" height="98" width="98" alt="Fab3 Logo" />
          <Heading1 className="font-black italic text-4xl text-center">
            Fab3
          </Heading1>
        </div>

        <Link
          href="#"
          className="flex items-center my-6 space-x-4 p-4 w-[265px] bg-secondary-1 leading-4 rounded-lg dark:bg-black"
        >
          <div>
            <Image
              src="/profile.png"
              height="40"
              width="40"
              alt="Fab3 Logo"
              className="rounded-full"
            />
          </div>
          {/* <h1>Emmanuel Abel</h1> */}
          <Heading1 className="text-md">Emmanuel Abel</Heading1>
          <Paragraph className="text-secondary-2 text-sm">
            @abellmanuell
          </Paragraph>
        </Link>
      </header>
    </Wrapper>
  );
}
