// Template footer: one quiet row, three items.
export function SiteFooter() {
  return (
    <footer className="border-t border-line mt-auto">
      <div className="wrap py-6 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between t-small text-ink-2">
        <p>Hero Cops, a public-service storytelling platform</p>
        <p>Test build. Not the live HeroCops.us site.</p>
        <p>Stories pending department verification</p>
      </div>
    </footer>
  );
}
