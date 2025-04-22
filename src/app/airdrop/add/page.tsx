import Button from "@/components/Button";
import Heading1 from "@/components/Heading1";
import Input from "@/components/Input";
import Paragraph from "@/components/Paragraph";
import Wrapper from "@/components/Wrapper";
import { Calendar, Crown, Link } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function AddAirdrop() {
  return (
    <Wrapper>
      <header className="mb-10">
        <div className="flex flex-col items-center ">
          <div className="bg-primary-2 text-primary-1 p-6 rounded-full dark:bg-primary-1/20">
            <Crown size={30} />
          </div>

          <div className="mt-2">
            <Heading1 className="font-black italic text-4xl text-center">
              Add Airdrop
            </Heading1>
            <Paragraph className="text-sm text-secondary-2 mt-2">
              Grind Smarter, Not Harder. Add your airdrop.
            </Paragraph>
          </div>
        </div>
      </header>

      <form action="" className="space-y-4">
        <Input
          type="text"
          placeholder="Airdrop Link (e.g. https://...)"
          icon={Link}
        />
        <Input type="date" placeholder="Date" icon={Calendar} />

        <Button>Add</Button>
      </form>
    </Wrapper>
  );
}
