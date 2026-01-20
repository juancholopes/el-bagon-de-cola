import React from "react";
import type { Stats } from "../../../lib/types";
import { Sparkle } from "@phosphor-icons/react";
import { SplitText } from "../../../components/SplitText";

interface CosmicPerspectiveProps {
  stats: Stats;
}

export const CosmicPerspective = React.memo(({ stats }: CosmicPerspectiveProps) => {
  return (
    <section className="p-12 md:p-20 rounded-lg overflow-hidden relative animate-in">
      <div className="relative z-10 space-y-12">
        <div className="flex items-center gap-4">
          <Sparkle className="text-amber-400" size={32} weight="fill" />
          <h2
            className="split-animate text-5xl tracking-widest"
            style={{ fontFamily: "Staatliches" }}
          >
            <SplitText>PERSPECTIVA CÓSMICA</SplitText>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p
              className="text-2xl italic leading-relaxed opacity-80"
              style={{ fontFamily: "Instrument Serif" }}
            >
              Desde tu nacimiento, la Tierra ha viajado aproximadamente:
            </p>
            <p
              className="text-6xl text-amber-200"
              style={{ fontFamily: "Emilys Candy" }}
            >
              {stats.spaceTravelKM.toLocaleString()}
            </p>
            <p
              className="text-xl uppercase tracking-widest"
              style={{ fontFamily: "Staatliches" }}
            >
              Kilómetros alrededor del Sol
            </p>
          </div>
          <div className="space-y-6">
            <p
              className="text-2xl italic leading-relaxed opacity-80"
              style={{ fontFamily: "Instrument Serif" }}
            >
              Nuestro sistema solar se ha movido en la Vía Láctea:
            </p>
            <p
              className="text-6xl text-indigo-300"
              style={{ fontFamily: "Emilys Candy" }}
            >
              {stats.galaxyTravelKM.toLocaleString()}
            </p>
            <p
              className="text-xl uppercase tracking-widest"
              style={{ fontFamily: "Staatliches" }}
            >
              Kilómetros por la galaxia
            </p>
          </div>
        </div>

        <div className="pt-12 text-center space-y-4">
          <p
            className="text-2xl italic opacity-60 max-w-2xl mx-auto"
            style={{ fontFamily: "Instrument Serif" }}
          >
            Toda tu vida es solo el{" "}
            <span
              className="text-amber-400 not-italic font-bold"
              style={{ fontFamily: "Emilys Candy" }}
            >
              {stats.universeAgePercentage}%
            </span>{" "}
            de la edad del universo observable.
          </p>
        </div>
      </div>
    </section>
  );
});
