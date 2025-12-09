"use client";

import { motion } from "motion/react";

import { GLSLHills } from "@/components/graphics/glsl-hills";
import { LoadComponentButton } from "@/components/ui/load-component-button";
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
        className="pointer-events-none z-10 text-center absolute top-[20%] sm:top-[22%] md:top-[25%] left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight whitespace-pre-wrap bg-clip-text text-transparent mb-6 sm:mb-8 md:mb-10"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, var(--color-fg-primary) 0%, var(--color-fg-primary) 50%, var(--color-text-tertiary) 70%, var(--color-text-tertiary) 100%)",
          }}
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Beautiful Components for Design Engineers
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg text-text-tertiary leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          A collection of copy-&-paste components for quickly building
          application UIs. It&apos;s open-source and built with Tailwind CSS and
          Ark UI.
        </motion.p>

        <motion.div
          className="pointer-events-auto mb-8 sm:mb-12 md:mb-16 flex justify-center"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <LoadComponentButton
            text={{
              idle: "Browse Component",
              saving: "Loading Components...",
              saved: "Showing Components!",
            }}
          />
        </motion.div>

        <motion.div className="space-y-8" variants={containerVariants}>
          {/* Use "uppercase" for all caps in Tailwind CSS */}
          <motion.p
            className="text-sm font-medium text-text-tertiary uppercase tracking-wider"
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
                      <ReactJsIcon className="text-fg-primary/90 hover:text-fg-primary transition-colors h-10 w-10" />
                    ),
                  },
                  {
                    id: 2,
                    name: "SolidJs Framework",
                    icon: (
                      <SolidJsIcon className="text-fg-primary/90 hover:text-fg-primary transition-colors h-10 w-10" />
                    ),
                  },
                  {
                    id: 3,
                    name: "Vue Js Framework",
                    designation: "Support is coming soon!",
                    icon: (
                      <VueJsIcon className="text-fg-primary/90 hover:text-fg-primary transition-colors h-10 w-10" />
                    ),
                  },

                  {
                    id: 4,
                    name: "Svelte Js Framework",
                    designation: "Support is coming soon!",
                    icon: (
                      <SvelteJSIcon className="text-fg-primary/90 hover:text-fg-primary transition-colors h-10 w-10" />
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
