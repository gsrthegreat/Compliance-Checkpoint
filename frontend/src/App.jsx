import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ReportView from "./components/ReportView";
import ReportEdit from "./components/ReportEdit";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      {/* Navbar */}
      <nav className="h-16 flex items-center px-6 border-b border-slate-700">
        <Link to="/dashboard" className="hover:text-emerald-400">
          Compliance Dashboard
        </Link>
      </nav>

      {/* Page Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports/:id" element={<ReportView />} />
          <Route path="/reports/edit/:id" element={<ReportEdit />} />
        </Routes>
      </main>
    </div>
  );
}
