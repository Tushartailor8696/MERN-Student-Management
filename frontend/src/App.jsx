
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentForm from "./pages/StudentForm";
import DeleteStudent from "./pages/DeleteStudent";

function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-sm font-bold text-indigo-600">404 ERROR</p>
      <h1 className="mt-3 text-4xl font-extrabold text-slate-900">Page not found</h1>
      <p className="mt-4 text-slate-500">The page you requested does not exist.</p>
      <Link to="/" className="mt-7 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">
        Back to Home
      </Link>
    </main>
  );
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/add" element={<StudentForm />} />
            <Route path="/students/edit/:id" element={<StudentForm />} />
            <Route path="/students/delete/:id" element={<DeleteStudent />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <footer className="border-t border-slate-200 bg-white px-5 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} StudentHub · Built with React, Tailwind CSS and MongoDB
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}
