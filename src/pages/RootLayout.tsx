import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-screen h-dvh overflow-auto">{children}</div>;
};

export default RootLayout;
