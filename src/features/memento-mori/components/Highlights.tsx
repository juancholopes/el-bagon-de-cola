import React from "react";
import type { Stats } from "../../../lib/types";
import { Heart } from "@phosphor-icons/react";
import { SplitText } from "../../../components/SplitText";

interface HighlightsProps {
  stats: Stats;
}

export const Highlights = React.memo(({ stats }: HighlightsProps) => {
  return (
    <section className="space-y-12 animate-in">
      <h2
        className="split-animate text-5xl tracking-widest border-b border-neutral-200 pb-4"
        style={{ fontFamily: "Staatliches" }}
      >
        <SplitText>ASPECTOS DESTACADOS</SplitText>
      </h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p
            className="text-2xl italic leading-relaxed text-neutral-600"
            style={{ fontFamily: "Instrument Serif" }}
          >
            Has vivido{" "}
            <span
              className="text-4xl text-neutral-900 not-italic"
              style={{ fontFamily: "Emilys Candy" }}
            >
              {stats.livedWeeks}
            </span>{" "}
            semanas, que es el{" "}
            <span
              className="text-3xl text-neutral-900 not-italic"
              style={{ fontFamily: "Emilys Candy" }}
            >
              {stats.percentage}%
            </span>{" "}
            de una vida completa.
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-neutral-50 pb-2">
              <span
                className="text-lg italic text-neutral-500"
                style={{ fontFamily: "Instrument Serif" }}
              >
                Días de experiencia acumulada:
              </span>
              <span
                className="text-2xl text-neutral-900"
                style={{ fontFamily: "Emilys Candy" }}
              >
                {stats.livedDays.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-end border-b border-neutral-50 pb-2">
              <span
                className="text-lg italic text-neutral-500"
                style={{ fontFamily: "Instrument Serif" }}
              >
                Estaciones observadas:
              </span>
              <span
                className="text-2xl text-neutral-900"
                style={{ fontFamily: "Emilys Candy" }}
              >
                {stats.seasons}
              </span>
            </div>
            <div className="flex justify-between items-end border-b border-neutral-50 pb-2">
              <span
                className="text-lg italic text-neutral-500"
                style={{ fontFamily: "Instrument Serif" }}
              >
                Latidos de tu corazón aprox:
              </span>
              <span
                className="text-2xl text-neutral-900"
                style={{ fontFamily: "Emilys Candy" }}
              >
                {stats.heartBeats.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-end border-b border-neutral-50 pb-2">
              <span
                className="text-lg italic text-neutral-500"
                style={{ fontFamily: "Instrument Serif" }}
              >
                Respiraciones tomadas:
              </span>
              <span
                className="text-2xl text-neutral-900"
                style={{ fontFamily: "Emilys Candy" }}
              >
                {stats.breaths.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="p-12 rounded-lg flex flex-col justify-center space-y-6 transition-transform duration-500">
          <div className="flex items-center gap-4">
            <Heart className="text-red-400" size={32} weight="fill" />
            <h3
              className="text-4xl tracking-widest"
              style={{ fontFamily: "Staatliches" }}
            >
              EL VAGÓN DE COLA
            </h3>
          </div>
          <p
            className="text-2xl italic leading-relaxed opacity-90"
            style={{ fontFamily: "Instrument Serif" }}
          >
            {stats.parentYearsLeft > 0 ? (
              <>
                "Si ves a tus padres solo dos semanas al año, ya has vivido
                aproximadamente el{" "}
                <span
                  className="text-3xl text-red-400 not-italic font-bold"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  {stats.parentTimePercentage}%
                </span>{" "}
                del tiempo total que tendrás con ellos. Te quedan
                aproximadamente{" "}
                <span
                  className="text-3xl text-amber-300 not-italic font-bold"
                  style={{ fontFamily: "Emilys Candy" }}
                >
                  {stats.parentYearsLeft}
                </span>{" "}
                años con tus padres. No ignores el presente."
              </>
            ) : (
              "El tiempo es el recurso más valioso. Aprovecha cada momento con quienes amas."
            )}
          </p>
        </div>
      </div>
    </section>
  );
});
