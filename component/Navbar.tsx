"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MagneticWrapper from "./MagneticButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SidebarMenu from "./shared/SidebarMenu";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const createByRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    if (!isMenuOpen) {
      setIsScrolled(window.scrollY > 200);
    }
  }, [isMenuOpen]);
  useGSAP(
    () => {
      const trigger = ScrollTrigger.create({
        start: 200,
        onEnter: () => {
          setIsScrolled(true);
          headerRef.current?.classList.add("scrolled");
        },
        onLeaveBack: () => {
          setIsScrolled(false);
          headerRef.current?.classList.remove("scrolled");
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: headerRef },
  );

  return (
    <>
      <header
        ref={headerRef}
        className="absolute top-0 left-0 flex w-full items-center justify-between p-6 z-[102]"
      >
        <MagneticWrapper strength={20} textStrength={10}>
          <Link href="/">
            <div className="flex items-center justify-start gap-2">
              <span>©</span>

              <div
                className="relative flex overflow-hidden group"
                ref={createByRef}
              >
                <span className="overflow-hidden transition-transform duration-300 group-hover:-translate-x-full">
                  Code by
                </span>

                <span className="transition-transform duration-300 group-hover:-translate-x-full">
                  <span> Hamed </span>
                  <span> Ostovar </span>
                </span>
              </div>
            </div>
          </Link>
        </MagneticWrapper>

        <ul
          className={`flex items-center justify-center gap-3 ${isMenuOpen ? "hidden" : ""}`}
        >
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
        <MagneticWrapper strength={10} textStrength={60}>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`
          btn-hamburger  overflow-hidden
          ${
            isScrolled || isMenuOpen
              ? "[transform:translateY(0%)_scale(1)_rotate(0.001deg)] [transition-timing-function:cubic-bezier(0.34,1.5,0.64,1)]"
              : "[transform:translateY(0%)_scale(0)_rotate(0.001deg)] [transition-timing-function:cubic-bezier(0.36,0,0.66,0)]"
          }
          ${isMenuOpen ? "bg-[var(--color-blue)]" : "bg-black"}
        `}
          >
            <div className={`btn-fill`} />

            <div
              className={`
           
            ${
              isMenuOpen
                ? "bg-[var(--color-blue)] shadow-[inset_0px_0px_0px_1px_transparent]"
                : "bg-[var(--color-dark)] shadow-[inset_0px_0px_0px_1px_var(--color-border-light)]"
            }
          `}
            />

            <div className="relative flex h-full w-full items-center justify-center">
              <div className="absolute h-[10%] w-[30%] opacity-100">
                <span
                  className={`
                absolute left-1/2 block h-px w-full bg-white
                transition-all duration-300
                ${
                  isMenuOpen
                    ? "top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg]"
                    : "top-0 -translate-x-1/2 -translate-y-1/2"
                }
              `}
                />
                <span
                  className={`
                absolute left-1/2 block h-px w-full bg-white
                transition-all duration-300
                ${
                  isMenuOpen
                    ? "top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[45deg]"
                    : "top-full -translate-x-1/2 -translate-y-1/2"
                }
              `}
                />
              </div>

              <span className="opacity-0 text-white">Menu</span>
            </div>
          </button>
        </MagneticWrapper>
      </header>
      <SidebarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;
