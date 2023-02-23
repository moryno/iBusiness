import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
const Portal = ({ isOpen, children }) => {
  if (!isOpen) return;
  return createPortal(
    <main className="w-full  h-screen md:w-screen fixed top-0 bg-neutral-900 left-0 bg-opacity-50 flex items-center justify-center z-50 ">
      <section>{children}</section>
    </main>,
    document.getElementById("portal-container")
  );
};

export default Portal;
