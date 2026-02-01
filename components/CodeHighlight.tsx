"use client";

import { Highlight, themes } from "prism-react-renderer";
import { Prism as SyntaxHighlighterRSH } from "react-syntax-highlighter";
import { oneDark as styleRSH } from "react-syntax-highlighter/dist/esm/styles/prism";

const DEFAULT_VARIANT = (process.env.NEXT_PUBLIC_SYNTAX_HIGHLIGHTER as "prism" | "rsh") ?? "prism";

type Variant = "prism" | "rsh";

interface CodeHighlightProps {
  code: string;
  language?: string;
  variant?: Variant;
  className?: string;
  /** Show line numbers (Option B: uses RSH showLineNumbers or Prism line column) */
  lineNumbers?: boolean;
}

const lineNumberStyle = {
  minWidth: "2.5em",
  paddingRight: "1em",
  color: "#71717a",
  userSelect: "none" as const,
};

export default function CodeHighlight({
  code,
  language = "bash",
  variant = DEFAULT_VARIANT,
  className = "",
  lineNumbers = false,
}: CodeHighlightProps) {
  if (variant === "rsh") {
    return (
      <SyntaxHighlighterRSH
        language={language}
        style={styleRSH}
        showLineNumbers={lineNumbers}
        lineNumberStyle={lineNumbers ? lineNumberStyle : undefined}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: "0.75rem 1rem",
          background: "transparent",
          fontSize: "0.875rem",
        }}
        codeTagProps={{ className: "font-mono" }}
        className={className}
      >
        {code}
      </SyntaxHighlighterRSH>
    );
  }

  return (
    <Highlight theme={themes.vsDark} code={code} language={language}>
      {({ className: innerClassName, style, tokens, getLineProps, getTokenProps }) => {
        const pre = (
          <pre
            className={`overflow-x-auto font-mono text-sm ${innerClassName} ${className}`}
            style={{ ...style, margin: 0, padding: "0.75rem 1rem", background: "transparent" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        );
        if (!lineNumbers) return pre;
        const lineHeight = "1.5rem";
        return (
          <div className="flex overflow-x-auto">
            <div
              className="shrink-0 py-[0.75rem] pl-1 pr-4 font-mono text-sm tabular-nums text-zinc-500 select-none"
              style={{ minWidth: "2.5em", lineHeight }}
              aria-hidden
            >
              {tokens.map((_, i) => (
                <div key={i} style={{ height: lineHeight }}>
                  {i + 1}
                </div>
              ))}
            </div>
            <pre
              className={`overflow-x-auto font-mono text-sm ${innerClassName} ${className}`}
              style={{ ...style, margin: 0, padding: "0.75rem 1rem", background: "transparent", lineHeight }}
            >
              {tokens.map((line, i) => (
                <div key={i} style={{ height: lineHeight }} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          </div>
        );
      }}
    </Highlight>
  );
}
