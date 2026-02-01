"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search as SearchIcon, X } from "lucide-react";
import { getSearchIndex, type SearchIndexEntry } from "@/lib/project-config";

function matchQuery(entry: SearchIndexEntry, q: string): boolean {
  if (!q.trim()) return true;
  const lower = q.toLowerCase().trim();
  return (
    entry.title.toLowerCase().includes(lower) ||
    entry.breadcrumb.toLowerCase().includes(lower)
  );
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setDebouncedQuery(query), 150);
    return () => clearTimeout(t);
  }, [query, open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const index = useMemo(() => getSearchIndex(), []);
  const results = useMemo(
    () => index.filter((entry) => matchQuery(entry, debouncedQuery)),
    [index, debouncedQuery]
  );
  const showResults = debouncedQuery.length > 0;
  const maxResults = 12;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search projects"
      className={`fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-sm transition-opacity duration-200 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
      onClick={onClose}
    >
      <div
        className="mx-auto mt-[12vh] max-w-xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl">
          <div className="flex items-center gap-2 border-b border-zinc-700 px-3 py-2">
            <SearchIcon className="shrink-0 text-zinc-500" size={20} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="min-w-0 flex-1 bg-transparent py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
              autoFocus
              aria-label="Search"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="rounded p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
            >
              <X size={20} />
            </button>
          </div>
          {showResults && (
            <div className="max-h-[60vh] overflow-y-auto py-2">
              {results.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-zinc-500">
                  No results for &quot;{debouncedQuery}&quot;
                </p>
              ) : (
                <ul className="space-y-0.5">
                  {results.slice(0, maxResults).map((entry) => (
                    <li key={entry.path}>
                      <Link
                        href={entry.path}
                        onClick={onClose}
                        className="block px-4 py-2.5 text-left text-sm transition hover:bg-zinc-800/80 focus:bg-zinc-800/80 focus:outline-none"
                      >
                        <span className="font-medium text-zinc-100">
                          {entry.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-zinc-500">
                          {entry.breadcrumb}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {results.length > maxResults && (
                <p className="px-4 py-2 text-center text-xs text-zinc-500">
                  Showing first {maxResults} of {results.length}. Refine your
                  search.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
