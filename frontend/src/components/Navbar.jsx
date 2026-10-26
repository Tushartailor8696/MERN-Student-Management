
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navClass = ({ isActive }) =>
  `rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
    isActive
      ? "bg-indigo-50 text-indigo-700 shadow-sm"
      : "text-slate-600 hover:bg-slate-50 hover:text-indigo-700"
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">

        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-xl font-black text-white shadow-lg shadow-indigo-600/20 transition-transform group-hover:scale-105">
            S
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Student<span className="text-indigo-600">Hub</span>
            <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              Smart Management
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-1">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/about" className={navClass}>About</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>

          {user && (
            <>
              <NavLink to="/dashboard" className={navClass}>
                Dashboard
              </NavLink>
              <NavLink to="/students" className={navClass}>
                Students
              </NavLink>
            </>
          )}
        </nav>

        {/* Login / Account */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 sm:inline">
                {user.name || "Account"}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                Get Started →
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
