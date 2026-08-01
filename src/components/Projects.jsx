import React, { useMemo, useRef, useState } from "react";
import { FaArrowRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { usePortfolio } from "../context/PortfolioContext";

const FILTERS = ["All", "AI", "Machine Learning", "Full Stack", "Backend", "Data Engineering", "Android"];

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / 20).toFixed(2);
    const rotateY = ((centerX - x) / 20).toFixed(2);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  const previewClasses = {
    AI: "from-cyan-500/20 via-blue-600/10 to-violet-600/20",
    "Machine Learning": "from-emerald-500/20 via-teal-600/10 to-cyan-600/20",
    "Full Stack": "from-fuchsia-500/20 via-purple-600/10 to-indigo-600/20",
    Backend: "from-orange-500/20 via-amber-600/10 to-rose-600/20",
    "Data Engineering": "from-sky-500/20 via-blue-600/10 to-cyan-600/20",
    Android: "from-green-500/20 via-emerald-600/10 to-lime-600/20",
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-0 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:border-sky-400/40 hover:shadow-2xl ${project.featured ? "lg:col-span-2" : ""}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className={`relative h-40 bg-gradient-to-br ${previewClasses[project.category] || "from-slate-700 to-slate-900"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),_transparent_55%)]" />
        <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-slate-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 backdrop-blur-sm">
          {project.status}
        </div>
        <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 backdrop-blur-sm">
          {project.category}
        </div>
        <div className="absolute bottom-5 left-5 rounded-2xl border border-white/15 bg-slate-900/55 px-4 py-3 text-white shadow-lg backdrop-blur-sm">
          <p className="text-[11px] uppercase tracking-[0.22em] text-sky-200">Preview</p>
          <p className="mt-1 text-sm font-semibold">{project.previewLabel}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-sky-300">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300">{project.description}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span key={item} className="rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-100">
              {item}
            </span>
          ))}
        </div>

        <ul className="mt-5 space-y-2 text-sm text-slate-300">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2">
              <span className="mt-1 text-sky-300">✔</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-500/20">
              Live Demo <FaExternalLinkAlt />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/20">
              GitHub <FaGithub />
            </a>
          )}
          {project.readMoreUrl && (
            <a href={project.readMoreUrl} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-2 text-sm font-semibold text-slate-200 transition hover:text-white">
              Read More <FaArrowRight />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const { data, assets } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return data.projects;
    return data.projects.filter((project) => project.category === activeFilter || project.category === "Full Stack" && activeFilter === "Full Stack");
  }, [activeFilter, data.projects]);

  const stats = [
    { value: "15+", label: "Projects" },
    { value: "30+", label: "Technologies" },
    { value: "100+", label: "GitHub Commits" },
    { value: "5+", label: "AI Projects" },
  ];

  return (
    <section className="relative overflow-hidden py-16">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={assets.projectsVideo}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-950/75" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Selected Work</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Featured Projects</h2>
          <p className="mt-4 text-lg text-slate-300">
            AI, machine learning, data engineering, and full-stack systems built to solve real-world problems.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${activeFilter === filter ? "border-sky-400/40 bg-sky-500/20 text-white shadow-lg" : "border-white/10 bg-white/10 text-slate-200 hover:bg-white/20"}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="mt-10 grid gap-4 rounded-[1.75rem] border border-white/10 bg-slate-900/45 p-6 shadow-2xl backdrop-blur-md md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center">
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
