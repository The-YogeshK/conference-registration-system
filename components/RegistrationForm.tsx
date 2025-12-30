"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase"; 
import { useRouter } from "next/navigation";

export default function RegistrationForm({ type }: { type: string }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("registrations").insert([
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: type === "professional" ? form.company : null,
        registration_type: type,
      },
    ]);

    setIsSubmitting(false);
    
    if (error) {
      alert("Something went wrong: " + error.message);
    } else {
      alert("Registration successful!");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 capitalize text-center text-black">{type} Registration</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            required 
            placeholder="John Doe" 
            className="w-full p-3 border rounded text-black bg-white" 
            onChange={(e) => setForm({ ...form, name: e.target.value })} 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            required 
            type="email" 
            placeholder="john@example.com" 
            className="w-full p-3 border rounded text-black bg-white" 
            onChange={(e) => setForm({ ...form, email: e.target.value })} 
          />
        </div>

        {type === "professional" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input 
              required 
              placeholder="Company Name" 
              className="w-full p-3 border rounded text-black bg-white" 
              onChange={(e) => setForm({ ...form, company: e.target.value })} 
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
          <input 
            placeholder="+1 234 567 890" 
            className="w-full p-3 border rounded text-black bg-white" 
            onChange={(e) => setForm({ ...form, phone: e.target.value })} 
          />
        </div>

        <button 
          disabled={isSubmitting} 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold p-3 rounded hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Please wait..." : "Register"}
        </button>
      </form>
    </div>
  );
}