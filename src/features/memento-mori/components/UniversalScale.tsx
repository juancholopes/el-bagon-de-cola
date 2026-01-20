import React from "react";
import type { Stats } from "../../../lib/types";

interface UniversalScaleProps {
  stats: Stats;
}

export const UniversalScale = React.memo(({ stats }: UniversalScaleProps) => {
  return (
    <section className="p-12 md:p-20 rounded-lg overflow-hidden relative animate-in">
      <div className="relative z-10 space-y-12">
        <div className="text-center space-y-4">
          <h2
            className="text-6xl tracking-widest text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-amber-400"
            style={{ fontFamily: "Staatliches" }}
          >
            ESCALA UNIVERSAL
          </h2>
          <p
            className="text-xl italic opacity-70 max-w-3xl mx-auto"
            style={{ fontFamily: "Vina Sans" }}
          >
            La inmensidad del cosmos pone en perspectiva nuestra existencia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-lg space-y-4">
            <div className="text-5xl text-purple-300">🌌</div>
            <h3
              className="text-2xl tracking-wider text-purple-300"
              style={{ fontFamily: "Staatliches" }}
            >
              DIÁMETRO DEL UNIVERSO
            </h3>
            <p
              className="text-5xl font-bold text-neutral-900"
              style={{ fontFamily: "Emilys Candy" }}
            >
              93 mil millones
            </p>
            <p
              className="text-lg italic opacity-80"
              style={{ fontFamily: "Vina Sans" }}
            >
              de años luz de diámetro observable
            </p>
          </div>

          <div className="p-8 rounded-lg space-y-4">
            <div className="text-5xl text-amber-300">⏳</div>
            <h3
              className="text-2xl tracking-wider text-amber-300"
              style={{ fontFamily: "Staatliches" }}
            >
              EDAD DEL UNIVERSO
            </h3>
            <p
              className="text-5xl font-bold text-neutral-900"
              style={{ fontFamily: "Emilys Candy" }}
            >
              13.8 mil millones
            </p>
            <p
              className="text-lg italic opacity-80"
              style={{ fontFamily: "Vina Sans" }}
            >
              de años desde el Big Bang
            </p>
          </div>

          <div className="p-8 rounded-lg space-y-4">
            <div className="text-5xl text-rose-300">👤</div>
            <h3
              className="text-2xl tracking-wider text-rose-300"
              style={{ fontFamily: "Staatliches" }}
            >
              TU VIDA
            </h3>
            <p
              className="text-5xl font-bold text-neutral-900 break-all leading-tight"
              style={{ fontFamily: "Emilys Candy" }}
            >
              {stats.universeAgePercentage}%
            </p>
            <p
              className="text-lg italic opacity-80"
              style={{ fontFamily: "Vina Sans" }}
            >
              de la edad del universo
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12 rounded-lg">
          <p
            className="text-2xl md:text-3xl italic leading-relaxed text-center opacity-90"
            style={{ fontFamily: "Vina Sans" }}
          >
            "La luz tarda{" "}
            <span
              className="text-amber-300 not-italic font-bold"
              style={{ fontFamily: "Emilys Candy" }}
            >
              93 mil millones de años
            </span>{" "}
            en cruzar el universo observable. En esa escala infinita, tu vida es
            un destello imperceptible... pero es{" "}
            <span
              className="text-purple-300 not-italic font-bold"
              style={{ fontFamily: "Emilys Candy" }}
            >
              tu
            </span>{" "}
            destello, y merece ser vivido plenamente."
          </p>
        </div>
      </div>
    </section>
  );
});
