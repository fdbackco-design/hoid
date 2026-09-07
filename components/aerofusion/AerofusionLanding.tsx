"use client";

import { useEffect, useRef } from "react";
import { AEROFUSION_MARKUP } from "./markup";

export default function AerofusionLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    void import("./main").then((mod) => {
      if (cancelled) {
        mod.destroyAerofusion();
        return;
      }
      mod.initAerofusion();
    });

    return () => {
      cancelled = true;
      void import("./main").then((mod) => mod.destroyAerofusion());
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="aerofusion-root"
      dangerouslySetInnerHTML={{ __html: AEROFUSION_MARKUP }}
    />
  );
}
