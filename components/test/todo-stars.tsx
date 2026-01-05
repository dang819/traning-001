// components/test/todo-stars.tsx

"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export function TTodoStars() {
  const [rating, setRaiting] = useState(0);
  const [hover, setHover] = useState(0);
  const STARS = [1, 2, 3, 4, 5];

  const displayValue = rating > hover ? rating : hover;

  function handleRating(value: number) {
    setRaiting(value === rating ? 0 : value);
  }

  return (
    <div
      className="flex gap-1"
      onMouseLeave={() => setHover(0)}
      onBlur={() => setHover(0)}
    >
      {STARS.map((value) => {
        return (
          <button
            className="cursor-pointer"
            key={value}
            onMouseEnter={() => setHover(value)}
            onFocus={() => setHover(value)}
            onClick={() => handleRating(value)}
          >
            <Star
              fill={displayValue >= value ? "orange" : "white"}
              stroke="orange"
              size={15}
            />
          </button>
        );
      })}
    </div>
  );
}
