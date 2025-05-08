import ButtonOutline from "@/components/ButtonOutline";
import SignUpForm from "@/components/forms/SignUpForm";
import Heading1 from "@/components/Heading1";
import Paragraph from "@/components/Paragraph";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signUpAuth } from "actions/authActions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUp() {
  // Redirect if we have login
  const cookie = cookies();
  const isUserLogin = Boolean((await cookie).get("session")?.value);
  if (isUserLogin) redirect("/airdrops");

  return (
    <Wrapper>
      {/* Heading */}
      <header className=" flex flex-col items-center space-y-6">
        <Image src="/logo.svg" height="60" width="60" alt="Fab3 Logo" />
        <Heading1 className="text-center">Sign up to Fab3</Heading1>
      </header>

      {/* Form */}
      <SignUpForm signUp={signUpAuth} />

      <Paragraph className="text-center text-secondary-2 my-4">
        Or register with
      </Paragraph>

      {/* Google OAuth */}
      <ButtonOutline>Google</ButtonOutline>

      <div className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-right text-primary-1 font-bold ">
          Log In
        </Link>
      </div>
    </Wrapper>
  );
}
