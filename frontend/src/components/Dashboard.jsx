import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    department: "",
    complianceType: "ISO",
    status: "Under Review",
    findings: "",
    recommendations: "",
    reportedBy: "",
    severity: "Medium",
    dueDate: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsRes, reportsRes] = await Promise.all([
        fetch("http://localhost:5000/api/reports/stats/summary"),
        fetch("http://localhost:5000/api/reports")
      ]);

      if (!statsRes.ok || !reportsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const statsData = await statsRes.json();
      const reportsData = await reportsRes.json();

      setStats(statsData);
      setReports(reportsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      department: "",
      complianceType: "ISO",
      status: "Under Review",
      findings: "",
      recommendations: "",
      reportedBy: "",
      severity: "Medium",
      dueDate: ""
    });
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create report");
      }

      const newReport = await res.json();
      
      // Add new report to the beginning of the list
      setReports([newReport, ...reports]);
      
      // Refresh stats
      const statsRes = await fetch("http://localhost:5000/api/reports/stats/summary");
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Reset form and close
      resetForm();
      setShowCreateForm(false);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteReport = async (id) => {
    if (!window.confirm("Delete this report?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/reports/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        throw new Error("Failed to delete report");
      }

      setReports(reports.filter(r => r._id !== id));
      
      const statsRes = await fetch("http://localhost:5000/api/reports/stats/summary");
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (err) {
      alert("Error deleting report: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8">
        <div className="bg-red-500/20 text-red-400 p-4 rounded-lg max-w-2xl mx-auto">
          <h2 className="font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Compliance Checkpoint</h1>
        <h2 className="text-xl text-grey">The Amazon for Audit Reports</h2>

        <button
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            if (showCreateForm) resetForm();
          }}
          className="bg-emerald-600 px-4 py-2 rounded hover:bg-emerald-700 transition-colors"
        >
          {showCreateForm ? "✕ Cancel" : "+ Create Report"}
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid md:grid-cols-5 gap-6 mb-10">
          <Stat title="Total" value={stats.total} color="bg-slate-700" />
          <Stat title="Compliant" value={stats.compliant} color="bg-emerald-600" />
          <Stat title="Non-Compliant" value={stats.nonCompliant} color="bg-red-600" />
          <Stat title="In Progress" value={stats.inProgress} color="bg-amber-500" />
          <Stat title="Under Review" value={stats.underReview} color="bg-blue-600" />
        </div>
      )}

      {/* Create Report Form */}
      {showCreateForm && (
        <div className="bg-slate-800 p-6 rounded-xl mb-8 border-2 border-emerald-500">
          <h2 className="text-2xl font-bold mb-6">Create New Report</h2>

          {submitError && (
            <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Title *"
                value={form.title}
                onChange={(v) => handleChange("title", v)}
                required
              />

              <Input
                label="Department *"
                value={form.department}
                onChange={(v) => handleChange("department", v)}
                required
              />

              <Select
                label="Compliance Type *"
                value={form.complianceType}
                options={["ISO", "GDPR", "SOC2", "HIPAA", "PCI-DSS", "Other"]}
                onChange={(v) => handleChange("complianceType", v)}
                required
              />

              <Select
                label="Status *"
                value={form.status}
                options={["Compliant", "Non-Compliant", "In Progress", "Under Review"]}
                onChange={(v) => handleChange("status", v)}
                required
              />

              <Input
                label="Reported By *"
                value={form.reportedBy}
                onChange={(v) => handleChange("reportedBy", v)}
                required
              />

              <Select
                label="Severity *"
                value={form.severity}
                options={["Low", "Medium", "High", "Critical"]}
                onChange={(v) => handleChange("severity", v)}
                required
              />

              <Input
                label="Due Date"
                type="date"
                value={form.dueDate}
                onChange={(v) => handleChange("dueDate", v)}
              />
            </div>

            <Textarea
              label="Findings *"
              value={form.findings}
              onChange={(v) => handleChange("findings", v)}
              required
            />

            <Textarea
              label="Recommendations"
              value={form.recommendations}
              onChange={(v) => handleChange("recommendations", v)}
            />

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-emerald-600 px-6 py-3 rounded hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {submitting ? "Creating..." : "Create Report"}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowCreateForm(false);
                }}
                className="flex-1 bg-slate-700 px-6 py-3 rounded hover:bg-slate-600 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reports */}
      {reports.length === 0 ? (
        <div className="bg-slate-800 p-12 rounded-xl text-center">
          <p className="text-slate-400 text-lg mb-4">No reports yet</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-block bg-emerald-600 px-6 py-3 rounded hover:bg-emerald-700 transition-colors"
          >
            Create Your First Report
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {reports.map(report => (
            <div
              key={report._id}
              className="bg-slate-800 p-5 rounded-xl shadow hover:scale-[1.02] transition"
            >
              <h2 className="text-lg font-semibold">{report.title}</h2>
              <p className="text-sm text-slate-400 mb-2">{report.department}</p>
              <p className="text-xs text-slate-500">{report.complianceType}</p>

              <div className="flex items-center gap-2 mt-3">
                <span className={`inline-block px-3 py-1 text-xs rounded-full ${statusColor(report.status)}`}>
                  {report.status}
                </span>
                <span className={`inline-block px-3 py-1 text-xs rounded-full ${severityColor(report.severity)}`}>
                  {report.severity}
                </span>
              </div>

              <div className="flex gap-4 mt-4 text-sm">
                <Link to={`/reports/${report._id}`} className="text-blue-400 hover:underline">
                  View
                </Link>

                <Link to={`/reports/edit/${report._id}`} className="text-amber-400 hover:underline">
                  Edit
                </Link>

                <button
                  onClick={() => deleteReport(report._id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Stat({ title, value, color }) {
  return (
    <div className={`p-6 rounded-xl shadow ${color}`}>
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-4xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="text-sm text-slate-400 block mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full p-2 bg-slate-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, required = false }) {
  return (
    <div>
      <label className="text-sm text-slate-400 block mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full p-2 bg-slate-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
        rows={4}
      />
    </div>
  );
}

function Select({ label, value, options, onChange, required = false }) {
  return (
    <div>
      <label className="text-sm text-slate-400 block mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full p-2 bg-slate-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function statusColor(status) {
  switch (status) {
    case "Compliant": return "bg-emerald-500";
    case "Non-Compliant": return "bg-red-500";
    case "In Progress": return "bg-amber-500";
    case "Under Review": return "bg-blue-500";
    default: return "bg-slate-500";
  }
}

function severityColor(severity) {
  switch (severity) {
    case "Low": return "bg-slate-600";
    case "Medium": return "bg-yellow-500";
    case "High": return "bg-orange-500";
    case "Critical": return "bg-red-600";
    default: return "bg-slate-500";
  }
}