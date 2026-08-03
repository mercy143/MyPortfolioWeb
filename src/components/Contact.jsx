import React, { useState } from "react";
import { FaBriefcase, FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaMobileAlt, FaGlobe, FaYoutube, FaPaperPlane, FaArrowRight } from "react-icons/fa";
import contactBackground from "../assets/contact-D1GBtYVB.avif";
import { usePortfolio } from "../context/PortfolioContext";

const DEFAULT_API_URL = "https://my-portfolio-backend-ma41.onrender.com";

const getApiBaseUrl = () => {
  const configuredValue = import.meta.env.VITE_API_URL?.trim();
  if (configuredValue && !/your[-_ ]?render[-_ ]?backend[-_ ]?url|your-backend-url|example\.com/i.test(configuredValue)) {
    try {
      const url = new URL(configuredValue.includes("://") ? configuredValue : `https://${configuredValue}`);
      return url.origin;
    } catch {
      return import.meta.env.PROD ? DEFAULT_API_URL : "http://localhost:5000";
    }
  }

  return import.meta.env.PROD ? DEFAULT_API_URL : "http://localhost:5000";
};

const API_URL = getApiBaseUrl();

const canPostToServer = () => {
  if (typeof window === "undefined") return false;
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") return true;
  return Boolean(API_URL);
};

const openMailFallback = (profileEmail, formValues, setStatus) => {
  const subject = encodeURIComponent(`Portfolio message from ${formValues.name}`);
  const body = encodeURIComponent(`${formValues.message}\n\nFrom: ${formValues.name} <${formValues.email}>`);
  window.location.href = `mailto:${profileEmail}?subject=${subject}&body=${body}`;
  setStatus({
    type: "info",
    message: "The contact server is unavailable right now, so I opened your mail app instead.",
  });
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
      openMailFallback(profile.email, form, setStatus);
      setSubmitting(false);
      return;
    }
    try {
      const endpoint = API_URL ? `${API_URL}/contact` : "/api/contact";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({ type: "success", message: result.message });
        setForm({ name: "", email: "", message: "" });
      } else {
        const serverMsg = result.message || "Failed to send message.";
        setStatus({ type: "error", message: serverMsg });

        if (
          serverMsg.toLowerCase().includes("email service is not configured") ||
          serverMsg.toLowerCase().includes("could not reach") ||
          serverMsg.toLowerCase().includes("failed to send")
        ) {
          openMailFallback(profile.email, form, setStatus);
        }
      }
    } catch {
      openMailFallback(profile.email, form, setStatus);
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.25),_transparent_45%),linear-gradient(135deg,_rgba(2,6,23,0.95),_rgba(3,37,70,0.92))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <div className="rounded-[2rem] border border-sky-400/20 bg-slate-950/80 p-6 shadow-[0_25px_80px_rgba(2,8,23,0.45)] backdrop-blur-md lg:p-8">
          <div className="mb-6 rounded-3xl border border-sky-400/20 bg-slate-900/70 p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Contact</p>
                <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Let's Build Something Amazing Together</h2>
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
                🟢 Open to AI • Full Stack • Data Roles
              </span>
            </div>

            <p className="mt-4 text-slate-300">
              Whether you're hiring a software engineer, looking for an AI developer, or interested in collaborating on innovative projects, I'd love to hear from you.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                <p className="text-sm font-semibold text-sky-200">📧 Email</p>
                <a href={`mailto:${profile.email}`} className="mt-1 block text-sm text-slate-300 transition hover:text-sky-200">
                  {profile.email}
                </a>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                <p className="text-sm font-semibold text-sky-200">📱 Phone</p>
                <a href={`tel:${profile.phone}`} className="mt-1 block text-sm text-slate-300 transition hover:text-sky-200">
                  {profile.phone}
                </a>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                <p className="text-sm font-semibold text-sky-200">📍 Location</p>
                <p className="mt-1 text-sm text-slate-300">Addis Ababa, Ethiopia</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                <p className="text-sm font-semibold text-sky-200">💼 Availability</p>
                <p className="mt-1 text-sm text-slate-300">Remote • Full-time • Freelance</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a href={profile.resumeUrl ? `/${profile.resumeUrl}` : "#"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-2 text-sm font-medium text-sky-200 transition hover:bg-sky-500/20">
                <FaDownload /> Download Resume
              </a>
              <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-300">
                Usually replies within 24 hours.
              </span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.5rem] border border-sky-400/20 bg-slate-900/70 p-5">
              <div className="flex items-center gap-2 text-sky-200">
                <FaPaperPlane />
                <h3 className="text-lg font-semibold text-white">Send a Message</h3>
              </div>
              <p className="mt-2 text-sm text-slate-400">Let's build scalable software that makes a real impact.</p>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-200">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-sky-400/20 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-200">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-sky-400/20 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-200">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full resize-none rounded-lg border border-sky-400/20 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
              />
            </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-violet-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:from-violet-600 hover:to-sky-500 disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "🚀 Let's Connect"}
                </button>
                {status.message && (
                  <p className={`text-sm ${status.type === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                    {status.message}
                  </p>
                )}
                {!canPostToServer() && (
                  <p className="mt-2 text-sm text-slate-400">
                    This deployment does not have an API server. The form will open your email client so you can contact me directly.
                  </p>
                )}
              </form>
            </div>

            <div className="rounded-[1.5rem] border border-sky-400/20 bg-slate-900/70 p-5">
              <h3 className="text-lg font-semibold text-white">Professional Profiles</h3>
              <p className="mt-2 text-sm text-slate-400">Connect on the platforms recruiters check most often.</p>
              <div className="mt-4 grid gap-3">
                {socials.map((social) => {
                  const iconMap = {
                    Telegram: <FaGlobe className="text-lg" />,
                    YouTube: <FaYoutube className="text-lg" />,
                    LinkedIn: <FaLinkedin className="text-lg" />,
                    GitHub: <FaGithub className="text-lg" />,
                  };

                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-200 transition hover:border-sky-400 hover:bg-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`rounded-xl p-2 ${social.name === "YouTube" ? "bg-red-500/10 text-red-400" : "bg-sky-500/10 text-sky-300"}`}>
                        {iconMap[social.name] || <FaGlobe className="text-lg" />}
                      </div>
                        <span className="font-medium">{social.name}</span>
                      </div>
                      <span className="text-sky-300">↗</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
