import React, { useState } from "react";
import contactBackground from "../assets/contact-D1GBtYVB.avif";
import { usePortfolio } from "../context/PortfolioContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const canPostToServer = () => {
  if (import.meta.env.VITE_API_URL) return true;
  if (typeof window === "undefined") return false;
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
};

function Contact() {
  const { data, assets } = usePortfolio();
  const { profile, socials } = data;

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    if (!canPostToServer()) {
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setSubmitting(false);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({ type: "success", message: result.message });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: result.message || "Failed to send message." });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Could not reach the server. You can email me directly instead.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-16">
      <img
        src={contactBackground}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-900/55" aria-hidden="true" />

      <div className="relative z-10 max-w-xl mx-auto px-6">
        <div className="p-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
          <h2 className="text-3xl font-bold mb-3 text-slate-900">Get in Touch</h2>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-500 mb-6">
            Ready to build AI, data, and full-stack solutions together
          </p>
          <p className="mb-6 text-gray-700">Reach out if you want to collaborate on intelligent applications, scalable APIs, or data-driven platforms.</p>

          <div className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-700">Email</p>
            <a href={`mailto:${profile.email}`} className="text-blue-600 hover:text-blue-700 underline">
              {profile.email}
            </a>
            <p className="mt-4 text-sm font-semibold text-slate-700">Phone</p>
            <a href={`tel:${profile.phone}`} className="text-blue-600 hover:text-blue-700 underline">
              {profile.phone}
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-violet-600 text-white font-semibold shadow-lg hover:from-violet-600 hover:to-sky-500 transition-all disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send a Message"}
            </button>
            {status.message && (
              <p className={`text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {status.message}
              </p>
            )}
            {!canPostToServer() && (
              <p className="text-sm text-slate-500 mt-2">
                This deployment does not have an API server. The form will open your email client so you can contact me directly.
              </p>
            )}
          </form>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Socials</h3>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-gray-800 transition"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
