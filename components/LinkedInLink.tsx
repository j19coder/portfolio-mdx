"use client";

import { useCallback } from "react";
import { Linkedin } from "lucide-react";

const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com";

/** Extract vanity username from linkedin.com/in/username for app deep link */
function getAppUrl(webUrl: string): string | null {
  try {
    const url = new URL(webUrl);
    const match = url.pathname.match(/^\/in\/([^/?]+)/);
    if (match) return `linkedin://in/${match[1]}`;
    return null;
  } catch {
    return null;
  }
}

function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
      window.location.href = appUrl;
      setTimeout(() => {
        window.location.href = LINKEDIN_URL;
      }, 2500);
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
