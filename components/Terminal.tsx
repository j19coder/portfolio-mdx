"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import CodeHighlight from "./CodeHighlight";

export type TerminalLine = { type: "command"; text: string } | { type: "output"; text: string };

export interface TerminalProps {
  title?: string;
  prompt?: string;
  language?: string;
  /** Full control: ordered command/output lines */
  lines?: TerminalLine[];
  /** Convenience: single command + optional output */
  command?: string;
  output?: string;
}

const DEFAULT_PROMPT = "$ ";
const DEFAULT_TITLE = "Terminal";

function buildLines(props: TerminalProps): TerminalLine[] {
  if (props.lines?.length) return props.lines;
  const out: TerminalLine[] = [{ type: "command", text: props.command ?? "" }];
  if (props.output?.trim()) out.push({ type: "output", text: props.output.trim() });
  return out;
}

function getFullTextToCopy(lines: TerminalLine[], prompt: string): string {
  return lines
    .map((line) => (line.type === "command" ? `${prompt}${line.text}` : line.text))
    .join("\n");
}

function getCommandsOnly(lines: TerminalLine[]): string[] {
  return lines.filter((l): l is { type: "command"; text: string } => l.type === "command").map((l) => l.text);
}

export default function Terminal({
  title = DEFAULT_TITLE,
  prompt = DEFAULT_PROMPT,
  language = "bash",
  lines: linesProp,
  command,
  output,
}: TerminalProps) {
  const lines = useMemo(() => buildLines({ lines: linesProp, command, output }), [linesProp, command, output]);
  const fullText = useMemo(() => getFullTextToCopy(lines, prompt), [lines, prompt]);
  const copyAll = useCallback(async () => {
    await navigator.clipboard.writeText(fullText);
  }, [fullText]);

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 font-mono text-sm shadow-lg">
      <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800/80 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
        </div>
        <span className="text-xs text-zinc-500">{title}</span>
        <CopyButton onCopy={copyAll} label="Copy all" />
      </div>
      <div className="max-h-[32rem] overflow-auto">
        {lines.map((line, idx) =>
          line.type === "command" ? (
            <CommandLine
              key={idx}
              prompt={prompt}
              text={line.text}
              language={language}
              onCopyCommand={() => navigator.clipboard.writeText(line.text)}
            />
          ) : (
            <OutputLine key={idx} text={line.text} />
          )
        )}
      </div>
    </div>
  );
}

function CopyButton({ onCopy, label }: { onCopy: () => Promise<void>; label: string }) {
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
      className="rounded p-1.5 text-zinc-400 transition hover:bg-zinc-700 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

function CommandLine({
  prompt,
  text,
  language,
  onCopyCommand,
}: {
  prompt: string;
  text: string;
  language: string;
  onCopyCommand: () => void;
}) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    onCopyCommand();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="group flex items-start gap-2 border-b border-zinc-800/50 px-3 py-2 last:border-b-0">
      <span className="select-none shrink-0 pt-0.5 text-emerald-400/90">{prompt}</span>
      <div className="min-w-0 flex-1 overflow-x-auto">
        <CodeHighlight code={text} language={language} className="!py-0 !px-0" />
      </div>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy command"
        className="mt-1.5 shrink-0 rounded p-1 text-zinc-500 opacity-0 transition hover:bg-zinc-700 hover:text-zinc-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 group-hover:opacity-100"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}

function OutputLine({ text }: { text: string }) {
  return (
    <div className="border-b border-zinc-800/50 px-4 py-2 last:border-b-0">
      <pre className="whitespace-pre-wrap break-words font-mono text-xs text-zinc-400">{text}</pre>
    </div>
  );
}
