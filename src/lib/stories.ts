/**
 * Story CMS collection: all six example stories from the Hero Cops brief.
 *
 * Field names mirror the Airtable Stories table, so a record approved there maps 1:1 onto this shape.
 * Stages match the seeded Airtable records, to show one story at each point in the workflow.
 *
 * Privacy defaults applied to every story (same rules as the Airtable Privacy review field):
 * - officers are named; people helped are named only if they told the story publicly themselves
 * - people accused of an offense, children and foster families are not named
 * - no news photographs; illustrative stock photos (src/lib/photos.ts) until a rights-cleared image exists
 */
import type { ArtKind } from "@/components/StoryArt";

export type WorkflowStatus =
  | "Submitted"
  | "Verification"
  | "Department Contact"
  | "Approved"
  | "Reimbursement Candidate"
  | "Published"
  | "Archived";

export const WORKFLOW: WorkflowStatus[] = [
  "Submitted",
  "Verification",
  "Department Contact",
  "Approved",
  "Reimbursement Candidate",
  "Published",
  "Archived",
];

export type Source = {
  label: string;
  outlet: string;
  url?: string;
  kind: "News report" | "Video" | "Social post" | "Department release" | "Organization page";
  checked: boolean;
};

export type Story = {
  slug: string;
  title: string;
  dek: string;
  officerName: string;
  officerRank: string;
  department: string;
  city: string;
  state: string;
  incidentDate: string;
  category: "Immediate practical help" | "Long-term mentoring" | "Ongoing care" | "Act of courage" | "Compassionate discretion";
  body: string[];
  art: ArtKind;
  imageNote: string;
  video?: { label: string; url?: string };
  sources: Source[];
  verification: {
    status: WorkflowStatus;
    departmentConfirmed: boolean;
    departmentNote: string;
  };
  personalSpending: {
    involved: boolean;
    description?: string;
    approxAmountUSD?: number;
    reimbursement: string;
  };
  privacySummary: string;
  privacy: string[];
};

const NEWS_PHOTO_NOTE =
  "News photographs of this story belong to the outlets that published them. A licensed or department-supplied image is needed before launch.";

