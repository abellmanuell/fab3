import { Crown, Plus, Search, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Heading1 from "@/components/Heading1";
import Paragraph from "@/components/Paragraph";
import { verifySession } from "../lib/verifySession";

export default async function Page() {
  // Redirect if session exist
  const session = await verifySession();

  return (
    <Wrapper className="py-0 h-screen flex flex-col justify-center relative">
      <div className="p-6 flex">
        <Paragraph className="rounded-full py-2 px-4 font-bold text-center text-xs inline-flex space-x-1 justify-center text-primary-1 bg-primary-2 m-auto dark:bg-primary-2/20">
          <Crown size={15} />
          <span>Never miss a claim again.</span>
        </Paragraph>
      </div>

      <section className="">
        <Heading1 className="font-black text-5xl text-center">
          Track Airdrops. <br /> Stay{" "}
          <i className="text-primary-1">Eligible.</i>
        </Heading1>

        <Paragraph className="text-sm text-center text-secondary-2 my-6">
          Web3 moves fast. Fab3 helps you keep up with airdrop tasks, reminders,
          and color-coded progress so you never miss the bag.
        </Paragraph>

        <Link
          href={session?.isAuth ? "/airdrops" : "/login"}
          className="flex bg-primary-1 font-bold justify-center rounded-full w-full p-4 dark:text-black"
        >
          {session?.isAuth ? "Go Dashboard" : "Farm Smarter Today"}
        </Link>
      </section>

      <div>
        <Paragraph className="p-4 text-center text-xs flex space-x-1 justify-center">
          <span>❤️</span>
          <Image src="/logo.svg" height="15" width="15" alt="Fab3 Logo" />
          <span>Built with love by</span>
          <Link
            target="_blank"
            className="text-primary-1 underline"
            href="https://x.com/abellmanuell"
          >
            Abel Emmanuel
          </Link>
        </Paragraph>
      </div>
    </Wrapper>
  );
}
