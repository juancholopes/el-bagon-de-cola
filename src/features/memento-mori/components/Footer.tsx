import { Brain } from "@phosphor-icons/react";

export const Footer = () => {
  return (
    <footer className="pt-32 text-center space-y-12 animate-in">
      <div className="flex items-center justify-center gap-4">
        <div className="h-1 w-20 bg-neutral-900"></div>
        <Brain size={32} weight="duotone" />
        <div className="h-1 w-20 bg-neutral-900"></div>
      </div>
      <p
        className="text-5xl italic text-neutral-400 max-w-3xl mx-auto leading-tight"
        style={{ fontFamily: "Ephesis" }}
      >
        "la vida es un parpadeo en la escala cósmica. úsalo para lo que
        realmente importa."
      </p>
      <p
        className="text-xs uppercase tracking-[0.8em] text-neutral-300 font-bold"
        style={{ fontFamily: "Inter" }}
      >
        el vagón de cola • consciente
      </p>
    </footer>
  );
};
