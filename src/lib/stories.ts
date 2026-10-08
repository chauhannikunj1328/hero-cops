/**
 * Story CMS collection.
 *
 * In this test build the collection lives in code so the page renders without
 * credentials. Field names mirror the "Published" fields of the Airtable
 * Stories table, so a story approved in Airtable maps 1:1 onto this shape.
 * Swapping to a live source means replacing getStories() with an Airtable
 * fetch filtered to {Status} = "Published" (see src/lib/airtable.ts).
 */

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
  kind: "News report" | "Video" | "Social post" | "Department release";
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
  incidentDate: string; // human readable, may be approximate
  category: "Immediate practical help" | "Long-term mentoring" | "Ongoing care" | "Act of courage";
  body: string[];
  pullQuote?: string;
  image: {
    kind: "placeholder" | "licensed";
    alt: string;
    credit: string;
    rightsNote: string;
  };
  video?: { label: string; url?: string };
  sources: Source[];
  verification: {
    status: WorkflowStatus;
    departmentConfirmed: boolean;
    departmentNote: string;
    lastReviewed: string;
  };
  personalSpending: {
    involved: boolean;
    description?: string;
    approxAmountUSD?: number;
    reimbursed: "Yes" | "No" | "Unknown";
  };
  privacySummary: string;
  privacy: string[];
};

const stories: Story[] = [
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
    body: [
      "Officer Joshua Scaglione pulled over LaVonte Dell for illegally tinted windows. During the stop he noticed that Dell's three-year-old daughter was not in a car seat that fit her.",
      "Dell explained that money was tight and he could not afford to replace the seat she had outgrown. Citations would have pushed the family further behind.",
      "Scaglione asked Dell to follow him to a nearby Walmart. There, the officer bought a new car seat with his own money and made sure the child left the store safely buckled in.",
      "Dell later shared what happened publicly because he wanted people to know about the officer's kindness. Local reporting in the Detroit area picked up the story soon after.",
      "It is one of the original examples behind Hero Cops: an officer who enforced the safety concern in front of him by solving it, not by adding to the family's hardship.",
    ],
    pullQuote:
      "The safety problem got fixed that afternoon, and the family drove away with fewer burdens, not more.",
    image: {
      kind: "placeholder",
      alt: "Illustration placeholder: a child's car seat",
      credit: "Temporary placeholder illustration by Hero Cops test build",
      rightsNote:
        "News photographs of this story are owned by the outlets that published them. A licensed or department-supplied image is needed before launch.",
    },
    video: {
      label: "Video report on the Scaglione and Dell story (YouTube)",
      // Client supplied a YouTube link in the brief; the URL was not included in the copy we received.
    },
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
      {
        label: "ABC News national report (cited in client brief)",
        outlet: "ABC News",
        kind: "News report",
        checked: false,
      },
      {
        label: "LaVonte Dell's original public post",
        outlet: "Social media",
        kind: "Social post",
        checked: false,
      },
    ],
    verification: {
      status: "Department Contact",
      departmentConfirmed: false,
      departmentNote:
        "Confirmed by multiple news reports. Westland PD has not yet been contacted for this test build.",
      lastReviewed: "October 2026",
    },
    personalSpending: {
      involved: true,
      description: "Child's car seat purchased at Walmart",
      reimbursed: "Unknown",
    },
    privacySummary: "Child's name and image withheld",
    privacy: [
      "The child is a minor. Her first name appears in news coverage but is not published here.",
      "No identifiable images of the child are used.",
      "Mr. Dell shared the story publicly himself. His name is kept because he chose to tell it.",
    ],
  },
];

export function getStories(): Story[] {
  return stories.filter((s) => s.verification.status !== "Archived");
}

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}
