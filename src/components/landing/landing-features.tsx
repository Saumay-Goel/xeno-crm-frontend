const FEATURES = [
  {
    title: "Natural-language segments",
    body: "The AI turns fuzzy intent into precise audience rules — and asks when it’s unsure.",
  },
  {
    title: "Human-in-the-loop",
    body: "AI proposes; you approve. Edit the message, switch the channel, then launch with confidence.",
  },
  {
    title: "Multi-channel",
    body: "WhatsApp, SMS, Email, RCS — model the full delivery lifecycle for every campaign.",
  },
  {
    title: "Live engagement funnel",
    body: "Sent → delivered → opened → clicked → converted, updating in real time.",
  },
  {
    title: "Realistic delivery simulation",
    body: "A dedicated channel service models delivery, failures, and engagement callbacks.",
  },
  {
    title: "Your campaigns, your data",
    body: "Secure Google or email login. Each marketer sees only their own campaigns.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-slate-50 border-y border-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Everything you need to re-engage shoppers
          </h2>
          <p className="mt-3 text-slate-500">
            Built for marketers, not data analysts.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-100 bg-white p-6"
            >
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
