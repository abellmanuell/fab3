import BackButton from "@/app/components/BackButton";
import Button from "@/app/components/Button";
import Heading1 from "@/app/components/Heading1";
import Input from "@/app/components/Input";
import Wrapper from "@/app/components/Wrapper";
import { Mail, User } from "lucide-react";
import React from "react";

export default function AccountInformation() {
  return (
    <Wrapper>
      <header>
        <div className="flex space-x-4 mb-10">
          <BackButton />
          <Heading1 className="font-black italic text-4xl ">
            Account Information
          </Heading1>
        </div>
      </header>

      <form action="" className="space-y-4">
        <Input
          type="text"
          name="nickname"
          placeholder="Enter your nickname"
          icon={User}
        />

        <Input
          type="email"
          name="email"
          placeholder="Enter your email address"
          icon={Mail}
        />
        <Button>Save</Button>
      </form>
    </Wrapper>
  );
}
