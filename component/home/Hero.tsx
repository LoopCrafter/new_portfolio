"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Hanger from "./Hanger";

export default function HeroHeader() {
  const container = useRef<HTMLDivElement>(null);
  const marqueeWrapper = useRef<HTMLDivElement>(null);
  const marqueeText = useRef<HTMLHeadingElement>(null);
  const marqueeClone = useRef<HTMLHeadingElement>(null);

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
      // marquee setup
      if (!marqueeText.current || !marqueeClone.current) return;

      const original = marqueeText.current;
      const clone = marqueeClone.current;

      const positionClone = () => {
        gsap.set(clone, {
          position: "absolute",
          top: 0,
          left: original.offsetWidth,
        });
      };

      positionClone();

      const marqueeTl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
      });

      marqueeTl.to([original, clone], {
        xPercent: -100,
        duration: 120,
        ease: "",
      });

      const handleResize = () => {
        const time = marqueeTl.totalTime();
        marqueeTl.totalTime(0);
        positionClone();
        marqueeTl.totalTime(time);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        marqueeTl.kill();
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen  bg-slate-900 flex items-center justify-center px-4"
    >
      {/* --- Left Info --- */}
      <div className="absolute left-0 top-[40%] -translate-y-1/2">
        <Hanger height={120} />
        <p className="absolute top-1/2 -translate-y-1/2 px-16 text-black text-lg">
          <span className="block">Located </span>
          <span className="block">in the </span>
          <span className="block">Austria</span>
        </p>
        <div className="digital-ball z-[500] absolute right-[1.23em] left-auto top-[1.23em] size-[4.2em] w-[82px] h-[82px] overflow-hidden rounded-full">
          <div className="overlay animate-digitalball absolute w-full h-full top-0 left-0"></div>
          <div className="globe">
            <div className="globe-wrap">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle-hor"></div>
              <div className="circle-hor-middle"></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Header --- */}
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

      {/* --- Marquee --- */}
      <div
        className="absolute bottom-[10vh] left-0 w-full overflow-hidden"
        ref={marqueeWrapper}
      >
        <div className="relative inline-block whitespace-nowrap font-bold big-name">
          <h1 ref={marqueeText} className="inline-block text-white">
            HAMED OSTOVAR • HAMED OSTOVAR • HAMED OSTOVAR •
          </h1>
          <h1 ref={marqueeClone} className="inline-block text-white">
            HAMED OSTOVAR • HAMED OSTOVAR • HAMED OSTOVAR •
          </h1>
        </div>
      </div>
    </section>
  );
}
