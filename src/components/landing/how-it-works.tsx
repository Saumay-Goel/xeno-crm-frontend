const STEPS = [
  {
    n: "01",
    title: "Describe your intent",
    body: "Type who you want to reach in plain English. No filters, no query builders.",
  },
  {
    n: "02",
    title: "AI proposes a campaign",
    body: "It builds the audience, drafts the message, and recommends the best channel — you review and tweak.",
  },
  {
    n: "03",
    title: "Launch & track live",
    body: "Watch the funnel fill in real time: delivered, opened, clicked, converted.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div
        className="text-center mb-12 sm:mb-16 animate-fade-up"
        style={{ animationDelay: "600ms" }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          From idea to campaign in seconds
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-500">
          Three steps. No spreadsheets, no SQL.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            className="group relative rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-100 animate-fade-up"
            style={{ animationDelay: `${700 + i * 100}ms` }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {s.n}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              {s.title}
            </h3>
            <p className="mt-2.5 text-sm sm:text-base text-slate-500 leading-relaxed">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
