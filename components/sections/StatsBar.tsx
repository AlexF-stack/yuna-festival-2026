import { EVENT_STATS } from "@/lib/festival";

export function StatsBar() {
  return (
    <section
      aria-label="Chiffres clés du festival"
      className="relative z-10 bg-bleu"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-2 min-[720px]:grid-cols-4">
        {EVENT_STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-5 py-9 text-center text-papier ${
              i < EVENT_STATS.length - 1
                ? "border-b border-papier/15 min-[720px]:border-b-0 min-[720px]:border-r"
                : ""
            } ${i === 1 ? "max-[719px]:border-l max-[719px]:border-papier/15" : ""} ${
              i === 2 ? "max-[719px]:border-r max-[719px]:border-papier/15" : ""
            }`}
          >
            <p className="font-display text-[clamp(2rem,5vw,2.85rem)] font-extrabold leading-none text-papier">
              {stat.value}
            </p>
            <p className="mt-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-papier/75">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
