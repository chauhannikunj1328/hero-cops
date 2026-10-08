import type { Metadata } from "next";
import { SubmitForm } from "./SubmitForm";

export const metadata: Metadata = {
  title: "Submit a Hero Story",
  description: "Send Hero Cops a story about an officer who went beyond the call. Every story is verified with the department before it is published.",
};

// Template "Contact us" page: giant title, then section index left and form right.
export default function SubmitPage() {
  return (
    <div className="wrap pt-10 md:pt-16 pb-[72px] md:pb-[120px]">
      <h1 className="t-display">Submit a story</h1>
      <p className="t-body text-ink mt-8 max-w-xl">
        For public information officers, department leadership, and anyone who saw an officer go beyond the call. It
        takes about 10 minutes. We verify every story with the department before publishing, and there is no cost to
        departments.
      </p>
      <div className="mt-14 md:mt-20">
        <SubmitForm />
      </div>
    </div>
  );
}
