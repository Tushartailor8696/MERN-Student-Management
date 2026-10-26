
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: "👨‍🎓",
    title: "Student Management",
    description:
      "Add, view, edit and organize student profiles from one simple dashboard.",
  },
  {
    icon: "🔐",
    title: "Secure Authentication",
    description:
      "Protected accounts and authenticated access to private student records.",
  },
  {
    icon: "📊",
    title: "Smart Dashboard",
    description:
      "Get a clear overview of your student records and manage your work efficiently.",
  },
  {
    icon: "⚡",
    title: "Fast & Responsive",
    description:
      "Enjoy a smooth experience on desktop, tablet and mobile devices.",
  },
  {
    icon: "🔎",
    title: "Quick Search",
    description:
      "Find student records quickly using useful search and filtering options.",
  },
  {
    icon: "💾",
    title: "MongoDB Storage",
    description:
      "Store and retrieve student information using your connected database.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "For learning and personal projects.",
    features: ["Student CRUD", "Basic dashboard", "Account login"],
    button: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "₹499",
    period: "/month",
    description: "For small institutes and teams.",
    features: [
      "Everything in Starter",
      "Advanced reports",
      "Priority support",
      "Team access",
    ],
    button: "Choose Plan",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For larger educational organizations.",
    features: [
      "Custom workflows",
      "Organization management",
      "Dedicated assistance",
      "Custom integrations",
    ],
    button: "Contact Us",
    popular: false,
  },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/30 via-slate-950 to-slate-950" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-200">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Smart Student Management Platform
            </div>

            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Education management,
              <span className="block text-indigo-400">
                made effortless.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Manage student records, simplify daily administration and
              organize your educational data in one secure workspace.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to={user ? "/dashboard" : "/signup"}
                className="rounded-xl bg-indigo-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-indigo-950/30 transition hover:-translate-y-1 hover:bg-indigo-400"
              >
                {user ? "Open Dashboard →" : "Start for Free →"}
              </Link>

              <Link
                to="/about"
                className="rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Platform
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <span>✓ Responsive interface</span>
              <span>✓ Protected routes</span>
              <span>✓ MongoDB integration</span>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-xl sm:p-6">
            <div className="rounded-2xl bg-white p-5 text-slate-900 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">Workspace overview</p>
                  <h2 className="mt-1 text-2xl font-extrabold">
                    Dashboard
                  </h2>
                </div>
                <div className="rounded-xl bg-indigo-100 p-3 text-2xl">
                  🎓
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-indigo-50 p-4">
                  <p className="text-sm text-slate-500">Student records</p>
                  <p className="mt-2 text-3xl font-black text-indigo-700">
                    Manage
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Your student list
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-sm text-slate-500">Account access</p>
                  <p className="mt-2 text-3xl font-black text-emerald-700">
                    Secure
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Authentication
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Your workspace tools</h3>
                  <span className="text-xs text-indigo-600">OVERVIEW</span>
                </div>

                {[
                  ["👥", "Student directory", "Organized records"],
                  ["📈", "Reports & insights", "Useful information"],
                  ["⚙️", "Account settings", "Manage your account"],
                ].map(([icon, title, description]) => (
                  <div
                    key={title}
                    className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                  >
                    <span className="text-xl">{icon}</span>
                    <div>
                      <p className="text-sm font-bold">{title}</p>
                      <p className="text-xs text-slate-500">{description}</p>
                    </div>
                    <span className="ml-auto text-slate-400">→</span>
                  </div>
                ))}
              </div>

              <Link
                to={user ? "/dashboard" : "/signup"}
                className="mt-5 block rounded-xl bg-slate-950 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
              >
                {user ? "Go to Dashboard" : "Create Your Account"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 text-center sm:px-8 md:grid-cols-4">
          {[
            ["M", "MongoDB Database"],
            ["R", "React Interface"],
            ["E", "Express APIs"],
            ["N", "Node.js Backend"],
          ].map(([letter, text]) => (
            <div key={text} className="flex items-center justify-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 font-black text-indigo-600">
                {letter}
              </span>
              <span className="text-sm font-semibold text-slate-600">
                {text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-extrabold tracking-[0.2em] text-indigo-600">
            PLATFORM FEATURES
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Everything you need to manage student data
          </h2>
          <p className="mt-5 leading-7 text-slate-600">
            Simple tools for student administration, account access and
            everyday data management.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-950/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl transition group-hover:bg-indigo-600">
                <span className="transition group-hover:scale-110 group-hover:grayscale">
                  {feature.icon}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-extrabold">
                {feature.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* SECURITY CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
        <div className="grid gap-8 rounded-3xl bg-indigo-600 p-8 text-white sm:p-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold tracking-widest text-indigo-200">
              YOUR DATA. YOUR WORKSPACE.
            </p>
            <h2 className="mt-3 text-3xl font-black">
              A better way to manage student records.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-indigo-100">
              Create an account to get started. Keep your project organized
              with authenticated access and a dedicated dashboard.
            </p>
          </div>
          <Link
            to={user ? "/students" : "/signup"}
            className="inline-flex justify-center rounded-xl bg-white px-6 py-3.5 font-bold text-indigo-700 transition hover:bg-indigo-50"
          >
            {user ? "Manage Students →" : "Create Account →"}
          </Link>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-extrabold tracking-[0.2em] text-indigo-600">
              SIMPLE PRICING
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Plans that fit your needs
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Example pricing cards for your project. Connect a payment
              gateway and configure plans before accepting real payments.
            </p>
          </div>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border p-7 ${
                  plan.popular
                    ? "border-indigo-600 bg-white shadow-xl shadow-indigo-950/10"
                    : "border-slate-200 bg-white"
                }`}
              >
                {plan.popular && (
                  <span className="mb-4 w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-extrabold text-indigo-700">
                    MOST POPULAR
                  </span>
                )}

                <h3 className="text-xl font-extrabold">{plan.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-slate-500">
                      {plan.period}
                    </span>
                  )}
                </div>

                <div className="my-7 h-px bg-slate-100" />

                <ul className="flex-1 space-y-4">
                  {plan.features.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-slate-700"
                    >
                      <span className="font-black text-emerald-600">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  to={
                    plan.name === "Enterprise"
                      ? "/contact"
                      : user
                      ? "/dashboard"
                      : "/signup"
                  }
                  className={`mt-8 block rounded-xl px-5 py-3 text-center font-bold transition ${
                    plan.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border border-slate-200 text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {plan.button}
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-xs leading-6 text-slate-500">
            Pricing shown is a demo. Subscription billing and payment
            processing are not enabled by these cards.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
          Ready to organize your student records?
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
          Start with your own account and explore the student management
          dashboard.
        </p>
        <Link
          to={user ? "/dashboard" : "/signup"}
          className="mt-8 inline-flex rounded-xl bg-slate-950 px-7 py-3.5 font-bold text-white transition hover:bg-indigo-600"
        >
          {user ? "Open Your Dashboard →" : "Get Started for Free →"}
        </Link>
      </section>
    </main>
  );
}
