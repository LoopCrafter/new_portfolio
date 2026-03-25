"use client";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(SplitText, ScrollTrigger);

const About = () => {
  //   useGSAP(() => {
  //     const splitText = SplitText.create(".about .about-text", {
  //       type: "chars",
  //     });

  //     gsap.fromTo(
  //       splitText.chars,
  //       {
  //         color: "#999",
  //       },
  //       {
  //         color: "#000",
  //         scrollTrigger: {
  //           trigger: "p",
  //           start: "top top",
  //           end: "top 20%",
  //           scrub: true,
  //           markers: true,
  //         },
  //         ease: "none",
  //       }
  //     );
  //   }, []);

  return (
    <div className="h-[200vh] bg-white justify-center items-center about">
      <p className="text-[#999] about-text">
        Helping brands to stand out in the digital era. Together we will set the
        new status quo. No nonsense, always on the cutting edge.
      </p>
    </div>
  );
};

export default About;
