"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type PageLoaderProps = {
  onStartScroll?: () => void;
  onStopScroll?: () => void;
};

const greetings = [
  { text: "Hello", variant: "home-active home-active-first" },
  { text: "Bonjour", variant: "home-active" },
  { text: "स्वागत हे", variant: "home-active" },
  { text: "Ciao", variant: "home-active" },
  { text: "Olá", variant: "home-active" },
  { text: "おい", variant: "home-active" },
  { text: "Hallå", variant: "home-active" },
  { text: "Guten tag", variant: "home-active" },
  { text: "Hallo", variant: "home-active-last" },
];

const hiddenWords = [
  "Home",
  "Work",
  "TWICE",
  "The Damai",
  "FABRIC™",
  "Aanstekelijk",
  "Base Create",
  "AVVR",
  "GraphicHunters",
  "Future Goals",
  "Atypikal",
  "One:Nil",
  "Andy Hardy",
  "About",
  "Contact",
  "Success",
  "Archive",
  "Error",
  "Styleguide",
];

export default function PageLoader({
  onStartScroll,
  onStopScroll,
}: PageLoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  //   useGSAP(
  //     () => {
  //       const isDesktop = window.innerWidth > 540;
  //       const onceInY = isDesktop ? "50vh" : "10vh";
  //       const roundedHeight = isDesktop ? "10vh" : "5vh";

  //       const tl = gsap.timeline();

  //       tl.set('[data-loader="screen"]', {
  //         top: "0%",
  //       });

  //       tl.set("main .once-in", {
  //         y: onceInY,
  //       });

  //       tl.set('[data-loader="words"]', {
  //         opacity: 0,
  //         y: -50,
  //       });

  //       tl.set('[data-loader-word="default"]', {
  //         display: "none",
  //       });

  //       tl.set('[data-loader-word="home"], [data-loader-word="home-last"]', {
  //         display: "block",
  //         opacity: 0,
  //       });

  //       tl.set('[data-loader-word="home-first"]', {
  //         opacity: 1,
  //       });

  //       tl.set('[data-loader="rounded-bottom"]', {
  //         height: roundedHeight,
  //       });

  //       tl.set("html", {
  //         cursor: "wait",
  //       });

  //       tl.call(() => {
  //         onStopScroll?.();
  //       });

  //       tl.to('[data-loader="words"]', {
  //         duration: 0.8,
  //         opacity: 1,
  //         y: -50,
  //         ease: "power4.out",
  //         delay: 0.5,
  //       });

  //       tl.to(
  //         '[data-loader-word="home"]',
  //         {
  //           duration: 0.01,
  //           opacity: 1,
  //           stagger: 0.15,
  //           ease: "none",
  //           onStart: () => {
  //             gsap.to('[data-loader-word="home"]', {
  //               duration: 0.01,
  //               opacity: 0,
  //               stagger: 0.15,
  //               ease: "none",
  //               delay: 0.15,
  //             });
  //           },
  //         },
  //         "=-.4",
  //       );

  //       tl.to('[data-loader-word="home-last"]', {
  //         duration: 0.01,
  //         opacity: 1,
  //         delay: 0.15,
  //       });

  //       tl.to('[data-loader="screen"]', {
  //         duration: 0.8,
  //         top: "-100%",
  //         ease: "power4.inOut",
  //         delay: 0.2,
  //       });

  //       tl.to(
  //         '[data-loader="rounded-bottom"]',
  //         {
  //           duration: 1,
  //           height: "0vh",
  //           ease: "power4.inOut",
  //         },
  //         "=-.8",
  //       );

  //       tl.to(
  //         '[data-loader="words"]',
  //         {
  //           duration: 0.3,
  //           opacity: 0,
  //           ease: "linear",
  //         },
  //         "=-.8",
  //       );

  //       tl.set('[data-loader="screen"]', {
  //         top: "-100%",
  //       });

  //       tl.set('[data-loader="rounded-bottom"]', {
  //         height: "0vh",
  //       });

  //       tl.to(
  //         "main .once-in",
  //         {
  //           duration: 1.5,
  //           y: "0vh",
  //           stagger: 0.07,
  //           ease: "expo.out",
  //           clearProps: "all",
  //         },
  //         "=-.8",
  //       );

  //       tl.set(
  //         "html",
  //         {
  //           cursor: "auto",
  //         },
  //         "=-1.2",
  //       );

  //       tl.call(() => {
  //         onStartScroll?.();
  //       });

  //       return () => {
  //         tl.kill();
  //       };
  //     },
  //     { scope: rootRef },
  //   );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      <div
        data-loader="screen"
        className="fixed inset-0 top-[-100%] flex flex-col justify-between overflow-hidden bg-[#111111] text-white"
      >
        <div
          data-loader="rounded-top"
          className="relative h-0 w-full translate-y-[-99%] overflow-hidden"
        >
          <div className="absolute left-1/2 block h-[750%] w-[150%] -translate-x-1/2 -translate-y-[86%] rounded-[50%] bg-[#111111]" />
        </div>

        <div
          data-loader="words"
          className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2"
        >
          {greetings.map((item) => {
            let dataType = "home";

            if (item.variant.includes("home-active-first")) {
              dataType = "home-first";
            } else if (item.variant.includes("home-active-last")) {
              dataType = "home-last";
            }

            return (
              <h2
                key={item.text}
                data-loader-word={dataType}
                className="relative hidden w-max items-center text-[clamp(2rem,4vw,3.5rem)] font-medium leading-none text-white"
              >
                <span>{item.text}</span>
                <span className="ml-3 inline-block h-2.5 w-2.5 rounded-full bg-white" />
              </h2>
            );
          })}

          {hiddenWords.map((word, index) => (
            <h2
              key={`${word}-${index}`}
              data-loader-word="default"
              className="relative hidden w-max items-center text-[clamp(2rem,4vw,3.5rem)] font-medium leading-none text-white"
            >
              <span>{word}</span>
              <span className="ml-3 inline-block h-2.5 w-2.5 rounded-full bg-white" />
            </h2>
          ))}
        </div>

        <div
          data-loader="rounded-bottom"
          className="relative h-0 w-full translate-y-[99%] overflow-hidden"
        >
          <div className="absolute left-1/2 block h-[750%] w-[150%] -translate-x-1/2 -translate-y-[14%] rounded-[50%] bg-[#111111]" />
        </div>
      </div>
    </div>
  );
}
