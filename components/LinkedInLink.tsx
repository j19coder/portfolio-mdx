"use client";

import { useCallback } from "react";
import { Linkedin } from "lucide-react";

const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com";

/** Extract path (e.g. /in/username) for Android Intent; username for custom scheme */
function getProfilePath(webUrl: string): { path: string; username: string | null } | null {
  try {
    const url = new URL(webUrl);
    const match = url.pathname.match(/^(\/in\/[^/?]+)/);
    if (match) {
      const username = url.pathname.match(/^\/in\/([^/?]+)/)?.[1] ?? null;
      return { path: match[1], username };
    }
    return null;
  } catch {
    return null;
  }
}

function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}

function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/** Android: Intent URL so Chrome opens app (or fallback). iOS: custom scheme linkedin://profile/username */
function getAppUrl(webUrl: string): string | null {
  const parsed = getProfilePath(webUrl);
  if (!parsed) return null;
  if (isAndroid()) {
    const host = "www.linkedin.com";
    const fallback = encodeURIComponent(webUrl);
    return `intent://${host}${parsed.path}#Intent;scheme=https;package=com.linkedin.android;S.browser_fallback_url=${fallback};end`;
  }
  if (parsed.username) {
    return `linkedin://profile/${parsed.username}`;
  }
  return null;
}

/** Open URL via a temporary link click so the browser treats it as a user gesture (required for intents/custom schemes). */
function openAsUserGesture(url: string): void {
  const a = document.createElement("a");
  a.href = url;
  a.rel = "noopener noreferrer";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

interface LinkedInLinkProps {
  className?: string;
  size?: number;
  onClick?: () => void;
  "aria-label"?: string;
}

export default function LinkedInLink({
  className,
  size = 20,
  onClick,
  "aria-label": ariaLabel = "LinkedIn",
}: LinkedInLinkProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.();
      if (!isMobile()) return;
      const appUrl = getAppUrl(LINKEDIN_URL);
      if (!appUrl) return;
      e.preventDefault();
      // Use a temporary link click so the browser treats it as a user gesture (required for Android intents and custom schemes).
      openAsUserGesture(appUrl);
      // iOS: custom scheme has no built-in fallback; redirect to web after a short delay if the app didn’t open.
      if (!isAndroid()) {
        setTimeout(() => {
          window.location.href = LINKEDIN_URL;
        }, 2000);
      }
    },
    [onClick]
  );

  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={handleClick}
      className={className}
    >
      <Linkedin size={size} />
    </a>
  );
}
