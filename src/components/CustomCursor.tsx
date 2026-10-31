"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on mobile/touch devices
    if (window.innerWidth < 768 || "ontouchstart" in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animationId: number;
    let isVisible = true;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Move dot directly via transform (GPU-accelerated, avoids layout thrash)
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      dot.style.visibility = "visible";
      ring.style.visibility = "visible";
    };

    const animate = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      // Use translate3d for GPU compositing
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      animationId = requestAnimationFrame(animate);
    };

    const handlePointerLeave = () => {
      dot.style.visibility = "hidden";
      ring.style.visibility = "hidden";
    };

    const handleMouseEnterInteractive = () => {
      ring.classList.add("hover");
    };

    const handleMouseLeaveInteractive = () => {
      ring.classList.remove("hover");
    };

    // Pause when tab hidden
    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    animationId = requestAnimationFrame(animate);

    // Use event delegation instead of attaching to every interactive element
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, input, textarea, [role='button']")) {
        handleMouseEnterInteractive();
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, input, textarea, [role='button']")) {
        handleMouseLeaveInteractive();
      }
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        style={{ left: 0, top: 0, willChange: "transform", visibility: "hidden" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        style={{ left: 0, top: 0, willChange: "transform", visibility: "hidden" }}
      />
    </>
  );
}
