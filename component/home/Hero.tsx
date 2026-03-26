"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Hanger from "./Hanger";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function HeroHeader() {
  const container = useRef<HTMLDivElement>(null);
  const marqueeScroller = useRef<HTMLDivElement>(null);
  const marqueeWrap1 = useRef<HTMLDivElement>(null);
  const marqueeWrap2 = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);

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

      const scroller = marqueeScroller.current;
      const wrap1 = marqueeWrap1.current;
      const wrap2 = marqueeWrap2.current;
      const globe = globeRef.current;

      if (!scroller || !wrap1 || !wrap2 || !globe) return;

      let direction = 1;

      const positionSecond = () => {
        gsap.set(wrap1, {
          position: "relative",
          left: 0,
          top: 0,
          xPercent: 0,
          x: 0,
        });

        gsap.set(wrap2, {
          position: "absolute",
          top: wrap1.offsetTop,
          left: wrap1.offsetLeft + wrap1.offsetWidth,
          xPercent: 0,
          x: 0,
        });
      };

      positionSecond();

      const rollTl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
        onReverseComplete() {
          this.totalTime(this.rawTime() + this.duration() * 10);
        },
      });

      rollTl.to([wrap1, wrap2], {
        xPercent: -100,
        duration: 30,
      });

      const scrollTrigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: "max",
        onUpdate(self) {
          if (self.direction !== direction) {
            direction *= -1;

            gsap.to(rollTl, {
              timeScale: direction,
              duration: 0.25,
              ease: "power2.out",
              overwrite: true,
            });
          }

          const skewValue = gsap.utils.clamp(-8, 8, self.getVelocity() * 0.01);

          gsap.to(scroller, {
            skewX: skewValue,
            duration: 0.2,
            overwrite: true,
          });

          gsap.to(scroller, {
            skewX: 0,
            duration: 0.6,
            ease: "power3.out",
            overwrite: true,
            delay: 0.05,
          });
        },
      });

      const globeTl = gsap.timeline({
        repeat: -1,
        defaults: {
          ease: "none",
        },
      });

      globeTl.to(globe, {
        rotate: 360,
        duration: 10,
        transformOrigin: "50% 50%",
      });

      const handleResize = () => {
        const time = rollTl.totalTime();
        rollTl.totalTime(0);
        positionSecond();
        rollTl.totalTime(time);
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        heroTitleSplit.revert();
        heroSubSplit.revert();
        rollTl.kill();
        globeTl.kill();
        scrollTrigger.kill();
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative flex min-h-screen items-center justify-center bg-slate-900 px-4"
    >
      <div className="absolute left-0 top-[45%] -translate-y-1/2 location">
        <Hanger height={120} />
        <p className="absolute top-1/2 -translate-y-1/2 px-16 text-lg text-black">
          <span className="block">Located</span>
          <span className="block">in</span>
          <span className="block">Austria</span>
        </p>

        <div className="digital-ball absolute right-[1.23em] top-[1.23em] z-[500] h-[82px] w-[82px] overflow-hidden rounded-full">
          <div className="overlay absolute left-0 top-0 h-full w-full bg-slate-900"></div>

          <div ref={globeRef} className="globe">
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

      <div className="max-w-3xl text-center">
        <h1 className="hero-title mb-4 text-4xl font-bold text-[#ccd6f6] md:text-6xl">
          Hi, I'm Hamed
        </h1>
        <p className="hero-subtitle mb-8 text-lg text-[#8892b0] md:text-xl">
          Software Engineer specializing in MERN Stack
        </p>
      </div>

      <div className="absolute bottom-[5vh] left-0 w-full overflow-hidden big-name">
        <div
          ref={marqueeScroller}
          className="name-h1 relative whitespace-nowrap will-change-transform"
        >
          <div
            ref={marqueeWrap1}
            className="name-wrap inline-block whitespace-nowrap text-white"
          >
            <h1 className="rolling-name-text">
              HAMED OSTOVAR • HAMED OSTOVAR • HAMED OSTOVAR •
            </h1>
          </div>

          <div
            ref={marqueeWrap2}
            className="name-wrap inline-block whitespace-nowrap"
          >
            <h1 className="rolling-name-text">
              HAMED OSTOVAR • HAMED OSTOVAR • HAMED OSTOVAR •
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
