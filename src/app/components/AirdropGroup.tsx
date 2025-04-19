import React from "react";

export default function AirdropGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="grid grid-cols-1 gap-2">{children}</section>;
}
