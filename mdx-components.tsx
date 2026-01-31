import type { MDXComponents } from "mdx/types";
import Terminal from "@/components/Terminal";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Terminal,
    h1: ({ className, ...props }) => (
      <h1 className={`${className ?? ""} text-cyan-300`} {...props} />
    ),
    h2: ({ className, ...props }) => (
      <h2 className={`${className ?? ""} text-cyan-300`} {...props} />
    ),
    h3: ({ className, ...props }) => (
      <h3 className={`${className ?? ""} text-cyan-200`} {...props} />
    ),
    ...components,
  };
}
