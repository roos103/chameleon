"use client";

type Option = { value: string; label: string; emoji?: string };

/** A row of big, tappable pill buttons for single-choice questions. */
export function Choice({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: readonly Option[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.value)}
            className={`cursor-pointer rounded-2xl border-2 px-4 py-2.5 text-left font-semibold transition ${
              selected ? "border-leaf bg-leaf-light text-leaf-dark" : "border-ink/10 bg-white hover:border-leaf/50"
            }`}
          >
            {o.emoji && <span className="mr-1.5">{o.emoji}</span>}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
