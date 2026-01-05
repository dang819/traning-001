// components/todo-rating.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";

type TodoRatingProps = {
  todoId: number;
  label?: string; // improves aria-label text
};

const STAR_VALUES = [1, 2, 3, 4, 5] as const;

function clampRating(value: number) {
  return Math.min(Math.max(value, 0), 5);
}

export function TodoRating({ todoId, label }: TodoRatingProps) {
  const storageKey = useMemo(() => `todo:rating:${todoId}`, [todoId]);

  // Read initial rating from sessionStorage (session persistence).
  const [rating, setRating] = useState<number>(() => {
    if (typeof window === "undefined") return 0;

    const raw = window.sessionStorage.getItem(storageKey);
    const parsed = raw ? Number(raw) : 0;

    return Number.isFinite(parsed) ? clampRating(parsed) : 0;
  });

  // Hover/focus preview (not persisted).
  const [hovered, setHovered] = useState<number>(0);

  // Persist rating changes.
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (rating === 0) {
      window.sessionStorage.removeItem(storageKey);
      return;
    }

    window.sessionStorage.setItem(storageKey, String(rating));
  }, [rating, storageKey]);

  function handleSelect(next: number) {
    setRating((prev) => (prev === next ? 0 : next));
  }

  const displayValue = hovered > 0 ? hovered : rating;

  return (
    <div
      role="radiogroup"
      aria-label={label ? `Star rating for ${label}` : "Star rating"}
      className="flex items-center gap-1"
      onMouseLeave={() => setHovered(0)}
    >
      {STAR_VALUES.map((value) => {
        const isFilled = value <= displayValue;
        const isSelected = rating === value;

        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={
              rating === value
                ? `Remove ${value}-star rating`
                : `Set ${value}-star rating`
            }
            className={[
              "rounded p-0.5 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
              isFilled ? "text-amber-500" : "text-slate-300",
            ].join(" ")}
            onMouseEnter={() => setHovered(value)}
            onFocus={() => setHovered(value)}
            onBlur={() => setHovered(0)}
            onClick={() => handleSelect(value)}
          >
            <Star
              className="h-4 w-4"
              // Lucide uses stroke by default; fill produces the filled star effect.
              fill={isFilled ? "currentColor" : "none"}
              stroke="currentColor"
            />
          </button>
        );
      })}
    </div>
  );
}
