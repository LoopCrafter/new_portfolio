"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const MouseTracker = () => {
  useGSAP(() => {
    document.addEventListener("mousemove", mouseTracker);

    return () => {
      document.removeEventListener("mousemove", mouseTracker);
    };
  });

  const mouseTracker = (e: any) => {
    const cursor = document.querySelector(".cursor");
    gsap.to(cursor, {
      x: e.clientX - 20,
      y: e.clientY - 20,
      duration: 0.7,
      ease: "power4.out",
      delay: 0.15,
    });
  };

  return (
    <div className="cursor w-[10px] h-[10px] rounded-full fixed top-0 left-0 bg-amber-300 z-50"></div>
  );
};

export default MouseTracker;
