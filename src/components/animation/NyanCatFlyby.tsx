"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import { useMotionPreference } from "@/hooks";

export function NyanCatFlyby() {
  const { isReduced } = useMotionPreference();
  const controls = useAnimationControls();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const animate = async () => {
      if (isReduced) {
        controls.set({ x: -200, opacity: 0 });
        return;
      }

      await controls.start({
        x: ["calc(-200px)", "20vw", "110vw"],
        y: [0, -20, 20],
        opacity: [0, 1, 0],
        transition: {
          duration: 12,
          ease: "easeInOut",
        },
      });
    };

    const schedule = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      animate();
      intervalRef.current = setInterval(animate, 20000);
    };

    schedule();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isReduced, controls]);

  return (
    <motion.div
      animate={controls}
      initial={{ x: -200, opacity: 0 }}
      className="nyan-container"
      role="img"
      aria-label="Nyan Cat streaks across the galaxy trailing pixelated rainbows."
    >
      <Image
        src="/assets/nyan/nyan-cat.gif"
        alt=""
        width={180}
        height={100}
        priority
        unoptimized
      />
    </motion.div>
  );
}
