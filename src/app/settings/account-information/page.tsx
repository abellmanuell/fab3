import React from "react";
import BackButton from "@/app/components/BackButton";
import Heading1 from "@/app/components/Heading1";
import Wrapper from "@/app/components/Wrapper";
import { verifySession } from "@/lib/verifySession";
import { redirect } from "next/navigation";
import { findUserById } from "@/lib/db/userDB";
import EditUser from "@/app/components/forms/EditUser";
import { editUser } from "actions/user";

export default async function AccountInformation() {
  // Check verify a session
  const session = await verifySession();
  if (!session.isAuth) return redirect("/login");

  const user = await findUserById(session.userId);

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

      <EditUser user={user} editUser={editUser} />
    </Wrapper>
  );
}
