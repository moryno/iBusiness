import React, { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
const Portal = ({ isOpen, setOpen, children }) => {
  // Add an event listener when the component is mounted
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle the keydown event
  function handleKeyDown(event) {
    if (event.key === "Escape") {
      setOpen(false);
    }
  }

  if (!isOpen) return;
  return createPortal(
    <main className="w-full  h-screen md:w-screen fixed top-0 bg-neutral-900 left-0 bg-opacity-50 flex items-center justify-center z-50 ">
      <section>{children}</section>
    </main>,
    document.getElementById("portal-container")
  );
};

export default Portal;
