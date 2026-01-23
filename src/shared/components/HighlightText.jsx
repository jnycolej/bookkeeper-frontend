import React from "react";

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const HighlightText = ({ text, query }) => {
  if (!query) return <>{text}</>;
  const q = query.trim();
  if (!q) return <>{text}</>;

  const safe = escapeRegExp(q);
  const parts = String(text).split(new RegExp(`(${safe})`, "gi"));

  return (
    <>
      {parts.map((part, idx) => {
        const match = part.toLowerCase();
        return match ? (
          <mark key={idx} className="rounded bg-secondary/30 px-0.5">
            {part}
          </mark>
        ) : (
          <span key={idx}>{part}</span>
        );
      })}
    </>
  );
}