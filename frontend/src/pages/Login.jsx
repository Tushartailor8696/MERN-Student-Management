
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      await login(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 px-5 py-12">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-indigo-900/5 sm:p-9">
        <p className="text-xs font-bold tracking-widest text-indigo-600">WELCOME BACK</p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900">Sign in</h1>
        <p className="mt-2 text-sm text-slate-500">Access your personal student dashboard.</p>

        <label className="mt-7 block text-sm font-semibold text-slate-700">
          Email address
          <input
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-indigo-500"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>

        <label className="mt-5 block text-sm font-semibold text-slate-700">
          Password
          <input
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-indigo-500"
            type="password"
            autoComplete="current-password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>

        {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <button disabled={busy} className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-700 disabled:opacity-60">
          {busy ? "Signing in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account? <Link className="font-bold text-indigo-600" to="/signup">Sign up</Link>
        </p>
      </form>
    </main>
  );
}
