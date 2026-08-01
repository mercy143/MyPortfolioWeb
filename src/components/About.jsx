import React from "react";
import { FaBrain, FaGraduationCap, FaRocket, FaTools } from "react-icons/fa";
import { usePortfolio, scrollToSection } from "../context/PortfolioContext";

function About() {
  const { data, assets } = usePortfolio();
  const { about } = data;

  const quickStats = [
    { value: "15+", label: "Projects" },
    { value: "20+", label: "Technologies" },
    { value: "2+", label: "Years Experience" },
    { value: "5+", label: "AI Projects" },
  ];

  const certifications = ["AI Engineering", "Data Engineering", "Python", "Machine Learning"];
  const currentlyLearning = ["LLM Engineering", "LangChain", "Apache Spark", "Kafka"];

  return (
    <section className="relative overflow-hidden py-16">
      <img
        src={assets.aboutBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-950/70" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">About Me</h1>
            <p className="mt-5 text-lg leading-8 text-slate-200">{about.bio}</p>

            <div className="mt-8 rounded-[1.5rem] border border-white/15 bg-white/90 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-600/10 p-3 text-blue-600"><FaGraduationCap /></div>
                <h2 className="text-xl font-semibold text-gray-900">Education</h2>
              </div>
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">Bachelor of Science</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{about.education.degree}</p>
                <p className="mt-2 text-gray-700">{about.education.school}</p>
                <p className="mt-2 text-sm text-gray-600">Graduated 2024</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/15 bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-purple-600/10 p-3 text-purple-600"><FaBrain /></div>
                  <h3 className="font-semibold text-gray-900">What I Do</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {about.whatIDo.map((item) => (
                    <li key={item} className="flex items-start gap-2 rounded px-1 transition hover:translate-y-1 hover:text-blue-700">
                      <span className="mt-1 text-blue-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.5rem] border border-white/15 bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-emerald-600/10 p-3 text-emerald-600"><FaRocket /></div>
                  <h3 className="font-semibold text-gray-900">Strengths</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {about.strengths.map((item) => (
                    <li key={item} className="flex items-start gap-2 rounded px-1 transition hover:translate-y-1 hover:text-emerald-700">
                      <span className="mt-1 text-emerald-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/15 bg-slate-950/50 p-6 shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-amber-500/10 p-3 text-amber-400"><FaTools /></div>
                  <h3 className="font-semibold text-white">Experience</h3>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-white">Software Developer</p>
                  <p className="mt-1 text-sm text-slate-300">Ministry of Revenue – Ethiopia</p>
                  <p className="mt-1 text-sm text-slate-400">2024 – Present</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    <li>• Built enterprise applications and API integrations</li>
                    <li>• Worked on invoice validation and reporting systems</li>
                    <li>• Contributed to system testing and reliable deployments</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/15 bg-slate-950/50 p-6 shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-sky-500/10 p-3 text-sky-400"><FaTools /></div>
                  <h3 className="font-semibold text-white">Certifications</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {certifications.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-sky-400">✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[1.75rem] border border-white/15 bg-white/90 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full ring-2 ring-sky-500 sm:h-48 sm:w-48">
                <img
                  src={assets.aboutProfileImg}
                  alt="Profile"
                  className="h-full w-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-gray-900">At a Glance</h2>

              <dl className="mt-4 grid grid-cols-2 gap-4 text-gray-800">
                {about.glance.map((item) => (
                  <div key={item.label} className={`rounded-xl bg-gradient-to-br ${item.color} p-3 shadow-sm`}>
                    <dt className="text-sm text-gray-600">{item.label}</dt>
                    <dd className="mt-1 font-semibold">{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {quickStats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-blue-500"
                >
                  Explore My Portfolio →
                </button>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/15 bg-slate-950/50 p-6 shadow-xl backdrop-blur-md">
              <h3 className="font-semibold text-white">Currently Learning</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {currentlyLearning.map((item) => (
                  <span key={item} className="rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-sm text-sky-100">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default About;
