import React from "react";
import type { Stats } from "../../../lib/types";
import { Tree } from "@phosphor-icons/react";
import { SplitText } from "../../../components/SplitText";

interface NaturalWorldProps {
  stats: Stats;
}

export const NaturalWorld = React.memo(({ stats }: NaturalWorldProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Tree className="text-emerald-500" size={32} weight="duotone" />
        <h2
          className="split-animate text-4xl tracking-widest"
          style={{ fontFamily: "Staatliches" }}
        >
          <SplitText>MUNDO NATURAL</SplitText>
        </h2>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 p-6 rounded-lg border-2 border-emerald-100 hover:scale-105 transition-transform">
            <p
              className="text-4xl text-emerald-900"
              style={{ fontFamily: "Emilys Candy" }}
            >
              {stats.lunarCycles}
            </p>
            <p
              className="text-sm italic text-emerald-700"
              style={{ fontFamily: "Instrument Serif" }}
            >
              ciclos lunares
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-100 hover:scale-105 transition-transform">
            <p
              className="text-4xl text-blue-900"
              style={{ fontFamily: "Emilys Candy" }}
            >
              {Math.floor(stats.livedWeeks / 52)}
            </p>
            <p
              className="text-sm italic text-blue-700"
              style={{ fontFamily: "Instrument Serif" }}
            >
              vueltas al sol
            </p>
          </div>
        </div>
        <p
          className="text-xl italic text-neutral-600 leading-relaxed"
          style={{ fontFamily: "Instrument Serif" }}
        >
          Tu edad actual representa el{" "}
          <span
            className="text-2xl text-neutral-900 not-italic"
            style={{ fontFamily: "Emilys Candy" }}
          >
            {stats.redwoodPercentage}%
          </span>{" "}
          de la vida potencial de una secuoya gigante.
        </p>
        <p
          className="text-lg italic text-neutral-500 leading-relaxed"
          style={{ fontFamily: "Instrument Serif" }}
        >
          Tu cuerpo ha reemplazado casi todas sus células varias veces. No eres
          la misma materia con la que naciste.
        </p>
      </div>
    </div>
  );
});
