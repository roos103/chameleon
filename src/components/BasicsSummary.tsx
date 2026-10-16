import { countryName, destinationLabel, languageName, levelLabel, stageLabel } from "@/lib/places";
import type { Basics } from "@/lib/types";
import { Flag } from "./Flag";

export function BasicsSummary({ basics }: { basics: Basics }) {
  const rows = [
    { k: "From", v: basics.country && <><Flag code={basics.country} /> {countryName(basics.country)}</> },
    { k: "Language", v: languageName(basics.language) },
    { k: "Studying in", v: basics.destination && <><Flag code={basics.destination} /> {destinationLabel(basics.destination)}</> },
    { k: "Level", v: levelLabel(basics.level) },
    { k: "Stage", v: stageLabel(basics.stage) },
  ];
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {rows.map((r) => (
        <div key={r.k} className="rounded-2xl bg-background p-3">
          <dt className="text-xs font-bold text-muted uppercase">{r.k}</dt>
          <dd className="font-semibold">{r.v || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}
