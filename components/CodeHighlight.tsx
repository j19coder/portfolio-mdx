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
}

export default function CodeHighlight({
  code,
  language = "bash",
  variant = DEFAULT_VARIANT,
  className = "",
}: CodeHighlightProps) {
  if (variant === "rsh") {
    return (
      <SyntaxHighlighterRSH
        language={language}
        style={styleRSH}
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
      {({ className: innerClassName, style, tokens, getLineProps, getTokenProps }) => (
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
      )}
    </Highlight>
  );
}
