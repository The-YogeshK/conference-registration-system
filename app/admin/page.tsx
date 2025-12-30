"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching data:", error);
    else setRegistrations(data || []);
    setLoading(false);
  };

  const downloadCSV = () => {
    const headers = ["Name,Email,Type,Company,Phone,Date"];
    const rows = filteredData.map(r => 
      `"${r.name}","${r.email}","${r.registration_type}","${r.company || ''}","${r.phone || ''}","${new Date(r.created_at).toLocaleDateString()}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "registrations.csv");
    document.body.appendChild(link);
    link.click();
  };

  const totalCount = registrations.length;
  const studentCount = registrations.filter((r) => r.registration_type === "student").length;
  const professionalCount = registrations.filter((r) => r.registration_type === "professional").length;

  const filteredData = registrations.filter((r) => {
    if (filter === "all") return true;
    return r.registration_type === filter;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-8 bg-slate-300 rounded-full mb-4"></div>
        <p>Loading Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">Admin Portal</h1>
        </div>
        <div className="text-sm text-slate-500">Administrator View</div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
            <p className="text-slate-500">Manage and track conference attendees.</p>
          </div>
          <button 
            onClick={downloadCSV}
            className="flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export CSV
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Registrations" count={totalCount} color="indigo" />
          <StatCard title="Students" count={studentCount} color="blue" />
          <StatCard title="Professionals" count={professionalCount} color="purple" />
        </div>

        {/* Filters & Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Attendee List</h3>
            <select 
              className="px-3 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">View All</option>
              <option value="student">Students Only</option>
              <option value="professional">Professionals Only</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Registered On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50 transition duration-150">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{reg.name}</div>
                      <div className="text-sm text-slate-500">{reg.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        reg.registration_type === 'student' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {reg.registration_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                      {reg.phone || ""}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {reg.company || <span className="text-slate-400 italic">N/A</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(reg.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                      No registrations found matching your filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, count, color }: { title: string, count: number, color: string }) {
  const colorClasses: {[key: string]: string} = {
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    purple: "text-purple-600 bg-purple-50 border-purple-100",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-slate-900">{count}</span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${colorClasses[color]}`}>Live</span>
      </div>
    </div>
  );
}