const stories: Story[] = [
  {
    slug: "officer-john-holder-dorothy-shepard",
    title: "Months of errands for a widow he met on a welfare check",
    dek:
      "A DeSoto officer gave a 73-year-old widow his personal number. For months he drove her to appointments and the grocery store, often off duty.",
    officerName: "John Holder",
    officerRank: "Officer",
    department: "DeSoto Police Department",
    city: "DeSoto",
    state: "Texas",
    incidentDate: "2014",
    category: "Ongoing care",
    art: "car",
    imageNote: NEWS_PHOTO_NOTE,
    body: [
      "Officer John Holder first met Dorothy Shepard, a 73-year-old widow, during a welfare check at her home.",
      "Before he left, he gave her his personal phone number and told her to call if she needed help. She did, and the visits kept going.",
      "For months Holder drove her to doctors' appointments, to the grocery store and on other errands, often while he was off duty. His own department reportedly did not know the extent of it at first.",
      "It became public only when another shopper photographed Holder helping Mrs. Shepard with her groceries and shared the picture.",
      "There was no dramatic rescue and no large expense. This is a story about steady human connection, and about an officer taking responsibility well past the minimum the job asks.",
    ],
    video: { label: "Video report on Officer Holder and Mrs. Shepard (YouTube)" },
    sources: [
      {
        label: "Kind off-duty cop takes elderly widow on weekly shopping trips",
        outlet: "Good News Network",
        url: "https://www.goodnewsnetwork.org/kind-off-duty-cop-takes-elderly-widow-weekly-shopping-trips",
        kind: "News report",
        checked: true,
      },
      { label: "Shopper's original photo and post", outlet: "Social media", kind: "Social post", checked: false },
    ],
    verification: {
      status: "Published",
      departmentConfirmed: true,
      departmentNote: "Test record: shown at the Published stage to demonstrate the end of the workflow. No department was contacted.",
    },
    personalSpending: { involved: false, reimbursement: "Not applicable" },
    privacySummary: "Cleared; no health details published",
    privacy: [
      "Mrs. Shepard's story was shared publicly and widely reported. Her name is used with that in mind.",
      "Her medical details are not published beyond the fact of a welfare check.",
      "The shopper's photo is not reused without the photographer's permission.",
    ],
  },
  {
    slug: "officer-dean-fay-central-city-boxing",
    title: "The officer who sold his home to keep a youth gym open",
    dek:
      "A Springfield officer built a boxing gym to give kids structure and a way out. To keep it going, he sold his motorcycle and then his family home.",
    officerName: "Dean Fay",
    officerRank: "Officer",
    department: "Springfield Police Department",
    city: "Springfield",
    state: "Massachusetts",
    incidentDate: "Ongoing",
    category: "Long-term mentoring",
    art: "glove",
    imageNote: "Gym photos show young people and need guardian releases confirmed by the gym. Illustrative stock photo until then.",
    body: [
      "Springfield Police Officer Dean Fay saw what gangs, violence and a lack of structure were doing to young people in his city.",
      "He founded Central City Boxing & Barbell as a place where they could learn boxing, physical discipline and personal responsibility. Tutoring and education became part of the program too.",
      "Keeping it open took real sacrifice. According to the organization's own history, Fay sold his Harley-Davidson when money ran short in the early days, and later sold his family home to help secure a larger building.",
      "Today the gym runs a large training facility and works with many young people. Its stated purpose is to build physical, mental and emotional strength, not to produce champions.",
      "This story matters to Hero Cops because it is not one act. It is years of mentoring and personal investment in other people's children.",
    ],
    video: { label: "Video on Dean Fay and Central City Boxing (YouTube)" },
    sources: [
      {
        label: "Central City Boxing organization history",
        outlet: "Central City Gym",
        kind: "Organization page",
        checked: true,
      },
      {
        label: "Central City Boxing avoids KO, but still faces several rounds to survival",
        outlet: "WMassP&I",
        url: "https://wmasspi.com/2019/05/central-city-boxing-avoids-ko-but-still-faces-several-rounds-to-survival.html",
        kind: "News report",
        checked: false,
      },
      {
        label: "Springfield gym giving at-risk teens fighting chance with upcoming tournament",
        outlet: "Western Mass News",
        url: "https://www.westernmassnews.com/2026/01/07/springfield-gym-giving-at-risk-teens-fighting-chance-with-upcoming-tournament",
        kind: "News report",
        checked: false,
      },
    ],
    verification: {
      status: "Approved",
      departmentConfirmed: true,
      departmentNote: "Test record: shown at the Approved stage. Public summary and a rights-cleared image are the last steps. No department was contacted.",
    },
    personalSpending: {
      involved: true,
      description: "Sold a motorcycle and later the family home to fund the gym",
      reimbursement: "Not a fit for small-expense reimbursement; flagged for editorial",
    },
    privacySummary: "Use only images with guardian releases",
    privacy: [
      "Photos from the gym show young people. Only images the gym confirms it has guardian releases for can be used.",
      "No young person at the gym is named.",
    ],
  },
  {
    slug: "officer-vicki-thomas-groceries",
    title: "Groceries instead of a jail cell",
    dek:
      "A Miami-Dade officer dealt with a shoplifting case using the discretion the law allowed, then bought about $100 of groceries for the hungry family.",
    officerName: "Vicki Thomas",
    officerRank: "Officer",
    department: "Miami-Dade Police Department",
    city: "Miami-Dade County",
    state: "Florida",
    incidentDate: "October 2013",
    category: "Compassionate discretion",
    art: "groceries",
    imageNote: NEWS_PHOTO_NOTE,
    body: [
      "Officer Vicki Thomas responded after a mother tried to leave a supermarket with groceries she had not paid for. The woman said her children were hungry.",
      "Thomas did not ignore the offense. She handled it with the legal discretion available to her instead of taking the mother to jail.",
      "Then she addressed the problem behind it. Thomas personally bought about $100 worth of groceries for the family.",
      "It is a strong example of accountability and compassion in the same encounter: the law was applied, and the immediate human need was met.",
    ],
    video: { label: "Video report on Officer Thomas (YouTube)" },
    sources: [
      {
        label: "Florida cop buys $100 in groceries for woman caught shoplifting food",
        outlet: "ABC News",
        url: "https://abcnews.go.com/blogs/headlines/2013/10/florida-cop-buys-100-in-groceries-for-woman-caught-shoplifting-food",
        kind: "News report",
        checked: true,
      },
      {
        label: "Fla. cop catches shoplifter, buys her groceries",
        outlet: "Police1",
        url: "https://www.police1.com/police-heroes/articles/fla-cop-catches-shoplifter-buys-her-groceries-sqECPzOYmmu5tfcX",
        kind: "News report",
        checked: false,
      },
    ],
    verification: {
      status: "Reimbursement Candidate",
      departmentConfirmed: true,
      departmentNote: "Test record: approved, and flagged as a reimbursement candidate because the officer paid out of pocket. No department was contacted.",
    },
    personalSpending: {
      involved: true,
      description: "About $100 of groceries for the family",
      approxAmountUSD: 100,
      reimbursement: "On hold until the reimbursement program's legal structure is set",
    },
    privacySummary: "Mother and children not named",
    privacy: [
      "The mother was accused of an offense, so she is not named here even though news coverage named her.",
      "Her children are minors and are not named or shown.",
    ],
  },
  {
    slug: "officer-joshua-scaglione-car-seat",
    title: "A traffic stop that ended with a new car seat",
    dek:
      "A Westland officer saw a toddler riding without the right seat. Instead of writing tickets, he drove to Walmart and bought one himself.",
    officerName: "Joshua Scaglione",
    officerRank: "Officer",
    department: "Westland Police Department",
    city: "Westland",
    state: "Michigan",
    incidentDate: "April 2016",
    category: "Immediate practical help",
    art: "car-seat",
    imageNote: NEWS_PHOTO_NOTE,
    body: [
      "Officer Joshua Scaglione pulled over LaVonte Dell for illegally tinted windows. During the stop he noticed that Dell's three-year-old daughter was not in a car seat that fit her.",
      "Dell explained that money was tight and he could not afford to replace the seat she had outgrown. Citations would have pushed the family further behind.",
      "Scaglione asked Dell to follow him to a nearby Walmart. There, the officer bought a new car seat with his own money and made sure the child left the store safely buckled in.",
      "Dell later shared what happened publicly because he wanted people to know about the officer's kindness. Local reporting in the Detroit area picked up the story soon after.",
      "It is one of the original examples behind Hero Cops: an officer who dealt with the safety problem in front of him by solving it, not by adding to the family's hardship.",
    ],
    video: { label: "Video report on the Scaglione and Dell story (YouTube)" },
    sources: [
      {
        label: "Westland police officer goes above and beyond by buying car seat to help a local father he pulled over",
        outlet: "WXYZ 7 Action News Detroit (ABC affiliate)",
        url: "https://www.wxyz.com/news/region/wayne-county/westland-police-officer-goes-above-beyond-by-buying-car-seat-to-help-a-local-father-he-pulled-over",
        kind: "News report",
        checked: true,
      },
      {
        label: "Police officer buys car seat for struggling dad after traffic stop",
        outlet: "WSOC-TV (ABC affiliate)",
        url: "https://www.wsoctv.com/news/trending-now/police-officer-buys-car-seat-for-struggling-dad-after-traffic-stop/239004229",
        kind: "News report",
        checked: true,
      },
      { label: "ABC News national report (cited in client brief)", outlet: "ABC News", kind: "News report", checked: false },
      { label: "LaVonte Dell's original public post", outlet: "Social media", kind: "Social post", checked: false },
    ],
    verification: {
      status: "Department Contact",
      departmentConfirmed: false,
      departmentNote: "Confirmed by two news reports. Westland PD has not been contacted for this test build.",
    },
    personalSpending: {
      involved: true,
      description: "Child's car seat bought at Walmart",
      reimbursement: "Not yet reviewed",
    },
    privacySummary: "Child's name and image withheld",
    privacy: [
      "The child is a minor. Her first name appears in news coverage but is not published here.",
      "No identifiable images of the child are used.",
      "Mr. Dell shared the story publicly himself. His name is kept because he chose to tell it.",
    ],
  },
  {
    slug: "officer-william-stacy-eggs",
    title: "An officer who paid for the eggs",
    dek:
      "A Tarrant officer was called about a woman accused of taking eggs to feed her family. He bought them for her instead, and donations followed.",
    officerName: "William Stacy",
    officerRank: "Officer",
    department: "Tarrant Police Department",
    city: "Tarrant",
    state: "Alabama",
    incidentDate: "December 2014",
    category: "Compassionate discretion",
    art: "eggs",
    imageNote: NEWS_PHOTO_NOTE,
    body: [
      "Officer William Stacy responded to a call about a woman accused of taking eggs from a store because she did not have enough food for her family.",
      "Rather than treat it only as a criminal matter, Stacy bought the eggs for her.",
      "The encounter was recorded and shared, and it drew national attention. More food was later donated to the family.",
      "It is a clear example of compassionate discretion combined with practical help.",
    ],
    video: { label: "Video of Officer Stacy's encounter (YouTube)" },
    sources: [
      {
        label: "Alabama woman feels \"blessed\" by cop's good deed",
        outlet: "CBS News",
        url: "https://www.cbsnews.com/news/alabama-woman-helen-johnson-feels-blessed-by-william-stacey-cops-good-deed/",
        kind: "News report",
        checked: false,
      },
      {
        label: "Officer buys eggs for woman caught shoplifting to feed family",
        outlet: "NPR via KUER",
        url: "https://www.kuer.org/2014-12-11/officer-buys-eggs-for-woman-caught-shoplifting-to-feed-family",
        kind: "News report",
        checked: false,
      },
      {
        label: "Officer doesn't arrest woman caught stealing eggs; buys her food instead",
        outlet: "6abc Philadelphia",
        url: "https://6abc.com/post/officer-doesnt-arrest-woman-caught-stealing-eggs;-buys-her-food-instead/435587/",
        kind: "News report",
        checked: false,
      },
    ],
    verification: {
      status: "Verification",
      departmentConfirmed: false,
      departmentNote: "Test record: sources are being checked. Note that coverage spells the officer's surname two ways (Stacy and Stacey); confirm with the department.",
    },
    personalSpending: {
      involved: true,
      description: "Eggs for the family",
      reimbursement: "Not yet reviewed",
    },
    privacySummary: "Woman accused not named",
    privacy: [
      "The woman was accused of an offense. She is not named here until she agrees, even though she spoke to the press.",
      "Video of the encounter is owned by others and needs permission before it is embedded.",
    ],
  },
  {
    slug: "detective-jack-mook-foster-father",
    title: "A boxing coach who became a foster father",
    dek:
      "A Pittsburgh detective noticed two boys he coached had stopped coming to the gym. He went looking, and eventually adopted them.",
    officerName: "Jack Mook",
    officerRank: "Detective",
    department: "Pittsburgh Bureau of Police",
    city: "Pittsburgh",
    state: "Pennsylvania",
    incidentDate: "Date to confirm",
    category: "Long-term mentoring",
    art: "home",
    imageNote: "No images of the family will be used.",
    body: [
      "Detective Jack Mook volunteered as a boxing coach. When two young boys he had been mentoring suddenly stopped coming, he went to find out why.",
      "What he found were very difficult living conditions. His involvement moved far beyond coaching.",
      "Mook became the boys' foster parent and later adopted them.",
      "It shows an officer becoming a father figure over years, not performing a single act of charity.",
    ],
    video: { label: "Video on Detective Mook (YouTube)" },
    sources: [
      {
        label: "Tough cop opens his home, and his heart, to brothers in need",
        outlet: "KVC",
        url: "https://www.kvc.org/blog/tough-cop-opens-his-home-and-his-heart-to-brothers-in-need/",
        kind: "News report",
        checked: false,
      },
      {
        label: "Cop becomes foster dad, sacrifices to provide 2 boys a good life",
        outlet: "Good News Network",
        url: "https://www.goodnewsnetwork.org/cop-becomes-foster-dad-sacrifices-provide-2-boys-good-life/",
        kind: "News report",
        checked: false,
      },
      {
        label: "Pittsburgh detective became foster dad after pursuit",
        outlet: "Officer.com",
        url: "https://www.officer.com/on-the-street/news/11526233/pittsburgh-detective-became-foster-dad-after-pursuit",
        kind: "News report",
        checked: false,
      },
    ],
    verification: {
      status: "Archived",
      departmentConfirmed: false,
      departmentNote: "Archived in the test base: the story involves the foster care and adoption of minors. It would only be published if the family itself wants it told.",
    },
    personalSpending: { involved: false, reimbursement: "Not applicable" },
    privacySummary: "Do not publish without the family's consent",
    privacy: [
      "The story involves the foster care and adoption of two boys. The family's privacy outweighs publication.",
      "The boys are not named, and no images of the family are used.",
      "The record stays archived unless the family asks for the story to be told.",
    ],
  },
];

/** All stories, for page generation */
export function getAllStories(): Story[] {
  return stories;
}

/** Stories shown in public listings (everything except Archived) */
export function getStories(): Story[] {
  return stories.filter((s) => s.verification.status !== "Archived");
}

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function statusTone(status: WorkflowStatus): "verified" | "pending" | "neutral" {
  if (status === "Published") return "verified";
  if (status === "Archived") return "neutral";
  return "pending";
}
