"use client";

import { motion, type Variants } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
};

export function HeadingAnimation({
  children,
  className,
  duration = 0.5,
}: Props) {
  const variants: Variants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: 10 },
    visible: { filter: "blur(0px)", opacity: 1, y: 0 },
  };

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ staggerChildren: 0.1 }}
      className={cn("inline", className)}
    >
      {React.Children.map(children, (child, index) => {
        if (typeof child === "string") {
          // Split by space but keep the spaces in the array
          const words = child.split(/(\s+)/);
          return words.map((word, i) => {
            if (word.match(/^\s+$/)) {
              return (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: Needed for split text animation
                  key={`${index}-${i}`}
                >
                  {word}
                </span>
              );
            }
            if (word === "") return null;

            return (
              <motion.span
                // biome-ignore lint/suspicious/noArrayIndexKey: Needed for split text animation
                key={`${index}-${i}`}
                variants={variants}
                transition={{ duration, ease: "easeOut" }}
                className="inline-block"
              >
                {word}
              </motion.span>
            );
          });
        }

        // For non-string elements (like <br />), just render them as is
        if (React.isValidElement(child)) {
          // biome-ignore lint/suspicious/noExplicitAny: Required for arbitrary React.cloneElement
          return React.cloneElement(child, { key: index } as any);
        }

        return child;
      })}
    </motion.span>
  );
}
