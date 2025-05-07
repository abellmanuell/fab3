import ButtonOutline from "@/components/ButtonOutline";
import LoginForm from "@/components/forms/LoginForm";
import Heading1 from "@/components/Heading1";
import Paragraph from "@/components/Paragraph";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { loginAuth } from "actions/authActions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login() {
  // Redirect if we have login
  const cookie = cookies();
  const isUserLogin = Boolean((await cookie).get("session")?.value);
  if (isUserLogin) redirect("/airdrops");

  return (
    <Wrapper>
      {/* Heading */}
      <header className=" flex flex-col items-center space-y-6">
        <Image src="/logo.svg" height="60" width="60" alt="Fab3 Logo" />
        <Heading1 className="text-center">Sign in to Fab3</Heading1>
      </header>

      {/* Form */}
      <LoginForm login={loginAuth} />

      <Paragraph className="text-center text-secondary-2 my-4">
        Or login with
      </Paragraph>

      {/* Google OAuth */}
      <ButtonOutline icon={FcGoogle}>Google</ButtonOutline>

      <div className="text-center mt-4 text-sm">
        {`Don\'t have an account? `}
        <Link href="/signup" className="text-right text-primary-1 font-bold ">
          Sign Up now
        </Link>
      </div>
    </Wrapper>
  );
}
