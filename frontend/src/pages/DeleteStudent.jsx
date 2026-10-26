
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function DeleteStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    api.get(`/students/${id}`)
      .then((res) => {
        if (active) setStudent(res.data.student);
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.message || "Student not found.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [id]);

  async function confirmDelete() {
    setBusy(true);
    setError("");

    try {
      await api.delete(`/students/${id}`);
      navigate("/students", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete student.");
      setBusy(false);
    }
  }

  if (loading) {
    return <main className="p-12 text-center">Loading student...</main>;
  }

  return (
    <main className="mx-auto max-w-xl px-5 py-16">
      <section className="rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-lg shadow-rose-900/5 sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-3xl font-bold text-rose-600">
          !
        </div>

        <p className="mt-6 text-xs font-bold tracking-widest text-rose-600">CONFIRM ACTION</p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900">Delete Student?</h1>

        {student ? (
          <p className="mt-4 leading-7 text-slate-600">
            Are you sure you want to permanently delete{" "}
            <strong className="text-slate-900">{student.name}</strong>?
            This action cannot be undone.
          </p>
        ) : (
          <p className="mt-4 text-slate-600">The student could not be loaded.</p>
        )}

        {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            disabled={busy || !student}
            onClick={confirmDelete}
            className="rounded-xl bg-rose-600 px-5 py-3 font-bold text-white hover:bg-rose-700 disabled:opacity-50"
          >
            {busy ? "Deleting..." : "Yes, Delete"}
          </button>

          <Link to="/students" className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50">
            Cancel
          </Link>
        </div>
      </section>
    </main>
  );
}
