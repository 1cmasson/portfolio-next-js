"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const components: Components = {
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-[#7cfc00] text-glow-green mt-10 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-[#7cfc00]/90 mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-slate-200/90 leading-relaxed mb-4">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#facc15] hover:text-[#7cfc00] underline underline-offset-2 transition"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-2 text-slate-200/90 mb-4 ml-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-2 text-slate-200/90 mb-4 ml-2">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="ml-2">{children}</li>,
  hr: () => (
    <hr className="border-[rgba(124,252,0,0.2)] my-10" />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm text-slate-200/90 border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-[rgba(124,252,0,0.3)] text-[#7cfc00] text-left">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 border-b border-[rgba(124,252,0,0.1)]">
      {children}
    </td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[#facc15] pl-4 italic text-slate-200/70 my-4">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");

    if (match) {
      return (
        <div className="my-6 rounded-lg overflow-hidden border border-[rgba(124,252,0,0.15)]">
          <div className="flex items-center justify-between px-4 py-2 bg-[rgba(15,23,42,0.9)] border-b border-[rgba(124,252,0,0.15)]">
            <span className="text-xs uppercase tracking-widest text-[#facc15]/70">
              {match[1]}
            </span>
          </div>
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            customStyle={{
              margin: 0,
              borderRadius: 0,
              background: "rgba(0, 0, 0, 0.5)",
              fontSize: "0.85rem",
            }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      );
    }

    return (
      <code
        className="bg-[rgba(124,252,0,0.1)] text-[#7cfc00] px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },
};

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
