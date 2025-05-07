import Image from "next/image";
import Link from "next/link";
import React from "react";
import Heading1 from "./Heading1";
import Paragraph from "./Paragraph";
import LoadingCard from "./LoadingCard";
import { Settings } from "lucide-react";

export default async function Profile(userData: any) {
  return (
    <Link
      href="/settings"
      className="flex items-center my-6 space-x-4 p-2 w-[265px] bg-secondary-1 leading-4 rounded-lg dark:bg-black"
    >
      <div>
        {userData && !userData.imgSrc ? (
          <div className="max-w-[40px] max-h-[40px] p-6 font-bold flex justify-center items-center rounded-full bg-gray-500">
            {userData && userData?.nickname[0]}
          </div>
        ) : (
          userData && (
            <Image
              src={userData?.imgSrc}
              height="40"
              width="40"
              alt="Fab3 Logo"
              className="rounded-full"
            />
          )
        )}
      </div>

      <div className="grow">
        {!userData ? (
          <LoadingCard height={1} />
        ) : (
          <Heading1 className="text-md capitalize">
            {userData && userData.nickname}
          </Heading1>
        )}

        {userData.username || userData.email ? (
          <Paragraph className="text-secondary-2 text-sm">
            {(userData && userData.username) ?? userData?.email}
          </Paragraph>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="p-2">
        <Settings />
      </div>
    </Link>
  );
}
