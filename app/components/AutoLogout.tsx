"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AutoLogout() {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    }, 60 * 60 * 1000); // 2 minutes
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    // Har activity pe timer reset karo
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Pehli baar timer start karo
    resetTimer();
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return null;
}