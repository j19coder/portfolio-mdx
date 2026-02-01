"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import CodeHighlight from "./CodeHighlight";

export interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  /** Optional output (supports multiple lines via \n). Shown below the code with an "Output" label. */
  output?: string;
}

function CopyButton({
  onCopy,
  label,
  className = "",
}: {
  onCopy: () => void | Promise<void>;
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const handleClick = async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={`rounded p-1.5 text-zinc-400 transition hover:bg-zinc-700 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900 ${className}`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

/**
 * Code snippet with line numbers. Uses CodeHighlight with lineNumbers.
 * Optional output section (multi-line) below the code. Copy buttons for code and output.
 * Respects NEXT_PUBLIC_SYNTAX_HIGHLIGHTER (prism | rsh).
 * Use for Java, Python, Rust, Go, etc. (no terminal prompt).
 */
export default function CodeSnippet({
  code,
  language = "text",
  title,
  output,
}: CodeSnippetProps) {
  const outputTrimmed = output != null && output.trim() !== "" ? output.trim() : null;
  const languageLabel =
    language && language !== "text"
      ? language.charAt(0).toUpperCase() + language.slice(1).toLowerCase()
      : null;
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 font-mono text-sm shadow-lg">
      <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800/80 px-3 py-2">
        <span className="text-xs text-zinc-400">{title ?? "Code"}</span>
        <div className="flex items-center gap-2">
          {languageLabel ? (
            <span className="text-xs text-zinc-500">{languageLabel}</span>
          ) : null}
          <CopyButton
            label="Copy code"
            onCopy={() => navigator.clipboard.writeText(code)}
          />
        </div>
      </div>
      <div className="max-h-[32rem] overflow-auto px-0 py-0">
        <CodeHighlight code={code} language={language} lineNumbers className="!py-4 !px-4" />
      </div>
      {outputTrimmed ? (
        <>
          <div className="flex items-center justify-between border-t border-zinc-700 bg-zinc-800/60 px-3 py-1.5">
            <span className="text-xs text-zinc-500">Output</span>
            <CopyButton
              label="Copy output"
              onCopy={() => navigator.clipboard.writeText(outputTrimmed)}
            />
          </div>
          <pre className="whitespace-pre-wrap break-words border-t border-zinc-800 px-4 py-3 text-zinc-400">
            {outputTrimmed}
          </pre>
        </>
      ) : null}
    </div>
  );
}
