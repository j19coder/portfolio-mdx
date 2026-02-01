import type { MDXComponents } from "mdx/types";
import Terminal from "@/components/Terminal";
import CodeSnippet from "@/components/CodeSnippet";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Terminal,
    CodeSnippet,
    h1: ({ className, ...props }) => (
      <h1 className={`${className ?? ""} text-cyan-300`} {...props} />
    ),
    h2: ({ className, ...props }) => (
      <h2 className={`${className ?? ""} text-cyan-300`} {...props} />
    ),
    h3: ({ className, ...props }) => (
      <h3 className={`${className ?? ""} text-cyan-200`} {...props} />
    ),
    h4: ({ className, ...props }) => (
      <h4 className={`${className ?? ""} text-cyan-100`} {...props} />
    ),
    h5: ({ className, ...props }) => (
      <h5 className={`${className ?? ""} text-zinc-300`} {...props} />
    ),
    h6: ({ className, ...props }) => (
      <h6 className={`${className ?? ""} text-zinc-400`} {...props} />
    ),
    ...components,
  };
}
