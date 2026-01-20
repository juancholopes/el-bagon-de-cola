import { MILESTONES } from "../../../lib/constants";

export const Glossary = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-neutral-100 pt-16 animate-in">
      {MILESTONES.map((m) => (
        <div
          key={m.label}
          className="space-y-4 p-4 hover:bg-white transition-colors rounded-xl"
        >
          <h4
            className="text-3xl tracking-widest border-b-2 border-neutral-900 inline-block mb-2"
            style={{ fontFamily: "Staatliches" }}
          >
            {m.label}
          </h4>
          <p
            className="text-xl italic text-neutral-600 leading-relaxed"
            style={{ fontFamily: "Ephesis" }}
          >
            {m.text}
          </p>
        </div>
      ))}
    </section>
  );
};
