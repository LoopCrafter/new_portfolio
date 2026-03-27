"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type PageLoaderProps = {
  onStartScroll?: () => void;
  onStopScroll?: () => void;
};

const greetings = [
  { text: "Hello", className: "home-active home-active-first" },
  { text: "Bonjour", className: "home-active" },
  { text: "स्वागत हे", className: "home-active" },
  { text: "Ciao", className: "home-active" },
  { text: "Olá", className: "home-active" },
  { text: "おい", className: "home-active jap" },
  { text: "Hallå", className: "home-active" },
  { text: "Guten tag", className: "home-active" },
  { text: "Hallo", className: "home-active-last" },
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

  //       tl.set(".loading-screen", {
  //         top: "0",
  //       });

  //       tl.set("main .once-in", {
  //         y: onceInY,
  //       });

  //       tl.set(".loading-words", {
  //         opacity: 0,
  //         y: -50,
  //       });

  //       tl.set(".loading-words .active", {
  //         display: "none",
  //       });

  //       tl.set(".loading-words .home-active, .loading-words .home-active-last", {
  //         display: "block",
  //         opacity: 0,
  //       });

  //       tl.set(".loading-words .home-active-first", {
  //         opacity: 1,
  //       });

  //       tl.set(".loading-screen .rounded-div-wrap.bottom", {
  //         height: roundedHeight,
  //       });

  //       tl.set("html", {
  //         cursor: "wait",
  //       });

  //       tl.call(() => {
  //         onStopScroll?.();
  //       });

  //       tl.to(".loading-words", {
  //         duration: 0.8,
  //         opacity: 1,
  //         y: -50,
  //         ease: "power4.out",
  //         delay: 0.5,
  //       });

  //       tl.to(
  //         ".loading-words .home-active",
  //         {
  //           duration: 0.01,
  //           opacity: 1,
  //           stagger: 0.15,
  //           ease: "none",
  //           onStart: () => {
  //             gsap.to(".loading-words .home-active", {
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

  //       tl.to(".loading-words .home-active-last", {
  //         duration: 0.01,
  //         opacity: 1,
  //         delay: 0.15,
  //       });

  //       tl.to(".loading-screen", {
  //         duration: 0.8,
  //         top: "-100%",
  //         ease: "power4.inOut",
  //         delay: 0.2,
  //       });

  //       tl.to(
  //         ".loading-screen .rounded-div-wrap.bottom",
  //         {
  //           duration: 1,
  //           height: "0vh",
  //           ease: "power4.inOut",
  //         },
  //         "=-.8",
  //       );

  //       tl.to(
  //         ".loading-words",
  //         {
  //           duration: 0.3,
  //           opacity: 0,
  //           ease: "linear",
  //         },
  //         "=-.8",
  //       );

  //       tl.set(".loading-screen", {
  //         top: "-100%",
  //       });

  //       tl.set(".loading-screen .rounded-div-wrap.bottom", {
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
    <div ref={rootRef} className="loading-container">
      <div className="loading-screen">
        <div className="rounded-div-wrap top">
          <div className="rounded-div" />
        </div>

        <div className="loading-words">
          {greetings.map((item) => (
            <h2 key={item.text} className={item.className}>
              {item.text}
              <div className="dot" />
            </h2>
          ))}

          {hiddenWords.map((word, index) => (
            <h2
              key={`${word}-${index}`}
              className={index === 0 ? "active" : ""}
            >
              {word}
              <div className="dot" />
            </h2>
          ))}
        </div>

        <div className="rounded-div-wrap bottom">
          <div className="rounded-div" />
        </div>
      </div>
    </div>
  );
}
