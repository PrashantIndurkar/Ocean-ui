"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { motion, AnimatePresence } from "motion/react";

import { Loader2, Check, Sparkles } from "lucide-react";

import confetti from "canvas-confetti";

import { cn } from "@/lib/utils";

import { BoxesIcon, type BoxesIconHandle } from "@/components/icons/boxes-icon";

interface LoadComponentButtonProps {
  text?: {
    idle?: string;
    saving?: string;
    saved?: string;
  };
  className?: string;
  onSave?: () => Promise<void> | void;
}

export function LoadComponentButton({
  text = {
    idle: "Save",
    saving: "Saving...",
    saved: "Saved!",
  },
  className,
  onSave,
}: LoadComponentButtonProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [bounce, setBounce] = useState(false);
  const boxesIconRef = useRef<BoxesIconHandle>(null);
  const router = useRouter();

  const handleSave = async () => {
    if (status === "idle") {
      setStatus("saving");
      try {
        if (onSave) {
          await onSave();
        } else {
          // Simulate saving if onSave is not provided
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
        setStatus("saved");
        setBounce(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#00ffff",
            "#ff00ff",
          ],
          shapes: ["star", "circle"],
        });
        setTimeout(() => {
          router.push("/docs/components");
        }, 2000);
      } catch (error) {
        setStatus("idle");
        console.error("Save failed:", error);
      }
    }
  };

  const buttonVariants = {
    idle: {
      backgroundColor: "var(--color-bg-secondary)",
      color: "var(--color-text-secondary)",
      scale: 1,
    },
    saving: {
      backgroundColor: "var(--color-bg-brand-solid)",
      color: "var(--color-text-primary_on-brand)",
      scale: 1,
    },
    saved: {
      backgroundColor: "var(--color-bg-brand-primary)",
      color: "var(--color-text-brand-primary)",
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.2,
        times: [0, 0.5, 1],
      },
    },
  };

  const sparkleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleSave}
        animate={status}
        variants={buttonVariants}
        className={cn(
          "group relative grid overflow-hidden rounded-full px-6 py-3 transition-all duration-200 min-w-[150px]",
          status === "idle"
            ? "shadow-[0_1000px_0_0_hsl(0_0%_85%)_inset] dark:shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset]"
            : "",
          "hover:shadow-lg",
          className
        )}
        whileHover={status === "idle" ? { scale: 1.05 } : {}}
        whileTap={status === "idle" ? { scale: 0.95 } : {}}
        onMouseEnter={() => {
          if (status === "idle") {
            boxesIconRef.current?.startAnimation();
          }
        }}
        onMouseLeave={() => {
          if (status === "idle") {
            boxesIconRef.current?.stopAnimation();
          }
        }}
      >
        {status === "idle" && (
          <span>
            <span
              className={cn(
                "spark mask-gradient absolute inset-0 h-full w-full animate-flip overflow-hidden rounded-full",
                "[mask:linear-gradient(black,transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,black_360deg)]",
                "before:-rotate-90 before:animate-rotate dark:before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]",
                "before:content-[''] before:inset-[0_auto_auto_50%] before:[translate:-50%_-15%] dark:[mask:linear-gradient(white,transparent_50%)]"
              )}
            />
          </span>
        )}

        <span
          className={cn(
            "backdrop absolute inset-px rounded-[22px] transition-colors duration-200",
            status === "idle"
              ? "bg-bg-secondary group-hover:bg-bg-secondary"
              : ""
          )}
        />

        <span
          className={cn(
            "relative z-20 flex items-center justify-center gap-2 text-sm font-medium",
            status === "idle"
              ? "text-text-secondary"
              : status === "saving"
                ? "text-text-primary_on-brand"
                : "text-text-brand-primary"
          )}
        >
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <BoxesIcon ref={boxesIconRef} size={16} />
              </motion.span>
            )}

            {status === "saving" && (
              <motion.span
                key="saving"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  rotate: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1,
                    ease: "linear",
                  },
                }}
              >
                <Loader2 className="w-4 h-4" />
              </motion.span>
            )}

            {status === "saved" && (
              <motion.span
                key="saved"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Check className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>

          <motion.span
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {status === "idle"
              ? text.idle
              : status === "saving"
                ? text.saving
                : text.saved}
          </motion.span>
        </span>
      </motion.button>

      <AnimatePresence>
        {bounce && (
          <motion.div
            className="absolute top-0 right-0 -mr-1 -mt-1"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={sparkleVariants}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
