"use client";

import * as React from "react";

import { useState } from "react";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { WavesIcon } from "@/components/icons/waves-icon";
import { GithubIcon } from "@/components/icons/github-icon";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  // TODO: Fetch from GitHub API later
  const [starCount] = useState(1);

  const toggleMenu = () => setIsOpen(!isOpen);

  const formatStarCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center w-full py-6 px-4 z-50">
      <div className="flex items-center justify-between px-6 py-3 bg-bg-primary rounded-full shadow-lg w-full max-w-3xl relative z-10 border border-border-primary">
        <div className="flex items-center">
          <motion.div
            className="mr-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <WavesIcon size={25} className="text-fg-primary" />
          </motion.div>
          <span className="text-lg font-bold text-fg-primary tracking-tight">
            Ocean UI
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href="/"
              className="text-sm text-fg-primary hover:text-text-tertiary transition-colors font-medium"
            >
              Home
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href="/docs/documentation/introduction"
              className="text-sm text-fg-primary hover:text-text-tertiary transition-colors font-medium"
            >
              Docs
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href="/docs/base-components/accordion"
              className="text-sm text-fg-primary hover:text-text-tertiary transition-colors font-medium"
            >
              Components
            </Link>
          </motion.div>
        </nav>
        {/* Desktop CTA Button, GitHub Icon and Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center"
          >
            <a
              href="https://github.com/PrashantIndurkar/Ocean-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-fg-primary hover:text-text-tertiary transition-colors"
              aria-label="View on GitHub"
            >
              <GithubIcon size={20} />
              <span className="text-sm font-medium text-text-tertiary">
                {formatStarCount(starCount)}
              </span>
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="h-6 w-6 text-fg-primary" />
        </motion.button>
      </div>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-bg-primary z-50 pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-fg-primary" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Link
                  href="/"
                  className="text-base text-fg-primary font-medium hover:text-text-tertiary transition-colors"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Link
                  href="/docs/documentation/introduction"
                  className="text-base text-fg-primary font-medium hover:text-text-tertiary transition-colors"
                  onClick={toggleMenu}
                >
                  Docs
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Link
                  href="/docs/base-components/accordion"
                  className="text-base text-fg-primary font-medium hover:text-text-tertiary transition-colors"
                  onClick={toggleMenu}
                >
                  Components
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6 flex flex-col gap-4"
              >
                <div className="flex justify-center items-center gap-4">
                  <a
                    href="https://github.com/PrashantIndurkar/Ocean-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-fg-primary hover:text-text-tertiary transition-colors"
                    aria-label="View on GitHub"
                    onClick={toggleMenu}
                  >
                    <GithubIcon size={20} />
                    <span className="text-sm font-medium text-text-tertiary">
                      {formatStarCount(starCount)}
                    </span>
                  </a>
                  <ThemeToggle />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Navbar1 };
