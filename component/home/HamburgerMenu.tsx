import React, { useState } from "react";

type HambergerMenuProps = {
  isScrolled: boolean;
  magneticRef?: React.Ref<HTMLButtonElement>;
};

const HamburgerMenu = ({ isScrolled, magneticRef }: HambergerMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <button
      type="button"
      ref={magneticRef}
      aria-label="Toggle menu"
      onClick={() => setIsMenuOpen((prev) => !prev)}
      className={`
          btn-hamburger
          ${
            isScrolled || isMenuOpen
              ? "[transform:translateY(0%)_scale(1)_rotate(0.001deg)] [transition-timing-function:cubic-bezier(0.34,1.5,0.64,1)]"
              : "[transform:translateY(0%)_scale(0)_rotate(0.001deg)] [transition-timing-function:cubic-bezier(0.36,0,0.66,0)]"
          }
        `}
    >
      <div className="absolute inset-0 rounded-full bg-[var(--color-blue)]" />

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
  );
};

export default HamburgerMenu;
