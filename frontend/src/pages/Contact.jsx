
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const contactOptions = [
  {
    icon: "✉️",
    title: "Email Support",
    description: "Questions about your account or student records?",
    detail: "Send us a message",
  },
  {
    icon: "🎓",
    title: "Student Management",
    description: "Need help with adding or managing student information?",
    detail: "We're here to help",
  },
  {
    icon: "💳",
    title: "Billing & Payments",
    description: "Questions about plans, subscriptions or billing?",
    detail: "Billing assistance",
  },
];

const initialForm = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState("success");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setNotice("");

    try {
      const { data } = await api.post("/contact", form);
      setNotice(data.message || "Your message was submitted successfully.");
      setNoticeType("success");
      setForm(initialForm);
    } catch (error) {
      setNotice(
        error.response?.data?.message ||
          "Unable to send your message. Please try again."
      );
      setNoticeType("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/30 via-slate-950 to-slate-950" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-xs font-bold tracking-widest text-indigo-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              WE'RE HERE TO HELP
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Let's start a
              <span className="block text-indigo-400">
                conversation.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Have a question about StudentHub, managing student records,
              account security or subscription plans? Send us a message.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:gap-14 md:py-20">
        {/* LEFT SIDE */}
        <aside>
          <p className="text-xs font-extrabold tracking-[0.2em] text-indigo-600">
            CONTACT INFORMATION
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
            How can we help you?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Tell us what you need help with. Use the contact form and include
            enough detail so your request can be understood.
          </p>

          <div className="mt-8 space-y-4">
            {contactOptions.map((item) => (
              <article
                key={item.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                  {item.icon}
                </span>

                <div>
                  <h3 className="font-extrabold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-indigo-600">
                    {item.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-slate-950 p-6 text-white">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔐</span>
              <h3 className="font-bold">Your privacy matters</h3>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Share only the information needed to respond to your request.
              Never include passwords, OTPs, payment card details or other
              sensitive credentials in your message.
            </p>
          </div>
        </aside>

        {/* RIGHT SIDE FORM */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9">
          <div className="border-b border-slate-100 pb-6">
            <p className="text-sm font-bold text-indigo-600">
              SEND A MESSAGE
            </p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              Get in touch with us
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Fill in the details below. Fields marked with * are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-bold text-slate-700">
                Full name *
                <input
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 font-normal outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-60"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  autoComplete="name"
                  maxLength={100}
                  disabled={submitting}
                  required
                />
              </label>

              <label className="block text-sm font-bold text-slate-700">
                Email address *
                <input
                  className="mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 font-normal outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-60"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  autoComplete="email"
                  maxLength={254}
                  disabled={submitting}
                  required
                />
              </label>
            </div>

            <label className="block text-sm font-bold text-slate-700">
              Message *
              <textarea
                className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 font-normal outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-60"
                rows={6}
                name="message"
                placeholder="How can we help you?"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                minLength={10}
                maxLength={3000}
                disabled={submitting}
                required
              />
              <span className="mt-2 block text-right text-xs font-normal text-slate-400">
                {form.message.length}/3000 characters
              </span>
            </label>

            {notice && (
              <div
                role="status"
                aria-live="polite"
                className={`rounded-xl border p-4 text-sm leading-6 ${
                  noticeType === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                <span className="mr-2">
                  {noticeType === "success" ? "✓" : "!"}
                </span>
                {notice}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending your message..." : "Send Message"}
              {!submitting && <span>→</span>}
            </button>

            <p className="text-center text-xs leading-6 text-slate-500">
              By submitting this form, you agree to share these details so
              your request can be processed.
            </p>
          </form>
        </section>
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="flex flex-col gap-5 rounded-3xl bg-indigo-50 p-7 sm:p-9 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-black sm:text-2xl">
              Want to explore StudentHub first?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Discover student management features and account options.
            </p>
          </div>

          <Link
            to="/about"
            className="inline-flex shrink-0 justify-center rounded-xl bg-slate-950 px-6 py-3.5 font-bold text-white transition hover:bg-indigo-600"
          >
            Explore StudentHub →
          </Link>
        </div>
      </section>
    </main>
  );
}
