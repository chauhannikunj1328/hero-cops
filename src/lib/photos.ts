import type { ArtKind } from "@/components/StoryArt";

/**
 * Illustrative stock photos, one per story art kind, all under the free Unsplash License
 * (https://unsplash.com/license). They show objects and settings, never the people in a story.
 * Swap for department-supplied or licensed photos before launch.
 */
export type StockPhoto = {
  src: string;
  alt: string;
  photographer: string;
  /** Photographer's Unsplash profile */
  profileUrl: string;
  /** Photo page on Unsplash */
  pageUrl: string;
};

const unsplash = (id: string, photo: string, alt: string, photographer: string, username: string): StockPhoto => ({
  src: `https://images.unsplash.com/${photo}`,
  alt,
  photographer,
  profileUrl: `https://unsplash.com/@${username}`,
  pageUrl: `https://unsplash.com/photos/${id}`,
});

export const STOCK_PHOTOS: Record<ArtKind, StockPhoto> = {
  "car-seat": unsplash("fSY6aLEbtgw", "photo-1619719287848-883c8f26efbc", "A child's car seat in the back of a car", "Erik Mclean", "introspectivedsgn"),
  glove: unsplash("LpWreRGMK74", "photo-1633394782368-6e7260566004", "A boxing bag hanging in a gym", "Mike Cox", "iprefermike"),
  eggs: unsplash("leOh1CzRZVQ", "photo-1506976785307-8732e854ad03", "Brown eggs in a cardboard carton", "Erol Ahmed", "erol"),
  groceries: unsplash("L3lznpRPZbI", "photo-1570913196376-dacb677ef459", "A hand holding a bag of fresh groceries", "Priscilla Du Preez", "priscilladupreez"),
  home: unsplash("dsu9V4MsRVw", "photo-1714836982299-7a3b6930e2f5", "A family house with a front porch", "Clay Banks", "claybanks"),
  car: unsplash("p-C4wwUC4jU", "photo-1712436144241-63d52ac193b7", "A police car parked at the side of a road", "Wesley Tingey", "wesleyphotography"),
};

/** Home page "About" image */
export const ABOUT_PHOTO = unsplash("7mqsZsE6FaU", "photo-1453873531674-2151bcd01707", "A police cruiser parked on a city street", "Matt Popovich", "mattpopovich");
