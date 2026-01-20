import React from "react";

// Componente helper para simular SplitText (sin licencia Club GSAP)
export const SplitText = ({
  children,
  className = "",
  charClass = "split-char",
}: {
  children: string;
  className?: string;
  charClass?: string;
}) => {
  return (
    <span className={`inline-block ${className}`} aria-label={children}>
      {children.split(" ").map((word, i) => (
        <span
          key={i}
          className="split-word inline-block whitespace-nowrap"
          aria-hidden="true"
        >
          {word.split("").map((char, j) => (
            <span key={j} className={`inline-block ${charClass}`}>
              {char}
            </span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  );
};
