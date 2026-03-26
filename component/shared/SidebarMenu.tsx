"use client";

import { useEffect } from "react";
import Link from "next/link";
import MagneticWrapper from "../MagneticButton";

type SidebarMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/", label: "LinkedIn" },
  { href: "https://github.com/", label: "GitHub" },
];

export default function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  useEffect(() => {
    document.body.classList.toggle("nav-active", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("nav-active");
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <button
        type="button"
        aria-label="Close menu overlay"
        onClick={onClose}
        className={`fixed-nav-back ${isOpen ? "is-open" : ""}`}
      />

      <aside
        className={`fixed-nav theme-dark ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="fixed-nav-rounded-div">
          <div className="rounded-div-wrap">
            <div className="rounded-div" />
          </div>
        </div>

        <div className="fixed-nav-inner">
          <div className="nav-menu-top">
            <div className="nav-row">
              <h5 className="sidebar-kicker">Navigation</h5>
              <div className="sidebar-stripe" />

              <ul className="links-wrap">
                {navLinks.map((item, index) => (
                  <li
                    key={item.href}
                    className="btn btn-link sidebar-nav-item"
                    style={{
                      transitionDelay: isOpen
                        ? `${0.1 + index * 0.03}s`
                        : `${index * 0.03}s`,
                    }}
                  >
                    <MagneticWrapper
                      strength={24}
                      textStrength={12}
                      enableFillEffect={false}
                    >
                      <Link
                        href={item.href}
                        className="btn-click magnetic sidebar-link"
                        onClick={onClose}
                      >
                        <span className="btn-text">
                          <span className="btn-text-inner">{item.label}</span>
                        </span>
                      </Link>
                    </MagneticWrapper>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="social-row">
            <div className="sidebar-stripe" />

            <div className="socials">
              <h5 className="sidebar-kicker">Socials</h5>

              <ul className="sidebar-social-list grid grid-cols-2">
                {socialLinks.map((item) => (
                  <li key={item.href} className="btn btn-link-external">
                    <MagneticWrapper
                      strength={20}
                      textStrength={10}
                      enableFillEffect={false}
                    >
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-click magnetic sidebar-social-link"
                      >
                        <span className="btn-text">
                          <span className="btn-text-inner">{item.label}</span>
                        </span>
                      </a>
                    </MagneticWrapper>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
