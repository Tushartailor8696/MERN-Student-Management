
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (form.password.length < 8 || form.password.length > 72) {
      setError("Password must be between 8 and 72 characters.");
      return;
    }

    setBusy(true);

    try {
      await signup(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    } finally {
      setBusy(false);
    }
  }

  const inputClass = "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-indigo-500";

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 px-5 py-12">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-indigo-900/5 sm:p-9">
        <p className="text-xs font-bold tracking-widest text-indigo-600">GET STARTED</p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900">Create account</h1>
        <p className="mt-2 text-sm text-slate-500">Register to manage student records.</p>

        <label className="mt-6 block text-sm font-semibold text-slate-700">
          Full name
          <input className={inputClass} value={form.name} minLength={2} maxLength={60} required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>

        <label className="mt-4 block text-sm font-semibold text-slate-700">
          Email address
          <input className={inputClass} type="email" autoComplete="email" value={form.email} required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>

        <label className="mt-4 block text-sm font-semibold text-slate-700">
          Password
          <input className={inputClass} type="password" autoComplete="new-password" minLength={8} maxLength={72} value={form.password} required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </label>

        {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <button disabled={busy} className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-700 disabled:opacity-60">
          {busy ? "Creating account..." : "Create Account"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already registered? <Link className="font-bold text-indigo-600" to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}
