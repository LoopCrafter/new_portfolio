"use client";

import {
  cloneElement,
  isValidElement,
  useRef,
  ReactElement,
  ReactNode,
  Children,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface MagneticWrapperProps {
  children: ReactNode;
  strength?: number;
  textStrength?: number;
}

export default function MagneticWrapper({
  children,
  strength = 80,
  textStrength = 40,
}: MagneticWrapperProps) {
  const wrapperRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const el = wrapperRef.current;
    if (!el || window.innerWidth <= 540) return;

    const textEl = el.querySelector(".btn-text") as HTMLElement | null;

    const moveMagnet = (e: MouseEvent) => {
      const bounds = el.getBoundingClientRect();
      const relX = e.clientX - bounds.left;
      const relY = e.clientY - bounds.top;

      const x = (relX / el.offsetWidth - 0.5) * strength;
      const y = (relY / el.offsetHeight - 0.5) * strength;

      const xTxt = (relX / el.offsetWidth - 0.5) * textStrength;
      const yTxt = (relY / el.offsetHeight - 0.5) * textStrength;

      gsap.to(el, {
        x,
        y,
        ease: "power4.out",
        duration: 0.7,
      });

      if (textEl) {
        gsap.to(textEl, {
          x: xTxt,
          y: yTxt,
          ease: "power4.out",
          duration: 0.7,
        });
      }
    };

    const resetMagnet = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        ease: "elastic.out(1, 0.3)",
        duration: 1.2,
      });

      if (textEl) {
        gsap.to(textEl, {
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.3)",
          duration: 1.2,
        });
      }
    };

    el.addEventListener("mousemove", moveMagnet);
    el.addEventListener("mouseleave", resetMagnet);

    return () => {
      el.removeEventListener("mousemove", moveMagnet);
      el.removeEventListener("mouseleave", resetMagnet);
    };
  }, []);

  if (Children.count(children) !== 1 || !isValidElement(children)) {
    console.warn(
      "MagneticWrapper only accepts a single valid React element as a child"
    );
    return null;
  }

  const child = children as ReactElement<any>;

  return cloneElement(child, {
    ref: wrapperRef,
  });
}
