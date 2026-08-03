import React, { useState } from "react";
import { FaBriefcase, FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaMobileAlt, FaGlobe, FaYoutube } from "react-icons/fa";
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
        const serverMsg = result.message || "Failed to send message.";
        setStatus({ type: "error", message: serverMsg });

        if (serverMsg.toLowerCase().includes("email service is not configured")) {
          const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
          const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
          window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        }
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

  const contactItems = [
    { icon: <FaEnvelope className="text-sky-600" />, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: <FaMobileAlt className="text-sky-600" />, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
    { icon: <FaMapMarkerAlt className="text-sky-600" />, label: "Location", value: profile.location || "Addis Ababa, Ethiopia" },
    { icon: <FaBriefcase className="text-sky-600" />, label: "Availability", value: profile.availability || "Open to AI • Full Stack • Data roles" },
  ];

  const socialIcons = {
    GitHub: <FaGithub />,
    LinkedIn: <FaLinkedin />,
    Email: <FaEnvelope />,
    CV: <FaDownload />,
    Portfolio: <FaGlobe />,
    YouTube: <FaYoutube />,
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <img
        src={contactBackground}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-900/60" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col justify-between">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Contact</p>
                <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                  Let&apos;s Build Something Amazing Together
                </h2>
                <p className="mb-4 text-base leading-7 text-slate-700">
                  Whether you&apos;re hiring a software engineer, looking for an AI developer, or interested in collaborating on innovative projects, I&apos;d love to hear from you. Let&apos;s build scalable software that makes a real impact.
                </p>
                <div className="mb-5 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                  <span className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  {profile.availability || "Open to AI & Full Stack Roles"}
                </div>
                <div className="mb-6 text-sm text-slate-600">{profile.responseTime || "Typically responds within 24 hours to collaboration and hiring inquiries."}</div>

                <div className="mb-6 flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <img
                    src={assets.aboutProfileImg || assets.heroProfileImg || assets.navbarProfileImg}
                    alt={profile.name}
                    className="h-20 w-20 rounded-full object-cover ring-2 ring-sky-200"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{profile.name}</h3>
                    <p className="text-sm text-slate-600">{profile.title}</p>
                    <p className="text-sm font-medium text-sky-700">Available for remote and collaborative work</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {contactItems.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.href ? (
                        <a href={item.href} className="break-all text-sm text-sky-700 transition hover:text-sky-800">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-700">{item.value}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex flex-wrap gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex min-w-[120px] items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-sky-600 hover:text-white"
                        aria-label={social.name}
                      >
                        <span className="text-base">{socialIcons[social.name] || social.name[0]}</span>
                        <span>{social.name}</span>
                      </a>
                    ))}
                  </div>
                  {profile.resumeUrl && (
                    <a
                      href={profile.resumeUrl}
                      download
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-slate-900 hover:text-white"
                    >
                      <FaDownload className="animate-bounce" />
                      Download Resume
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/90 p-5 shadow-inner sm:p-6">
              <p className="mb-4 text-sm text-slate-600">
                Tell me about your project, idea, or opportunity. I&apos;ll get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={7}
                    value={form.message}
                    onChange={handleChange}
                    className="min-h-[220px] w-full resize-y rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-violet-600 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-violet-600 hover:to-sky-500 disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "🚀 Send Message"}
                </button>
                {status.message && (
                  <p className={`text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>
                    {status.message}
                  </p>
                )}
                {!canPostToServer() && (
                  <p className="mt-2 text-sm text-slate-500">
                    This deployment does not have an API server. The form will open your email client so you can contact me directly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
