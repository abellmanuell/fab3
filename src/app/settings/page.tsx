import React from "react";
import Wrapper from "@/components/Wrapper";
import Heading1 from "@/components/Heading1";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import Paragraph from "../components/Paragraph";
import { User } from "lucide-react";
import { verifySession } from "@/lib/verifySession";
import { redirect } from "next/navigation";

export default async function Settings() {
  // Check verify a session
  const session = await verifySession();
  if (!session.isAuth) return redirect("/login");

  return (
    <Wrapper>
      <header>
        <div className="flex space-x-4 mb-10">
          <BackButton />
          <Heading1 className="font-black italic text-4xl ">Settings</Heading1>
        </div>
      </header>

      <main>
        <Link
          href="/settings/account-information"
          className="py-4 px-6 rounded-md flex items-center space-x-6 hover:bg-gray-100"
        >
          <div>
            <User />
          </div>
          <div>
            <h3 className="font-medium text-sm">Account Information</h3>
            <Paragraph className="text-sm text-secondary-2">
              See your account information like email address.
            </Paragraph>
          </div>
        </Link>
      </main>
    </Wrapper>
  );
}
