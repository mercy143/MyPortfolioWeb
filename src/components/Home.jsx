import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { usePortfolio, scrollToSection } from "../context/PortfolioContext";

function Home() {
  const { data, assets } = usePortfolio();
  const imgRef = useRef(null);
  const [activeRole, setActiveRole] = useState(0);

  const roles = [
    "AI Engineer",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "Data Engineer",
    "Python Developer",
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveRole((prev) => (prev + 1) % roles.length);
    }, 2200);
    return () => window.clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const card = imgRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / 20).toFixed(2);
    const rotateY = ((centerX - x) / 20).toFixed(2);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    const card = imgRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  const badgeColors = [
    "bg-blue-500/25 text-blue-100",
    "bg-emerald-500/25 text-emerald-100",
    "bg-orange-500/25 text-orange-100",
    "bg-indigo-500/25 text-indigo-100",
    "bg-sky-500/25 text-sky-100",
    "bg-violet-500/25 text-violet-100",
  ];

  const floatingTech = ["Python", "FastAPI", "Next.js", "TensorFlow", "Docker", "PostgreSQL", "Git", "AWS", "Spark", "Kafka"];
  const stats = [
    { value: "15+", label: "Projects" },
    { value: "20+", label: "Technologies" },
    { value: "2+", label: "Years Experience" },
  ];

  const socialLinks = [
    { icon: FaGithub, label: "GitHub", href: "https://github.com/mercy143" },
    { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/guashberhe2026" },
    { icon: FaEnvelope, label: "Email", href: `mailto:${data.profile.email}` },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={assets.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-blue-950/70 to-indigo-950/90" aria-hidden="true" />

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200 backdrop-blur-sm">
              <span className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for Full-Time & Remote Opportunities
            </div>

            <p className="mt-6 uppercase tracking-[0.3em] text-sm font-semibold text-sky-300">
              {data.profile.title}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-white md:text-5xl">
              {data.profile.name}
            </h1>

            <div className="mt-4 min-h-[3rem]">
              <span className="inline-block rounded-full border border-white/10 bg-white/10 px-4 py-2 text-lg font-semibold text-sky-100 shadow-lg backdrop-blur-md">
                {roles[activeRole]}
              </span>
            </div>

            <p className="mt-4 text-lg leading-relaxed text-slate-200">
              {data.profile.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {data.home.technologies.map((tech, idx) => (
                <span
                  key={tech}
                  className={`rounded-full px-3 py-1 text-sm font-semibold backdrop-blur-sm float-badge ${badgeColors[idx % badgeColors.length]}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-pink-500 hover:shadow-2xl"
              >
                View Projects <FaArrowRight />
              </button>
              <a
                href="guash-berhe-cv.docx"
                download
                className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20"
              >
                Download CV
              </a>
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center rounded-lg border border-sky-400/30 bg-sky-500/10 px-6 py-3 font-semibold text-sky-100 shadow-md transition-all duration-300 hover:scale-105 hover:bg-sky-500/20"
              >
                Contact Me
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-slate-100 transition-all duration-300 hover:bg-white/20"
                >
                  <Icon /> {label}
                </a>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-900/35 p-4 text-center shadow-lg backdrop-blur-sm">
                  <h2 className="text-2xl font-bold text-white">{stat.value}</h2>
                  <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative md:justify-self-end">
            <div className="pointer-events-none absolute inset-0">
              {floatingTech.map((tech, index) => {
                const positions = [
                  "left-0 top-8",
                  "right-2 top-10",
                  "left-4 bottom-24",
                  "right-0 bottom-8",
                  "left-12 top-1/2",
                  "right-10 top-1/2",
                  "left-1/2 -top-4",
                  "left-1/2 bottom-0",
                ];

                return (
                  <div
                    key={tech}
                    className={`absolute ${positions[index % positions.length]} rounded-full border border-white/15 bg-slate-900/50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100 shadow-lg backdrop-blur-sm float-badge`}
                  >
                    {tech}
                  </div>
                );
              })}
            </div>

            <div
              ref={imgRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative mx-auto h-72 w-72 rounded-[2rem] border border-sky-300/40 bg-slate-900/20 shadow-[0_0_35px_rgba(56,189,248,0.2),0_20px_60px_rgba(2,6,23,0.3)] transition-all duration-500 transform-gpu overflow-hidden backdrop-blur-sm sm:h-80 sm:w-80 md:h-88 md:w-88 lg:h-[24rem] lg:w-[24rem] hover:shadow-[0_0_45px_rgba(56,189,248,0.3),0_24px_70px_rgba(2,6,23,0.4)]"
            >
              <img
                src={assets.heroProfileImg}
                alt="Profile"
                className="h-full w-full object-cover object-top transition-transform duration-700 transform-gpu"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="inline-flex items-center rounded-full border border-sky-400/50 bg-sky-500/20 px-3 py-1 text-sm font-semibold">
                  Open to Opportunities
                </div>
                <h2 className="mt-3 text-2xl font-semibold">Guash Berhe</h2>
                <p className="text-sm text-slate-200">AI Engineer</p>
                <p className="mt-2 text-sm text-slate-300">📍 Addis Ababa, Ethiopia</p>
                <p className="mt-1 text-sm text-emerald-300">Available for Remote Work</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/35 p-5 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-sky-300">Featured Project</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">Ethiopia House Price Prediction System</h3>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-300">AI</div>
              </div>
              <p className="mt-3 text-sm text-slate-300">Next.js • FastAPI • Machine Learning • PostgreSQL • Docker</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="#projects" className="text-sm font-semibold text-sky-300 transition hover:text-sky-200">View Live →</a>
                <a href="https://github.com/mercy143" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-sky-300 transition hover:text-sky-200">GitHub →</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
