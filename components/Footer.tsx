import { Github, Linkedin, Mail } from "lucide-react";

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com";
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com";
const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/80 mt-auto">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between md:px-6">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} · TheJNichols.com ·  All rights reserved.
        </p>
        <span className="flex items-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded p-2 text-zinc-500 transition hover:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
          >
            <Github size={20} />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded p-2 text-zinc-500 transition hover:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
          >
            <Linkedin size={20} />
          </a>
          {EMAIL ? (
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="rounded p-2 text-zinc-500 transition hover:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              <Mail size={20} />
            </a>
          ) : null}
        </span>
      </div>
    </footer>
  );
}
