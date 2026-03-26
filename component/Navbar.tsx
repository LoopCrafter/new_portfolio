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
      const scrolled = window.scrollY > 200;
      setIsScrolled(scrolled);
      headerRef.current?.classList.toggle("scrolled", scrolled);

      ScrollTrigger.refresh();
    }
  }, [isMenuOpen]);

  useGSAP(
    () => {
      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const scrolled = self.scroll() > 200;
          console.log("scrolled ", scrolled);
          setIsScrolled((prev) => {
            if (prev !== scrolled) {
              headerRef.current?.classList.toggle("scrolled", scrolled);
              return scrolled;
            }
            return prev;
          });
        },
      });

      const syncScrollState = () => {
        const scrolled = window.scrollY > 200;
        headerRef.current?.classList.toggle("scrolled", scrolled);
        setIsScrolled(scrolled);
      };

      syncScrollState();

      return () => {
        trigger.kill();
      };
    },
    { scope: headerRef },
  );
  console.log("isMenuOpen ", isMenuOpen);
  return (
    <>
      <header
        ref={headerRef}
        className="absolute top-0 left-0 flex w-full items-center justify-between p-6 z-[102] px-16 py-10"
      >
        <MagneticWrapper strength={20} textStrength={10}>
          <Link href="/">
            <div className="flex items-center justify-start gap-2 ">
              <span
                className="created-logo flex"
                // style={{ transform: "rotate(0.001deg)" }}
              >
                <div className="credit">
                  <span>©</span>
                </div>
                <div className="overflow-hidden relative">
                  <span className="code-by">Code by </span>
                  <span className="hamed">
                    <span className="hamed-span">Hamed</span>{" "}
                    <span className="ostovar">Ostovar</span>
                  </span>
                </div>
              </span>
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
          <div className="absolute">
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
          ${isMenuOpen ? "bg-[var(--color-blue)]" : "bg-gray-800"}
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
          </div>
        </MagneticWrapper>
      </header>
      <SidebarMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;
