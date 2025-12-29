import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ReportView() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/reports/${id}`)
      .then(res => res.json())
      .then(setReport);
  }, [id]);

  if (!report) return <p className="text-slate-400 p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <Link to="/dashboard" className="text-blue-400 hover:underline">
        ← Back
      </Link>

      <div className="bg-slate-800 p-6 rounded-xl mt-6">
        <h1 className="text-2xl font-bold">{report.title}</h1>
        <p className="text-slate-400 mt-1">{report.department}</p>

        <div className="mt-4 space-y-2 text-sm">
          <p><strong>Status:</strong> {report.status}</p>
          <p><strong>Compliance:</strong> {report.complianceType}</p>
          <p><strong>Severity:</strong> {report.severity}</p>
          <p><strong>Findings:</strong> {report.findings}</p>
          <p><strong>Recommendations:</strong> {report.recommendations}</p>
          <p><strong>Reported By:</strong> {report.reportedBy}</p>
        </div>
      </div>
    </div>
  );
}
