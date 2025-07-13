"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Hanger from "./Hanger";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function HeroHeader() {
  const container = useRef<HTMLDivElement>(null);
  const marqueeWrapper = useRef<HTMLDivElement>(null);
  const marqueeText = useRef<HTMLHeadingElement>(null);
  const marqueeClone = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      const heroTitleSplit = SplitText.create(".hero-title", {
        type: "chars",
      });
      const heroSubSplit = SplitText.create(".hero-subtitle", {
        type: "lines",
        mask: "lines",
      });
      tl.from(heroTitleSplit.chars, {
        y: 50,
        stagger: 0.05,
        ease: "power2.inOut",
        opacity: 0,
      });
      tl.from(heroSubSplit.lines, {
        y: 50,
        ease: "power2.inOut",
        opacity: 0,
      });
      tl.from(".location", {
        xPercent: -100,
        ease: "power3.out",
        opacity: 0,
      });
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
      <div className="absolute left-0 top-[45%] -translate-y-1/2 location">
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
          Front-End Engineer specializing in React & Next.js
        </p>
      </div>

      {/* --- Marquee --- */}
      <div
        className="absolute bottom-[5vh] left-0 w-full overflow-hidden"
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
