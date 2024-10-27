import React from "react";

const Backdrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed left-0 top-0 w-screen h-dvh flex justify-center items-center backdrop-brightness-50">
      {children}
    </div>
  );
};

export default Backdrop;
