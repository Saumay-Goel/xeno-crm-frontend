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
    <section id="how" className="max-w-5xl mx-auto px-6 py-24">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          From idea to campaign in seconds
        </h2>
        <p className="mt-3 text-slate-500">
          Three steps. No spreadsheets, no SQL.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="relative rounded-2xl border border-slate-100 bg-white p-6"
          >
            <div className="text-sm font-bold text-blue-600">{s.n}</div>
            <h3 className="mt-3 font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
