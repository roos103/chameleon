import { PREFER_NOT_TO_SAY } from "@/lib/places";

// Windows doesn't render flag emoji, so we use small flag images instead.
export function Flag({ code, className = "" }: { code: string; className?: string }) {
  if (!code || code.length !== 2 || code === PREFER_NOT_TO_SAY) return <span className={className}>🌍</span>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
      alt=""
      className={`inline-block h-[0.85em] w-auto rounded-[3px] align-[-0.05em] shadow-sm ${className}`}
    />
  );
}
