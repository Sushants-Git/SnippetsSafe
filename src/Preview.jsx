import React, { useMemo, memo, useContext } from "react";
import Markdown from "react-markdown";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";

const CodeRenderer = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");

  return !inline && match ? (
    <SyntaxHighlighter
      style={oneDark}
      PreTag="div"
      language={match[1]}
      children={String(children).replace(/\n$/, "")}
      {...props}
    />
  ) : (
    <code className={className ? className : ""} {...props}>
      {children}
    </code>
  );
};

const Preview = memo(({ content }) => {
  console.log("Content");
  const memoizedComponents = useMemo(
    () => ({
      code: CodeRenderer,
    }),
    []
  );

  return (
    <section style={{ maxWidth: "100%", margin: "auto" }}>
      <div className="markdownWrapper">
        <Markdown remarkPlugins={[remarkGfm]} components={memoizedComponents}>
          {content}
        </Markdown>
      </div>
    </section>
  );
});

export default Preview;
