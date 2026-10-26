
import { Link } from "react-router-dom";

const technologies = [
  {
    number: "01",
    icon: "⚛️",
    title: "React + Tailwind CSS",
    description:
      "Build a responsive, modern interface with reusable components and consistent styling.",
    color: "bg-sky-50 text-sky-700",
  },
  {
    number: "02",
    icon: "🚀",
    title: "Node.js + Express",
    description:
      "Create REST APIs, handle requests, manage application logic and protect backend routes.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    number: "03",
    icon: "🗄️",
    title: "MongoDB + Mongoose",
    description:
      "Store student information, validate records and work with structured database models.",
    color: "bg-violet-50 text-violet-700",
  },
  {
    number: "04",
    icon: "🔐",
    title: "Authentication",
    description:
      "Use account registration, login and protected API routes for authenticated access.",
    color: "bg-amber-50 text-amber-700",
  },
];

const capabilities = [
  {
    icon: "👨‍🎓",
    title: "Student Records",
    text: "Create, view, update and delete student information.",
  },
  {
    icon: "📊",
    title: "Dashboard",
    text: "Organize student data and access important information.",
  },
  {
    icon: "🛡️",
    title: "Access Control",
    text: "Protect private records with backend authorization.",
  },
  {
    icon: "💳",
    title: "Payment Ready",
    text: "Plan for paid subscriptions using a verified payment gateway.",
  },
];

const workflow = [
  ["Create an account", "Register and securely sign in to your workspace."],
  ["Manage your records", "Add student information and maintain existing records."],
  ["Connect services", "Extend the platform with reports, payments and notifications."],
];

export default function About() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* Hero */}
      <section className="relative bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/30 via-slate-950 to-slate-950" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-xs font-bold tracking-widest text-indigo-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              ABOUT STUDENTHUB
            </span>

            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              More than records.
              <span className="block text-indigo-400">
                A smarter way to manage.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              StudentHub is a full-stack student management platform designed
              to simplify student records, streamline everyday workflows and
              bring essential management tools into one workspace.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="rounded-xl bg-indigo-500 px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-indigo-400"
              >
                Get Started →
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Contact Our Team
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <span>✓ Full-stack architecture</span>
              <span>✓ Responsive UI</span>
              <span>✓ Extensible design</span>
            </div>
          </div>

          {/* Product overview card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">PLATFORM OVERVIEW</p>
                <h2 className="mt-2 text-2xl font-extrabold">
                  StudentHub
                </h2>
              </div>
              <span className="rounded-2xl bg-indigo-500/20 p-4 text-3xl">
                🎓
              </span>
            </div>

            <div className="mt-7 space-y-4">
              {[
                ["Student management", "CRUD operations", "👥"],
                ["Account security", "Authenticated access", "🔐"],
                ["Database layer", "MongoDB integration", "🗄️"],
                ["Subscription-ready", "Payment gateway extension", "💳"],
              ].map(([title, detail, icon]) => (
                <div
                  key={title}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl">
                    {icon}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{detail}</p>
                  </div>
                  <span className="ml-auto text-emerald-400">✓</span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-400">
              Payment processing and subscription billing require a separate
              backend integration before they can be used.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="text-xs font-extrabold tracking-[0.2em] text-indigo-600">
            OUR PURPOSE
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Built to make student administration simpler.
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            Managing student information should be straightforward. StudentHub
            brings common administrative tasks into a single interface so
            users can focus on maintaining accurate, organized records.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            The project also demonstrates how a React frontend, Express API
            and MongoDB database work together in a modern full-stack
            application.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            ["CRUD", "Student record operations"],
            ["REST", "API-based architecture"],
            ["JWT", "Token-based authentication"],
            ["UI", "Responsive design"],
          ].map(([title, detail]) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
            >
              <p className="text-2xl font-black text-indigo-600">{title}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology stack */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold tracking-[0.2em] text-indigo-600">
              OUR TECHNOLOGY
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Powered by the MERN stack
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              A flexible technology stack for building and extending
              full-stack web applications.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {technologies.map((tech) => (
              <article
                key={tech.number}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-950/5"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${tech.color}`}
                  >
                    {tech.icon}
                  </span>
                  <span className="text-sm font-bold text-slate-300">
                    {tech.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-extrabold">{tech.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {tech.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold tracking-[0.2em] text-indigo-600">
            WHAT YOU CAN BUILD
          </p>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Essential tools, one platform
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Start with student management and extend the application as your
            project requirements grow.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-indigo-200 hover:shadow-lg"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-5 font-extrabold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-slate-950 py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold tracking-[0.2em] text-indigo-300">
              HOW IT WORKS
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              From sign-up to organized records
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {workflow.map(([title, description], index) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 font-black text-indigo-300">
                  0{index + 1}
                </span>
                <h3 className="mt-6 text-xl font-extrabold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 md:py-24">
        <div className="rounded-3xl border border-indigo-100 bg-indigo-50/70 p-8 sm:p-12">
          <span className="text-4xl">🚀</span>
          <h2 className="mt-5 text-3xl font-black sm:text-4xl">
            Ready to explore StudentHub?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Create your account and explore the tools available in your
            student management workspace.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="rounded-xl bg-indigo-600 px-6 py-3.5 font-bold text-white transition hover:bg-indigo-700"
            >
              Create an Account →
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
