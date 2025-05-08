import Image from "next/image";
import Wrapper from "@/components/Wrapper";
import Heading1 from "@/components/Heading1";
import AddAirdropButton from "@/components/AddAirdropButton";
import { verifySession } from "@/lib/verifySession";
import { findUserById } from "@/lib/db/userDB";
import { findAirdrops } from "@/lib/db/airdropDB";
import Profile from "@/components/Profile";
import AirdropsContainer from "../components/AirdropsContainer";

export default async function Page() {
  // Check verify a session
  const session = await verifySession();
  if (!session) return null;

  const userData = await findUserById(session.userId);
  const airdropList = await findAirdrops(session.userId);

  return (
    <Wrapper>
      <header className="flex flex-col justify-center items-center">
        <div>
          <Image src="/logo.svg" height="98" width="98" alt="Fab3 Logo" />
          <Heading1 className="font-black italic text-4xl text-center">
            Fab3
          </Heading1>
        </div>

        <Profile {...userData} />
      </header>

      {/* Add Airdrop Button */}
      <AddAirdropButton />

      <AirdropsContainer airdropList={airdropList} />
    </Wrapper>
  );
}
