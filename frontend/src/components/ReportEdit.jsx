import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ReportEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/reports/${id}`)
      .then(res => res.json())
      .then(setForm);
  }, [id]);

  if (!form) return <p className="text-slate-400 p-8">Loading...</p>;

  const update = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/api/reports/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <form
        onSubmit={update}
        className="bg-slate-800 p-6 rounded-xl max-w-xl mx-auto space-y-4"
      >
        <h1 className="text-2xl font-bold">Edit Report</h1>

        <input
          className="w-full p-2 bg-slate-700 rounded"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full p-2 bg-slate-700 rounded"
          value={form.findings}
          onChange={e => setForm({ ...form, findings: e.target.value })}
        />

        <button className="bg-emerald-600 px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
