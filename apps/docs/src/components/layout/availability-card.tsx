"use client";

import { CardSpotlight } from "@/components/ui/card-spotlight";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";

export function AvailabilityCard() {
  return (
    <div className="fixed bottom-4 right-4 z-50 hidden md:block">
      <CardSpotlight
        radius={350}
        color="#e5e7eb"
        className={cn(
          "w-[320px] max-w-[calc(100vw-2rem)] p-6",
          "bg-white dark:bg-neutral-900",
          "border-neutral-200 dark:border-neutral-800",
          "shadow-lg dark:shadow-xl",
          "backdrop-blur-sm"
        )}
      >
        <div className="relative z-10 space-y-4">
          <div>
            <h3 className="text-sm font-semibold border w-fit px-2 py-1 rounded-full text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Open to Work
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              I&apos;m currently open to work full time, contract, remotely. If
              you want to hire me, you can hit me a mail on <br />
              <a
                href="mailto:prashantindurkarr@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium break-all"
              >
                prashantindurkarr@gmail.com
              </a>
            </p>
          </div>

          <div className="pt-2">
            <a
              href="mailto:prashantindurkarr@gmail.com"
              className={cn(
                "flex items-center justify-center gap-2",
                "w-full px-6 py-3 rounded-full",
                "bg-white dark:bg-white",
                "text-black dark:text-black",
                "font-semibold text-sm",
                "border border-gray-200 dark:border-gray-300",
                "hover:bg-gray-50 dark:hover:bg-gray-100",
                "transition-all duration-200",
                "shadow-sm hover:shadow-md",
                "active:scale-[0.98]"
              )}
              aria-label="Get in touch via email"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
              Available for immediate start
            </p>
          </div>
        </div>
      </CardSpotlight>
    </div>
  );
}
