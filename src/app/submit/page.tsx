import type { Metadata } from "next";
import { SubmitForm } from "./SubmitForm";

export const metadata: Metadata = {
  title: "Submit a Hero Story",
  description: "Send Hero Cops a story about an officer who went beyond the call. Every story is verified with the department before it is published.",
};

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <header className="pt-12 sm:pt-16 pb-10 max-w-2xl lg:ml-[260px]">
        <h1 className="display text-[2.75rem] sm:text-[3.5rem]">Submit a Hero Story</h1>
        <p className="mt-4 text-[18px] leading-relaxed text-ink-soft">
          For public information officers, department leadership, and anyone who saw an officer go beyond the call.
          It takes about 10 minutes. We verify every story with the department before publishing, and there is no
          cost to departments.
        </p>
      </header>
      <SubmitForm />
    </div>
  );
}
