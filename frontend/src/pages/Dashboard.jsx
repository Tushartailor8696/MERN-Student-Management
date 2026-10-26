
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const quickActions = [
  {
    icon: "👨‍🎓",
    title: "View Students",
    description: "Search and manage student records.",
    link: "/students",
    color: "bg-indigo-50",
  },
  {
    icon: "➕",
    title: "Add Student",
    description: "Create a new student profile.",
    link: "/students/add",
    color: "bg-emerald-50",
  },
  {
    icon: "👤",
    title: "My Account",
    description: "Your signed-in account information.",
    link: "/about",
    color: "bg-violet-50",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [count, setCount] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api
      .get("/students")
      .then((res) => {
        if (active) setCount(res.data.count ?? res.data.students?.length ?? 0);
      })
      .catch((err) => {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Unable to load student records. Please try again."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-xl text-white shadow-lg shadow-indigo-600/20">
              🎓
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">StudentHub</p>
              <p className="text-xs text-slate-500">Management workspace</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">{user?.name || "User"}</p>
              <p className="text-xs text-slate-500">Account workspace</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-black text-indigo-700">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 md:py-10">
        {/* Welcome section */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold tracking-[0.2em] text-indigo-600">
              YOUR WORKSPACE
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Welcome back, {user?.name?.split(" ")[0] || "there"}!
            </h1>
            <p className="mt-3 max-w-xl leading-7 text-slate-500">
              Here's your overview. Manage your students and keep your
              records organized from one place.
            </p>
          </div>

          <Link
            to="/students/add"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            <span className="text-lg">+</span> Add New Student
          </Link>
        </section>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => {
                setError("");
                setLoading(true);
                api
                  .get("/students")
                  .then((res) =>
                    setCount(res.data.count ?? res.data.students?.length ?? 0)
                  )
                  .catch((err) =>
                    setError(
                      err.response?.data?.message ||
                        "Unable to load student records."
                    )
                  )
                  .finally(() => setLoading(false));
              }}
              className="font-bold underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Statistics */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Total Students
                </p>
                <p className="mt-4 text-4xl font-black tracking-tight">
                  {loading ? "…" : count ?? "—"}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Records in your workspace
                </p>
              </div>
              <span className="rounded-xl bg-indigo-50 p-3 text-2xl">👥</span>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Account Status
                </p>
                <p className="mt-4 text-2xl font-black text-emerald-600">
                  Signed In
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Current account session
                </p>
              </div>
              <span className="rounded-xl bg-emerald-50 p-3 text-2xl">✓</span>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Data Management
                </p>
                <p className="mt-4 text-2xl font-black">CRUD</p>
                <p className="mt-2 text-xs text-slate-500">
                  Create, read, update and delete
                </p>
              </div>
              <span className="rounded-xl bg-violet-50 p-3 text-2xl">📋</span>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Account Email
                </p>
                <p className="mt-4 break-all text-base font-bold">
                  {user?.email || "Not available"}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Signed-in user
                </p>
              </div>
              <span className="rounded-xl bg-amber-50 p-3 text-2xl">✉️</span>
            </div>
          </article>
        </section>

        {/* Main grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          {/* Quick actions */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black">Quick Actions</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Get things done faster.
                </p>
              </div>
              <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">
                SHORTCUTS
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  to={action.link}
                  className="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${action.color}`}
                  >
                    {action.icon}
                  </span>
                  <h3 className="mt-5 font-extrabold">{action.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {action.description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-bold text-indigo-600 group-hover:translate-x-1">
                    Open →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Security panel */}
          <section className="rounded-2xl bg-slate-950 p-6 text-white sm:p-7">
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-emerald-400/10 p-3 text-2xl">
                🛡️
              </span>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                SECURITY
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-black">Your workspace</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Access your student records through your account. Backend
              authentication and authorization should protect private data.
            </p>

            <div className="mt-6 space-y-4">
              {[
                "Authenticated account",
                "Protected API access",
                "Personal student records",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                    ✓
                  </span>
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-6 text-slate-400">
              UI indicators are informational. Actual security depends on
              backend authentication, authorization and database rules.
            </p>
          </section>
        </div>

        {/* Subscription / payment panel */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-violet-50">
          <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                💳
              </span>
              <div>
                <p className="text-xs font-extrabold tracking-[0.18em] text-indigo-600">
                  PLANS & BILLING
                </p>
                <h2 className="mt-2 text-xl font-black sm:text-2xl">
                  Explore plans for your organization
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                  Add subscription billing when your project is ready for
                  paid plans. View the available options or contact the team
                  for enterprise requirements.
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Payment processing is not enabled by this dashboard card.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 md:flex-col">
              <Link
                to="/"
                className="rounded-xl bg-indigo-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-indigo-700"
              >
                View Plans →
              </Link>
              <Link
                to="/contact"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Billing Support
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom banner */}
        <section className="mt-8 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-black">Keep your student records up to date</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Add a new student or open your directory to maintain your records.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/students"
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              View Directory
            </Link>
            <Link
              to="/students/add"
              className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              + Add Student
            </Link>
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-slate-400">
          StudentHub · Student Management Workspace
        </footer>
      </div>
    </main>
  );
}
