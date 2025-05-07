import AirdropBoard from "@/app/components/AirdropBoard";
import BackButton from "@/app/components/BackButton";
import Profile from "@/app/components/Profile";
import Wrapper from "@/app/components/Wrapper";
import { findAirdrop } from "@/lib/db/airdropDB";
import { findUserById } from "@/lib/db/userDB";
import { verifySession } from "@/lib/verifySession";
import { redirect } from "next/navigation";

export default async function SingleAirdrop() {
  const session = await verifySession();
  if (!session.isAuth) return redirect("/login");

  const userData = await findUserById(session.userId);

  return (
    <Wrapper>
      <BackButton />
      <header className="flex flex-col justify-center items-center">
        <Profile {...userData} />
      </header>

      <AirdropBoard findAirdrop={findAirdrop} />
    </Wrapper>
  );
}
