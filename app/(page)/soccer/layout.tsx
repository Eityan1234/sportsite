
import React from "react";
import Header from "./(components)/header";

export default function SoccerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
