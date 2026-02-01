"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  projectSections,
  ctfPlatforms,
  ctfPlatformLabels,
  platformKeys,
  type PlatformKey,
} from "@/lib/project-config";

type Crumb = { href: string; label: string };

function getCrumbs(pathname: string): Crumb[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: Crumb[] = [{ href: "/projects", label: "Projects" }];

  if (segments[0] !== "projects" || segments.length < 2) return crumbs;

  // segments: ["projects", "ctf", ...] or ["projects", "ml"], etc.
  const sectionKey = segments[1];
  const section = projectSections.find((s) => s.href === `/projects/${sectionKey}`);
  if (!section) return crumbs;
  crumbs.push({ href: section.href, label: section.label });

  if (sectionKey !== "ctf" || segments.length < 3) return crumbs;

  const platformKey = segments[2] as PlatformKey;
  if (!platformKeys.includes(platformKey)) return crumbs;
  const platformLabel = ctfPlatformLabels[platformKey];
  crumbs.push({
    href: `/projects/ctf/${platformKey}`,
    label: platformLabel,
  });

  if (segments.length < 4) return crumbs;
  const gameKey = segments[3];
  const game = ctfPlatforms[platformKey]?.games[gameKey];
  if (!game) return crumbs;
  crumbs.push({
    href: `/projects/ctf/${platformKey}/${gameKey}`,
    label: game.label,
  });

  if (segments.length < 5) return crumbs;
  const slug = segments[4];
  const level = game.levels.find((l) => l.slug === slug);
  if (level) {
    crumbs.push({
      href: `/projects/ctf/${platformKey}/${gameKey}/${slug}`,
      label: level.title,
    });
  }

  return crumbs;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const crumbs = getCrumbs(pathname ?? "");

  if (crumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-400">
        {crumbs.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight
                className="shrink-0 text-zinc-600"
                size={14}
                aria-hidden
              />
            )}
            {i === crumbs.length - 1 ? (
              <span className="font-medium text-zinc-300" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="transition hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
