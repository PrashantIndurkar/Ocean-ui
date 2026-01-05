"use client";

import * as React from "react";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

import { Menu, X, GitFork } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GithubIcon } from "@/components/icons/github-icon";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [forkCount, setForkCount] = useState(0);
  const [showStars, setShowStars] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  // Fetch GitHub stats on component mount
  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/PrashantIndurkar/Ocean-ui"
        );
        if (response.ok) {
          const data = await response.json();
          setStarCount(data.stargazers_count || 0);
          setForkCount(data.forks_count || 0);
        }
      } catch (error) {
        // Silent error handling - component continues with default values
      }
    };

    fetchGitHubStats();
  }, []);

  // Toggle between stars and forks every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowStars((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center w-full py-6 px-4 z-50">
      <div className="flex items-center justify-between px-6 py-3 bg-background rounded-full shadow-lg w-full max-w-3xl relative z-10 border border-border">
        <div className="flex items-center">
          🌴{" "}
          <span className="text-lg font-bold text-foreground tracking-tight ml-2">
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
              className="text-sm text-foreground hover:text-muted-foreground transition-colors font-medium"
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
              className="text-sm text-foreground hover:text-muted-foreground transition-colors font-medium"
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
              className="text-sm text-foreground hover:text-muted-foreground transition-colors font-medium"
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
              className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
              aria-label={
                showStars
                  ? `View on GitHub - ${formatCount(starCount)} stars`
                  : `View on GitHub - ${formatCount(forkCount)} forks`
              }
            >
              <AnimatePresence mode="wait">
                {showStars ? (
                  <motion.div
                    key="star-icon"
                    className="inline-flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GithubIcon size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="fork-icon"
                    className="inline-flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GitFork size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.span
                  key={showStars ? "stars" : "forks"}
                  className="text-sm font-medium text-muted-foreground"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {formatCount(showStars ? starCount : forkCount)}
                </motion.span>
              </AnimatePresence>
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
          <Menu className="h-6 w-6 text-foreground" />
        </motion.button>
      </div>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background z-50 pt-24 px-6 md:hidden"
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
              <X className="h-6 w-6 text-foreground" />
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
                  className="text-base text-foreground font-medium hover:text-muted-foreground transition-colors"
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
                  className="text-base text-foreground font-medium hover:text-muted-foreground transition-colors"
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
                  className="text-base text-foreground font-medium hover:text-muted-foreground transition-colors"
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
                    className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
                    aria-label={
                      showStars
                        ? `View on GitHub - ${formatCount(starCount)} stars`
                        : `View on GitHub - ${formatCount(forkCount)} forks`
                    }
                    onClick={toggleMenu}
                  >
                    <AnimatePresence mode="wait">
                      {showStars ? (
                        <motion.div
                          key="star-icon"
                          className="inline-flex items-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <GithubIcon size={20} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="fork-icon"
                          className="inline-flex items-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <GitFork size={20} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={showStars ? "stars" : "forks"}
                        className="text-sm font-medium text-muted-foreground"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {formatCount(showStars ? starCount : forkCount)}
                      </motion.span>
                    </AnimatePresence>
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
