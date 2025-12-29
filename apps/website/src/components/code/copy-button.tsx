'use client';

import { useState } from 'react';
import { CopyIcon } from '../icons/copy-icon';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  code: string;
  className?: string;
  size?: number;
}

export function CopyButton({ code, className, size = 16 }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'copy-button-custom inline-flex items-center justify-center rounded-md p-1.5',
        'text-muted-foreground hover:text-foreground',
        'hover:bg-muted transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      title={copied ? 'Copied!' : 'Copy code'}
      data-custom-copy-button="true"
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-500"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <CopyIcon size={size} />
      )}
    </button>
  );
}

