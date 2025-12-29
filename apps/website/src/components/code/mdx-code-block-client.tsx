"use client";

import { useEffect, useRef, useState } from "react";
import { CopyButton } from "./copy-button";

interface MDXCodeBlockClientProps {
  children: React.ReactNode;
}

export function MDXCodeBlockClient({ children }: MDXCodeBlockClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (containerRef.current) {
      // Find the pre element and extract its text content
      const preElement = containerRef.current.querySelector("pre");
      if (preElement) {
        const textContent = preElement.textContent || "";
        // Use requestAnimationFrame to avoid synchronous setState
        requestAnimationFrame(() => {
          setCode(textContent);
        });
      }
    }
  }, [children]);

  return (
    <div ref={containerRef} className="relative group mdx-code-block-wrapper">
      {children}
      {code && (
        <div className="absolute top-2 right-2 z-10">
          <CopyButton code={code} size={16} className="text-brand-400" />
        </div>
      )}
    </div>
  );
}
