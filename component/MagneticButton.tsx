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
  enableFillEffect?: boolean;
  enableTextColorEffect?: boolean;
}

export default function MagneticWrapper({
  children,
  strength = 80,
  textStrength = 40,
  enableFillEffect = true,
  enableTextColorEffect = true,
}: MagneticWrapperProps) {
  const wrapperRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const el = wrapperRef.current;
    if (!el || window.innerWidth <= 540) return;

    const textEl = el.querySelector(".btn-text") as HTMLElement | null;
    const fillEl = el.querySelector(".btn-fill") as HTMLElement | null;
    const textInnerChangeEl = el.querySelector(
      ".btn-text-inner.change",
    ) as HTMLElement | null;

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
        duration: 0.7,
        ease: "power4.out",
        overwrite: "auto",
      });

      if (textEl) {
        gsap.to(textEl, {
          x: xTxt,
          y: yTxt,
          duration: 0.7,
          ease: "power4.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseEnter = () => {
      if (enableFillEffect && fillEl) {
        gsap.fromTo(
          fillEl,
          { y: "100%" },
          {
            y: "0%",
            duration: 0.6,
            ease: "power2.easeInOut",
            overwrite: "auto",
          },
        );
      }

      if (enableTextColorEffect && textInnerChangeEl) {
        gsap.fromTo(
          textInnerChangeEl,
          { color: "#1C1D20" },
          {
            color: "#FFFFFF",
            duration: 0.3,
            ease: "power3.in",
            overwrite: "auto",
          },
        );
      }

      el.parentElement?.classList.remove("not-active");
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
        overwrite: "auto",
      });

      if (textEl) {
        gsap.to(textEl, {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto",
        });
      }

      if (enableFillEffect && fillEl) {
        gsap.to(fillEl, {
          y: "-100%",
          duration: 0.6,
          ease: "power2.easeInOut",
          overwrite: "auto",
          onComplete: () => {
            gsap.set(fillEl, { y: "100%" });
          },
        });
      }

      if (enableTextColorEffect && textInnerChangeEl) {
        gsap.to(textInnerChangeEl, {
          color: "#1C1D20",
          duration: 0.3,
          delay: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      el.parentElement?.classList.remove("not-active");
    };

    el.addEventListener("mousemove", moveMagnet);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", moveMagnet);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, textStrength, enableFillEffect, enableTextColorEffect]);

  if (Children.count(children) !== 1 || !isValidElement(children)) {
    console.warn(
      "MagneticWrapper only accepts a single valid React element as a child",
    );
    return null;
  }

  const child = children as ReactElement<any>;

  return cloneElement(child, {
    ref: wrapperRef,
  });
}
