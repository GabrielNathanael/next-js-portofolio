"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Antigravity from "./Antigravity";

export default function AntigravityBackground() {
  const { resolvedTheme } = useTheme();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setShouldRender(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!shouldRender) {
    return null;
  }

  const particleColor = resolvedTheme === "dark" ? "#67E8F9" : "#2563EB";

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Antigravity
        count={500}
        magnetRadius={6}
        ringRadius={7}
        waveSpeed={0.4}
        waveAmplitude={1}
        particleSize={0.6}
        lerpSpeed={0.05}
        color={particleColor}
        autoAnimate={true}
        particleVariance={1}
        rotationSpeed={0}
        depthFactor={1}
        pulseSpeed={3}
        particleShape="capsule"
        fieldStrength={10}
      />
    </div>
  );
}
