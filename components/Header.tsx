"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com";
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com";
const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ctf", label: "CTF" },
  { href: "/resume", label: "Resume" },
  { href: "/about", label: "About" },
];

const linkClass =
  "block py-3 text-zinc-400 transition hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 text-right";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link
          href="https://thejnichols.com"
          className="text-lg font-medium text-zinc-100 transition hover:text-white"
        >
          Joshua Nichols
        </Link>

        {/* Desktop nav: visible from md up */}
        <nav className="hidden flex-wrap items-center gap-6 text-sm md:flex md:flex-row">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-zinc-400 transition hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              {label}
            </Link>
          ))}
          <span className="flex items-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded p-1.5 text-zinc-400 transition hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              <Github size={20} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded p-1.5 text-zinc-400 transition hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              <Linkedin size={20} />
            </a>
            {EMAIL ? (
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Email"
                className="rounded p-1.5 text-zinc-400 transition hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
              >
                <Mail size={20} />
              </a>
            ) : null}
          </span>
        </nav>

        {/* Mobile: hamburger button */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="rounded p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 md:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu overlay: right-aligned, fade in/out */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        onClick={closeMenu}
        className={`fixed inset-0 top-[57px] z-40 bg-zinc-950/90 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className="flex h-full flex-col items-end justify-start pt-0 pr-4 text-right"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full max-w-[280px] rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-4 shadow-lg">
            {navLinks.map(({ href, label }) => (
              <div key={href} className="border-b border-zinc-800 last:border-b-0">
                <Link
                  href={href}
                  onClick={closeMenu}
                  className={linkClass}
                >
                  {label}
                </Link>
              </div>
            ))}
            <div className="border-t border-zinc-800 pt-4 mt-4" />
            <div className="flex items-center justify-end gap-4 text-right">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              onClick={closeMenu}
              className="rounded p-2 text-zinc-400 transition hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              <Github size={22} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              onClick={closeMenu}
              className="rounded p-2 text-zinc-400 transition hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              <Linkedin size={22} />
            </a>
            {EMAIL ? (
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Email"
                onClick={closeMenu}
                className="rounded p-2 text-zinc-400 transition hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
              >
                <Mail size={22} />
              </a>
            ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}