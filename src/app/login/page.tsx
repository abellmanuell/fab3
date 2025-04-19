import Button from "@/components/Button";
import ButtonOutline from "@/components/ButtonOutline";
import Heading1 from "@/components/Heading1";
import Input from "@/components/Input";
import Paragraph from "@/components/Paragraph";
import Wrapper from "@/components/Wrapper";
import { Key, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <Wrapper>
      {/* Heading */}
      <header className=" flex flex-col items-center space-y-6">
        <Image src="/logo.svg" height="60" width="60" alt="Fab3 Logo" />
        <Heading1 className="text-center">Sign in to Fab3</Heading1>
      </header>

      {/* Form */}
      <section className="mb-4  mt-6">
        <form action="" className="space-y-4">
          <Input type="email" placeholder="Email address" icon={Mail} />
          <Input type="password" placeholder="Password" icon={Key} />

          <Button>Sign in</Button>
        </form>

        {/* Forget Password  */}
        <div className="flex justify-end my-2">
          <Link
            href="/forgot-password"
            className="text-sm text-right text-secondary-2 "
          >
            Forgot Passowrd?
          </Link>
        </div>
      </section>

      <Paragraph className="text-center text-secondary-2 my-4">
        Or login with
      </Paragraph>

      {/* Google OAuth */}
      <ButtonOutline icon={FcGoogle}>Google</ButtonOutline>

      <div className="text-center mt-4 text-sm">
        Don't have an account?{" "}
        <Link href="/signup" className="text-right text-primary-1 font-bold ">
          Sign Up now
        </Link>
      </div>
    </Wrapper>
  );
}
