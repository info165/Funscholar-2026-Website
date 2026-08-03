"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

type Props = {
  /** The figure to count to. Formatting (commas) is applied automatically. */
  value: number;
  prefix?: string;
  suffix?: string;
  durationSec?: number;
};

/**
 * Ticks a number up from zero the first time it scrolls into view.
 *
 * The full figure is exposed via aria-label so assistive tech and crawlers read
 * the real value immediately rather than whatever frame the animation is on.
 */
export default function CountUp({ value, prefix = "", suffix = "", durationSec = 1.8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  const count = useMotionValue(0);
  const formatted = useTransform(
    count,
    (v) => `${prefix}${Math.round(v).toLocaleString("en-IN")}${suffix}`,
  );

  useEffect(() => {
    if (!inView) return;

    // Respect the OS "reduce motion" setting — land on the figure, don't count.
    if (reduceMotion) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, {
      duration: durationSec,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, value, durationSec, reduceMotion, count]);

  return (
    <span ref={ref} aria-label={`${prefix}${value.toLocaleString("en-IN")}${suffix}`}>
      <motion.span aria-hidden>{formatted}</motion.span>
    </span>
  );
}
