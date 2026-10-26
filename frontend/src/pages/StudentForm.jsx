
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const initialForm = {
  name: "",
  fatherName: "",
  email: "",
  phone: "",
  course: "",
  age: "",
  city: "",
};

const fields = [
  {
    name: "name",
    label: "Student full name",
    type: "text",
    placeholder: "e.g. Tushar Tailor",
    icon: "♙",
  },
  {
    name: "fatherName",
    label: "Father's name",
    type: "text",
    placeholder: "Enter father's name",
    icon: "♙",
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "student@example.com",
    icon: "✉",
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    placeholder: "Enter phone number",
    icon: "☎",
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "e.g. 21",
    icon: "◷",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "e.g. Jodhpur",
    icon: "⌖",
  },
];

export default function StudentForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(editing);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!editing) return;

    let active = true;

    async function loadStudent() {
      try {
        const res = await api.get(`/students/${id}`);
        if (!active) return;

        const student = res.data.student;

        setForm({
          name: student.name ?? "",
          fatherName: student.fatherName ?? "",
          email: student.email ?? "",
          phone: student.phone ?? "",
          course: student.course ?? "",
          age: student.age == null ? "" : String(student.age),
          city: student.city ?? "",
        });
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Unable to load student details. Please try again."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadStudent();

    return () => {
      active = false;
    };
  }, [id, editing]);

  function change(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
    setNotice("");
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!form.name.trim() || !form.email.trim() || !form.course.trim()) {
      setError("Please enter the student's name, email, and course.");
      return;
    }

    const age = Number(form.age);

    if (!form.age || !Number.isInteger(age) || age < 1 || age > 120) {
      setError("Please enter a valid age between 1 and 120.");
      return;
    }

    setBusy(true);

    try {
      const payload = {
        ...form,
        name: form.name.trim(),
        fatherName: form.fatherName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        course: form.course.trim(),
        city: form.city.trim(),
        age,
      };

      if (editing) {
        await api.put(`/students/${id}`, payload);
      } else {
        await api.post("/students", payload);
      }

      navigate("/students", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save student. Please check your details and try again."
      );
    } finally {
      setBusy(false);
    }
  }

  const inputClass =
    "mt-2.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50";

  if (loading) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50">
        <div className="h-11 w-11 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
        <p className="mt-4 text-sm font-semibold text-slate-600">
          Loading student details...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link to="/dashboard" className="transition hover:text-indigo-600">
            Dashboard
          </Link>
          <span>/</span>
          <Link to="/students" className="transition hover:text-indigo-600">
            Students
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">
            {editing ? "Edit student" : "Add student"}
          </span>
        </div>

        {/* Hero heading */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10 sm:p-9 lg:p-10">
          <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full bg-indigo-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-1/3 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Student Management System
              </span>

              <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                {editing ? "Update student" : "Add new student"}
                <span className="text-indigo-400">.</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                {editing
                  ? "Keep student records accurate and up to date with a simple, organized workflow."
                  : "Create a student profile and keep all essential academic and contact details organized."}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-2xl text-indigo-200">
                ♙
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {editing ? "Edit profile" : "New profile"}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Student information
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main layout */}
        <div className="mt-7 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">

          {/* Form panel */}
          <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-700">
                  ▤
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-950">
                    Student information
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Fill in the details below.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{
                      width: `${
                        ([
                          form.name,
                          form.fatherName,
                          form.email,
                          form.phone,
                          form.course,
                          form.age,
                          form.city,
                        ].filter((value) => String(value).trim()).length /
                          7) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <span className="whitespace-nowrap text-xs font-bold text-slate-500">
                  {
                    [
                      form.name,
                      form.fatherName,
                      form.email,
                      form.phone,
                      form.course,
                      form.age,
                      form.city,
                    ].filter((value) => String(value).trim()).length
                  }{" "}
                  of 7 fields
                </span>
              </div>
            </div>

            <form onSubmit={submit} className="p-5 sm:p-8">
              {error && (
                <div
                  role="alert"
                  className="mb-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
                >
                  <span className="font-bold">!</span>
                  <p>{error}</p>
                </div>
              )}

              {notice && (
                <div
                  role="status"
                  className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                >
                  {notice}
                </div>
              )}

              <div className="mb-5">
                <p className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
                  Personal & contact details
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Fields marked with * are required.
                </p>
              </div>

              <div className="grid gap-x-5 sm:grid-cols-2">
                {fields.slice(0, 4).map((field) => (
                  <label
                    key={field.name}
                    className="mb-5 block text-sm font-bold text-slate-700"
                  >
                    {field.label}
                    <span className="text-rose-500"> *</span>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                        {field.icon}
                      </span>
                      <input
                        className={`${inputClass} pl-11`}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.name]}
                        onChange={change}
                        required
                        autoComplete={
                          field.name === "name"
                            ? "name"
                            : field.name === "fatherName"
                              ? "off"
                              : field.name === "email"
                                ? "email"
                                : "tel"
                        }
                        minLength={
                          field.type === "text" ? 2 : undefined
                        }
                        maxLength={
                          field.type === "text" ? 100 : undefined
                        }
                        pattern={
                          field.name === "phone"
                            ? "[0-9+() -]{7,20}"
                            : undefined
                        }
                        title={
                          field.name === "phone"
                            ? "Enter a valid phone number."
                            : undefined
                        }
                      />
                    </div>
                  </label>
                ))}
              </div>

              <div className="mb-5 mt-2 border-t border-slate-100 pt-6">
                <p className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
                  Academic & location details
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Add the student's course, age and city.
                </p>
              </div>

              <div className="grid gap-x-5 sm:grid-cols-2">
                <label className="mb-5 block text-sm font-bold text-slate-700">
                  Course
                  <span className="text-rose-500"> *</span>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                      ▤
                    </span>
                    <input
                      className={`${inputClass} pl-11`}
                      name="course"
                      type="text"
                      placeholder="e.g. MCA, BCA, React JS"
                      value={form.course}
                      onChange={change}
                      required
                      minLength={2}
                      maxLength={100}
                    />
                  </div>
                </label>

                <label className="mb-5 block text-sm font-bold text-slate-700">
                  Age
                  <span className="text-rose-500"> *</span>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                      ◷
                    </span>
                    <input
                      className={`${inputClass} pl-11`}
                      name="age"
                      type="number"
                      placeholder="Enter age"
                      value={form.age}
                      onChange={change}
                      min="1"
                      max="120"
                      step="1"
                      required
                    />
                  </div>
                </label>

                <label className="mb-5 block text-sm font-bold text-slate-700 sm:col-span-2">
                  City
                  <span className="text-rose-500"> *</span>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                      ⌖
                    </span>
                    <input
                      className={`${inputClass} pl-11`}
                      name="city"
                      type="text"
                      placeholder="Enter city"
                      value={form.city}
                      onChange={change}
                      required
                      minLength={2}
                      maxLength={100}
                    />
                  </div>
                </label>
              </div>

              <div className="mt-4 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <Link
                  to="/students"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {busy ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {editing ? "✓ Update Student" : "+ Save Student"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* Sidebar */}
          <aside className="space-y-5">

            {/* Live preview */}
            <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-100">
                  Live preview
                </p>

                <div className="mt-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-2xl font-black">
                  {form.name.trim()
                    ? form.name
                        .trim()
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((part) => part[0]?.toUpperCase())
                        .join("")
                    : "ST"}
                </div>

                <h3 className="mt-4 break-words text-xl font-extrabold">
                  {form.name || "Student name"}
                </h3>
                <p className="mt-1 break-all text-sm text-indigo-100">
                  {form.email || "student@example.com"}
                </p>
              </div>

              <div className="space-y-4 p-5">
                <PreviewRow
                  label="Course"
                  value={form.course || "Not specified"}
                />
                <PreviewRow
                  label="Age"
                  value={form.age ? `${form.age} years` : "Not specified"}
                />
                <PreviewRow
                  label="City"
                  value={form.city || "Not specified"}
                />
                <PreviewRow
                  label="Phone"
                  value={form.phone || "Not specified"}
                />
              </div>
            </section>

            {/* Security information */}
            <section className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl text-emerald-700">
                  ✓
                </div>
                <div>
                  <h3 className="font-extrabold text-emerald-950">
                    Data protection
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-emerald-900/80">
                    Submit student details only through your authenticated
                    application. The backend should validate inputs and ensure
                    each user can access only their authorized records.
                  </p>
                </div>
              </div>
            </section>

            {/* Billing panel */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-xl text-amber-700">
                  ₹
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-950">
                    Plans & billing
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Workspace subscription
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Explore subscription options or contact support for billing
                questions. Student registration itself does not charge a fee.
              </p>

              <div className="mt-4 grid gap-2">
                <Link
                  to="/"
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <span>View plans</span>
                  <span>↗</span>
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700"
                >
                  <span>Contact billing support</span>
                  <span>→</span>
                </Link>
              </div>
            </section>

            <p className="px-2 text-center text-xs leading-5 text-slate-400">
              Student Management System · Organized records, simplified work.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

function PreviewRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="shrink-0 text-xs font-semibold text-slate-400">
        {label}
      </span>
      <span className="break-words text-right text-sm font-bold text-slate-700">
        {value}
      </span>
    </div>
  );
}
