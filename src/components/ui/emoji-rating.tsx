import React, { useState } from 'react';
import { cn } from "../../lib/utils";

interface EmojiRatingProps {
  onChange: (value: number) => void;
  className?: string;
}

const EMOJIS = [
  { value: 1, label: 'Terrible', emoji: '😠' },
  { value: 2, label: 'Bad', emoji: '🙁' },
  { value: 3, label: 'Okay', emoji: '😐' },
  { value: 4, label: 'Good', emoji: '🙂' },
  { value: 5, label: 'Excellent', emoji: '😍' },
];

export function EmojiRating({ onChange, className }: EmojiRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (value: number) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-3 md:gap-6", className)}>
      {EMOJIS.map((item) => {
        const isSelected = selected === item.value;
        const isHovered = hovered === item.value;
        const isActive = isSelected || (hovered !== null && hovered >= item.value && selected === null);

        return (
          <button
            key={item.value}
            type="button"
            className={cn(
              "relative flex flex-col items-center justify-center rounded-[2rem] border-2 p-5 md:p-6 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform",
              "hover:scale-110 hover:-translate-y-3 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
              isSelected 
                ? "border-blue-500 bg-blue-50 shadow-[0_8px_30px_rgb(37,99,235,0.12)] scale-110" 
                : "border-transparent bg-white shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
            )}
            onMouseEnter={() => setHovered(item.value)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(item.value)}
            aria-pressed={isSelected}
            aria-label={`Rate ${item.value} stars: ${item.label}`}
          >
            <span 
              className={cn(
                "text-5xl md:text-6xl transition-transform duration-300 drop-shadow-sm",
                isSelected && "scale-125",
                !isSelected && isActive && "grayscale-[50%]"
              )}
              style={{
                filter: (!isSelected && selected !== null) ? 'grayscale(100%) opacity(50%)' : 'none'
              }}
            >
              {item.emoji}
            </span>
            <span 
              className={cn(
                "mt-4 text-sm font-semibold md:text-base transition-colors",
                isSelected ? "text-blue-700" : "text-slate-500"
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
