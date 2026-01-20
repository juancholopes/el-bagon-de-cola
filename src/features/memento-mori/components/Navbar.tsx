import { ArrowsClockwise } from "@phosphor-icons/react";

interface NavbarProps {
  onReset: () => void;
}

export const Navbar = ({ onReset }: NavbarProps) => {
  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-neutral-100 z-50 animate-in">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <span
          className="text-4xl tracking-widest"
          style={{ fontFamily: "Staatliches" }}
        >
          EL VAGÓN DE COLA.
        </span>
        <button
          onClick={onReset}
          className="group flex items-center gap-2 text-neutral-400 hover:text-black transition-colors cursor-pointer"
        >
          <span
            className="text-xs uppercase tracking-widest font-bold"
            style={{ fontFamily: "Inter" }}
          >
            reiniciar
          </span>
          <ArrowsClockwise
            size={18}
            className="group-hover:rotate-180 transition-transform duration-500"
          />
        </button>
      </div>
    </nav>
  );
};
