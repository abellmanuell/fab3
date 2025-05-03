import Image from "next/image";
import Link from "next/link";
import React from "react";
import Heading1 from "./Heading1";
import Paragraph from "./Paragraph";
import LoadingCard from "./LoadingCard";

export default async function Profile(user: any) {
  return (
    <Link
      href="/settings"
      className="flex items-center my-6 space-x-4 p-2 w-[265px] bg-secondary-1 leading-4 rounded-lg dark:bg-black"
    >
      <div>
        {user && !user.imgSrc ? (
          <div className="max-w-[40px] max-h-[40px] p-6 font-bold flex justify-center items-center rounded-full bg-gray-500">
            {user && user?.nickname[0]}
          </div>
        ) : (
          user && (
            <Image
              src={user?.imgSrc}
              height="40"
              width="40"
              alt="Fab3 Logo"
              className="rounded-full"
            />
          )
        )}
      </div>

      <div>
        {!user ? (
          <LoadingCard height={1} />
        ) : (
          <Heading1 className="text-md capitalize">
            {user && user.nickname}
          </Heading1>
        )}

        {user.username || user.email ? (
          <Paragraph className="text-secondary-2 text-sm">
            {(user && user.username) ?? user?.email}
          </Paragraph>
        ) : (
          <p>Loading..</p>
        )}
      </div>
    </Link>
  );
}
