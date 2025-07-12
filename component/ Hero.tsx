"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HeroHeader() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".hero-title", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".hero-subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.5"
        )
        .from(
          ".hero-btn",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.4"
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen bg-[#0a192f] flex items-center justify-center px-4"
    >
      <div className="max-w-3xl text-center">
        <h1 className="hero-title text-4xl md:text-6xl font-bold text-[#ccd6f6] mb-4">
          Hi, I'm Hamed
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-[#8892b0] mb-8">
          Front-End Developer specializing in React & Next.js
        </p>
        <button className="hero-btn px-6 py-3 text-[#0a192f] bg-[#64ffda] rounded-full font-semibold hover:bg-[#52e6c3] transition-all duration-300">
          View Projects
        </button>
      </div>
    </section>
  );
}
