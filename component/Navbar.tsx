"use client";
import { useRef } from "react";
import Link from "next/link";
import MagneticWrapper from "./MagneticButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
  const createByRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    const el = createByRef.current;
    if (!el) return;

    el.addEventListener("mousemove", moveCb);
    el.addEventListener("mouseleave", resetCb);

    return () => {
      el.removeEventListener("mousemove", moveCb);
      el.removeEventListener("mouseleave", resetCb);
    };
  }, []);

  const moveCb = () => {};
  const resetCb = () => {};
  return (
    <header className="flex justify-between items-center fixed top-0 left-0 w-full z-2 p-6">
      <MagneticWrapper strength={20} textStrength={10}>
        <Link href="/">
          <div className="flex justify-start items-center gap-2">
            <span>©</span>
            <div
              className="relative overflow-hidden cbl flex group"
              ref={createByRef}
            >
              <span className="code-by overflow-hidden group-hover:-translate-x-full">
                Code by{" "}
              </span>
              <span className="hamed group-hover:-translate-x-full ">
                <span className="hamed-span ">Hamed </span>
                <span className="ostovar"> Ostovar </span>
              </span>
            </div>
          </div>
        </Link>
      </MagneticWrapper>
      <ul className="flex justify-center items-center gap-3">
        <li className="btn btn-link">
          <MagneticWrapper strength={20} textStrength={20}>
            <button className="btn-click">
              <span className="btn-text">Work</span>
            </button>
          </MagneticWrapper>
        </li>
        <li className="btn btn-link">
          <MagneticWrapper strength={20} textStrength={20}>
            <button className="btn-click">
              <span className="btn-text">About</span>
            </button>
          </MagneticWrapper>
        </li>
        <li className="btn btn-link">
          <MagneticWrapper strength={20} textStrength={20}>
            <button className="btn-click">
              <span className="btn-text">Contact</span>
            </button>
          </MagneticWrapper>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
