"use client";

import { motion } from "motion/react";

import { GLSLHills } from "@/components/graphics/glsl-hills";
import { SaveButton } from "@/components/ui/save-button";
import { ReactJsIcon } from "@/components/icons/react-icon";
import { VueJsIcon } from "@/components/icons/vue-icon";
import { SolidJsIcon } from "@/components/icons/solidjs-icon";
import { SvelteJSIcon } from "@/components/icons/svelte-icon";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const iconVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

export default function Hero() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start overflow-hidden">
      <GLSLHills />
      <motion.div
        className="pointer-events-none z-10 text-center absolute top-[25%] left-1/2 -translate-x-1/2 w-full max-w-4xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="font-semibold text-7xl leading-[1.1] tracking-tight whitespace-pre-wrap bg-clip-text text-transparent mb-10"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, var(--foreground) 0%, var(--foreground) 50%, var(--muted-foreground) 70%, var(--muted-foreground) 100%)",
          }}
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Beautiful Components for Design Engineers
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          A collection of copy-&-paste components for quickly building
          application UIs. It&apos;s open-source and built with Tailwind CSS and
          Ark UI.
        </motion.p>

        <motion.div
          className="pointer-events-auto mb-16 flex justify-center"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SaveButton
            text={{
              idle: "Browse Component",
              saving: "Loading Components...",
              saved: "Loaded Components!",
            }}
          />
        </motion.div>

        <motion.div className="space-y-8" variants={containerVariants}>
          {/* Use "uppercase" for all caps in Tailwind CSS */}
          <motion.p
            className="text-sm font-medium text-muted-foreground uppercase tracking-wider"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Works with your favorite frameworks
          </motion.p>
          <motion.div
            className="flex items-center justify-center pointer-events-auto"
            variants={containerVariants}
          >
            <motion.div
              variants={iconVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <AnimatedTooltip
                items={[
                  {
                    id: 1,
                    name: "React Js Framework",
                    icon: (
                      <ReactJsIcon className="text-foreground/90 hover:text-foreground transition-colors h-10 w-10" />
                    ),
                  },
                  {
                    id: 2,
                    name: "SolidJs Framework",
                    icon: (
                      <SolidJsIcon className="text-foreground/90 hover:text-foreground transition-colors h-10 w-10" />
                    ),
                  },
                  {
                    id: 3,
                    name: "Vue Js Framework",
                    designation: "Support is coming soon!",
                    icon: (
                      <VueJsIcon className="text-foreground/90 hover:text-foreground transition-colors h-10 w-10" />
                    ),
                  },

                  {
                    id: 4,
                    name: "Svelte Js Framework",
                    designation: "Support is coming soon!",
                    icon: (
                      <SvelteJSIcon className="text-foreground/90 hover:text-foreground transition-colors h-10 w-10" />
                    ),
                  },
                ]}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
