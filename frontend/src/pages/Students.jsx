
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadStudents = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.get("/students");
      const records = Array.isArray(res.data.students)
        ? res.data.students
        : [];

      setStudents(records);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Students load nahi ho paaye. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const courses = useMemo(
    () =>
      [...new Set(
        students
          .map((student) => student.course)
          .filter(Boolean)
      )].sort(),
    [students]
  );

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch = [
        student.name,
        student.email,
        student.course,
        student.city,
        student.fatherName,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(term)
      );

      const matchesCourse =
        courseFilter === "all" ||
        student.course === courseFilter;

      return matchesSearch && matchesCourse;
    });
  }, [students, search, courseFilter]);

  const citiesCount = useMemo(
    () => new Set(
      students.map((student) => student.city).filter(Boolean)
    ).size,
    [students]
  );

  async function deleteStudent(student) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(student._id);
    setNotice("");
    setError("");

    try {
      await api.delete(`/students/${student._id}`);
      setStudents((current) =>
        current.filter((item) => item._id !== student._id)
      );
      setNotice(`${student.name} was deleted successfully.`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to delete this student."
      );
    } finally {
      setDeletingId("");
    }
  }

  function getInitials(name) {
    return String(name || "Student")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");
  }

  const avatarColors = [
    "bg-indigo-100 text-indigo-700",
    "bg-sky-100 text-sky-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-fuchsia-100 text-fuchsia-700",
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">

        {/* Page heading */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Student Management
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Students
              <span className="ml-3 inline-flex align-middle rounded-xl bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700">
                {students.length}
              </span>
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Manage student profiles, find records quickly, and keep your
              student database organized in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={loadStudents}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className={loading ? "animate-spin" : ""}>↻</span>
              Refresh
            </button>

            <Link
              to="/students/add"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              <span className="text-lg leading-none">+</span>
              Add Student
            </Link>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Students"
            value={loading ? "—" : students.length}
            description="Student records in your database"
            icon="♙"
            iconStyle="bg-indigo-50 text-indigo-700"
          />
          <StatCard
            label="Courses"
            value={loading ? "—" : courses.length}
            description="Different courses represented"
            icon="▤"
            iconStyle="bg-sky-50 text-sky-700"
          />
          <StatCard
            label="Cities"
            value={loading ? "—" : citiesCount}
            description="Cities represented in records"
            icon="⌖"
            iconStyle="bg-emerald-50 text-emerald-700"
          />
          <StatCard
            label="Search Results"
            value={loading ? "—" : filteredStudents.length}
            description="Records matching your filters"
            icon="⌕"
            iconStyle="bg-amber-50 text-amber-700"
          />
        </section>

        {/* Main records panel */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-extrabold text-slate-950">
                All student records
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Search, filter, update, or remove a student record.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                  ⌕
                </span>
                <input
                  type="search"
                  aria-label="Search students"
                  placeholder="Search students..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 sm:w-64"
                />
              </div>

              <select
                aria-label="Filter by course"
                value={courseFilter}
                onChange={(event) => setCourseFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
              >
                <option value="all">All courses</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="px-5 pt-4 sm:px-6">
            {notice && (
              <div
                role="status"
                className="mb-4 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
              >
                <span className="font-bold">✓</span>
                <p>{notice}</p>
                <button
                  type="button"
                  onClick={() => setNotice("")}
                  aria-label="Dismiss message"
                  className="ml-auto font-bold"
                >
                  ×
                </button>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="mb-4 flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 sm:flex-row sm:items-center sm:justify-between"
              >
                <p>{error}</p>
                <button
                  type="button"
                  onClick={loadStudents}
                  className="self-start font-bold underline sm:self-auto"
                >
                  Try again
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center px-6 py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
              <p className="mt-4 text-sm font-semibold text-slate-600">
                Loading student records...
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Please wait a moment.
              </p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="px-6 py-16 text-center sm:py-20">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl text-indigo-600">
                ♙
              </div>
              <h3 className="mt-5 text-xl font-extrabold text-slate-950">
                {students.length
                  ? "No matching students"
                  : "Your student list is empty"}
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {students.length
                  ? "Try a different name, email, city, or course filter."
                  : "Add your first student to start managing records from this dashboard."}
              </p>

              {students.length ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCourseFilter("all");
                  }}
                  className="mt-5 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Clear filters
                </button>
              ) : (
                <Link
                  to="/students/add"
                  className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  + Add your first student
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left">
                  <thead className="bg-slate-50/90">
                    <tr className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      <th className="px-6 py-4">Student</th>
                      <th className="px-5 py-4">Contact</th>
                      <th className="px-5 py-4">Course</th>
                      <th className="px-5 py-4">Location</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((student, index) => (
                      <tr
                        key={student._id}
                        className="group transition hover:bg-indigo-50/30"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold ${
                                avatarColors[index % avatarColors.length]
                              }`}
                            >
                              {getInitials(student.name)}
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-[200px] truncate text-sm font-bold text-slate-900">
                                {student.name || "Unnamed student"}
                              </p>
                              <p className="mt-1 max-w-[200px] truncate text-xs text-slate-500">
                                {student.fatherName
                                  ? `Parent: ${student.fatherName}`
                                  : "Parent details unavailable"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="max-w-[220px] truncate text-sm font-medium text-slate-700">
                            {student.email || "—"}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            Student email
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          {student.course ? (
                            <span className="inline-flex max-w-[180px] rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1.5 text-xs font-bold text-indigo-700">
                              <span className="truncate">{student.course}</span>
                            </span>
                          ) : (
                            <span className="text-sm text-slate-400">—</span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-700">
                            {student.city || "—"}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            City
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/students/edit/${student._id}`}
                              aria-label={`Edit ${student.name}`}
                              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                            >
                              Edit
                            </Link>

                            <button
                              type="button"
                              onClick={() => deleteStudent(student)}
                              disabled={deletingId === student._id}
                              aria-label={`Delete ${student.name}`}
                              className="rounded-lg border border-rose-100 bg-white px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingId === student._id
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p>
                  Showing{" "}
                  <span className="font-bold text-slate-800">
                    {filteredStudents.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-800">
                    {students.length}
                  </span>{" "}
                  students
                </p>
                <p>Student Management System</p>
              </div>
            </>
          )}
        </section>

        {/* Plan and billing panel */}
        <section className="relative mt-8 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full bg-indigo-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-sky-500/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-indigo-200">
                PLAN & BILLING
              </span>

              <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Manage your workspace
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Need team access, additional features, or billing assistance?
                Explore your options or contact our team.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-indigo-50"
              >
                Explore Plans ↗
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Billing Support
              </Link>
            </div>
          </div>

          <div className="relative mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-xs text-slate-300">
            <span className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              Responsive interface
            </span>
            <span className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              Search and course filters
            </span>
            <span className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              API-connected student records
            </span>
          </div>
        </section>

        <footer className="flex flex-col gap-2 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Student Management System</p>
          <p>Built for organized student record management.</p>
        </footer>
      </div>
    </main>
  );
}

function StatCard({ label, value, description, icon, iconStyle }) {
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${iconStyle}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">{description}</p>
    </div>
  );
}
