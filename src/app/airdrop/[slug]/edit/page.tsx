import Button from "@/components/Button";
import Heading1 from "@/components/Heading1";
import Input from "@/components/Input";
import Paragraph from "@/components/Paragraph";
import Wrapper from "@/components/Wrapper";
import { Calendar, Link } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function EditProfile() {
  return (
    <Wrapper>
      <header className="mb-10">
        <div className="flex flex-col items-center ">
          <Image src="/taker.png" height="40" width="40" alt="Fab3 Logo" />
          <div className="text-center mt-2">
            <Heading1 className="font-black italic text-4xl text-center">
              earn.taker.xzy
            </Heading1>
            <Paragraph className="text-xs text-secondary-2">
              Apr 19, 2025
            </Paragraph>
          </div>
        </div>
      </header>

      <form action="" className="space-y-4">
        <Input type="text" placeholder="Airdrop Link" icon={Link} />
        <Input type="date" placeholder="Date" icon={Calendar} />

        <Button>Save</Button>
      </form>
    </Wrapper>
  );
}
