import Image from "next/image";
import type { StockPhoto } from "@/lib/photos";

/** Fills an ImageSlot frame with a stock photo */
export function StoryPhoto({ photo, sizes, priority = false, className = "" }: { photo: StockPhoto; sizes: string; priority?: boolean; className?: string }) {
  return <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />;
}

/** Unsplash attribution line */
export function PhotoCredit({ photo }: { photo: StockPhoto }) {
  return (
    <>
      Photo by{" "}
      <a href={photo.profileUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{photo.photographer}</a>{" "}
      on{" "}
      <a href={photo.pageUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Unsplash</a>
    </>
  );
}
