"use client";

import { motion } from "framer-motion";

/**
 * template.tsx (unlike layout.tsx) remounts on every navigation, so this is
 * where the per-route enter animation belongs. Header and Footer sit in the
 * layout above it and therefore stay put while the page content transitions.
 *
 * Only opacity is animated — a transform here would create a containing block
 * for the whole page and break `position: fixed` inside it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
