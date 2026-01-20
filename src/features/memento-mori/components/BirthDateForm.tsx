import { Calendar, Hourglass } from "@phosphor-icons/react";

interface BirthDateFormProps {
  birthDate: string;
  setBirthDate: (date: string) => void;
  onCalculate: (e: React.FormEvent) => void;
}

export const BirthDateForm = ({
  birthDate,
  setBirthDate,
  onCalculate,
}: BirthDateFormProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 select-none">
      <div className="max-w-xl w-full text-center space-y-12 animate-in">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Hourglass size={48} className="text-neutral-400" weight="light" />
          </div>
          <h1
            className="text-6xl md:text-8xl tracking-widest text-neutral-900"
            style={{ fontFamily: "Staatliches" }}
          >
            EL VAGÓN DE COLA.
          </h1>
          <p
            className="text-2xl italic text-neutral-500 tracking-wide"
            style={{ fontFamily: "Vina Sans" }}
          >
            visualiza tus semanas restantes de vida
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm border-2 border-neutral-100 p-10 space-y-8 shadow-lg">
          <p
            className="text-xl italic text-neutral-600 leading-relaxed"
            style={{ fontFamily: "Vina Sans" }}
          >
            En promedio, un ser humano vive alrededor de{" "}
            <span
              className="text-3xl text-neutral-900 not-italic"
              style={{ fontFamily: "Emilys Candy" }}
            >
              4,680
            </span>{" "}
            semanas. <br />
            ¿Cuántas has vivido tú?
          </p>

          <form onSubmit={onCalculate} className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="birthdate"
                className="text-sm uppercase tracking-[0.3em] text-neutral-400 font-bold block"
                style={{ fontFamily: "Inter" }}
              >
                Fecha de nacimiento
              </label>
              <div className="relative">
                <Calendar
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />
                <input
                  id="birthdate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 focus:border-neutral-900 outline-none transition-colors text-lg"
                  style={{ fontFamily: "Emilys Candy" }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!birthDate}
              className="group w-full py-4 bg-neutral-900 text-white hover:bg-neutral-700 disabled:bg-neutral-200 disabled:text-neutral-400 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer disabled:cursor-not-allowed"
            >
              <span
                className="text-base uppercase tracking-[0.5em] font-bold group-hover:tracking-[0.6em] transition-all"
                style={{ fontFamily: "Inter" }}
              >
                calcular
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
