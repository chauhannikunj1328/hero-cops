/**
 * Section building blocks that mirror the OrngLab template's components.
 * Each one maps to a Framer component of the same name (see FRAMER-BUILD.md).
 */
import type { ReactNode } from "react";

/** "Our services" style giant section title */
export function SectionTitle({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="t-h1 scroll-mt-24">
      {children}
    </h2>
  );
}

/** Grey frame standing in for an image. In Framer, swap for a rights-cleared photo. */
export function ImageSlot({
  label,
  ratio = "4 / 3",
  className = "",
  children,
}: {
  label: string;
  ratio?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <figure className={`ph ${className}`} style={{ aspectRatio: ratio }}>
      {children}
      <figcaption className="absolute left-4 bottom-4 t-small bg-bg/90 px-3 py-1.5 rounded-full">{label}</figcaption>
    </figure>
  );
}

/** "Our services" row: big title left, pipe-separated list and copy right */
export function ServiceRow({ title, items, body }: { title: string; items: string[]; body: string }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-10 py-10 md:py-14 border-b border-line">
      <h3 className="t-h2">{title}</h3>
      <div className="md:pt-3 max-w-xl">
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {items.map((it, i) => (
            <li key={it} className="t-label flex items-center gap-3">
              {i > 0 && <span aria-hidden="true" className="w-px h-3.5 bg-ink/40" />}
              {it}
            </li>
          ))}
        </ul>
        <p className="t-body mt-4">{body}</p>
      </div>
    </div>
  );
}

/** "Why choose us" / "Working process" row: small index label left, title + copy right */
export function IndexRow({ index, title, body, wide = false }: { index: string; title: string; body: string; wide?: boolean }) {
  // Template: "Why choose us" content starts at 440px, "Working process" at 560px.
  const cols = wide ? "lg:grid-cols-[560px_1fr]" : "lg:grid-cols-[440px_1fr]";
  return (
    <li className={`grid md:grid-cols-[1fr_2fr] ${cols} gap-3 md:gap-10 py-10 md:py-12 border-b border-line`}>
      <span className="t-label text-ink-2 md:pt-4">{index}</span>
      <div className="max-w-2xl">
        <h3 className="t-h2">{title}</h3>
        <p className="t-body mt-4">{body}</p>
      </div>
    </li>
  );
}

/** Small workflow status tag: the only colored UI element */
export function StatusTag({ tone, children }: { tone: "verified" | "pending" | "neutral"; children: ReactNode }) {
  const color = tone === "verified" ? "text-st-verified" : tone === "pending" ? "text-st-pending" : "text-ink-2";
  const dot = tone === "verified" ? "bg-st-verified" : tone === "pending" ? "bg-st-pending" : "bg-muted";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 t-small ${color}`}>
      <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}
