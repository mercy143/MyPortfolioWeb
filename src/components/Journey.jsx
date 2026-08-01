import React from "react";
import { FaBrain, FaGraduationCap, FaRocket, FaTools } from "react-icons/fa";
import { usePortfolio } from "../context/PortfolioContext";

const milestoneColors = [
  "from-blue-400 to-purple-500",
  "from-yellow-400 to-orange-500",
  "from-teal-400 to-cyan-500",
  "from-green-400 to-blue-500",
  "from-pink-400 to-purple-500",
];

const milestoneIcons = [FaGraduationCap, FaTools, FaRocket, FaBrain, FaRocket];

function Journey() {
  const { data, assets } = usePortfolio();
  const { journey } = data;

  const achievements = [
    "🏆 Software Engineering Degree",
    "🏆 Ministry of Revenue Experience",
    "🏆 House Price Prediction Project",
    "🏆 15+ Projects Built",
    "🏆 Data Engineering Learning Path",
  ];

  return (
    <div className="relative overflow-hidden py-16">
      <img
        src={assets.journeyBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-950/70" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Professional Growth</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">My Journey</h2>
          <p className="mt-4 text-lg text-slate-300">A progression from software development into AI, data engineering, and modern full-stack engineering.</p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-md sm:p-8">
          <div className="relative border-l-2 border-sky-400/40 pl-6 sm:pl-8">
            {journey.milestones.map((milestone, idx) => {
              const color = milestoneColors[idx % milestoneColors.length];
              const Icon = milestoneIcons[idx % milestoneIcons.length];

              return (
                <div key={milestone.year} className="relative mb-10 last:mb-0">
                  <div className={`absolute -left-[1.7rem] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${color} text-white shadow-lg`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
                    <time className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">{milestone.year}</time>
                    <h3 className="mt-2 text-xl font-semibold text-white">{milestone.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-slate-200">{milestone.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-4 rounded-[2rem] border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-md md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <h3 className="text-xl font-semibold text-white">Mission</h3>
            <p className="mt-3 text-[15px] leading-7 text-slate-200">{journey.mission.description}</p>
            <ul className="mt-4 space-y-2 text-[15px] text-slate-200">
              {journey.mission.points.map((point) => (
                <li key={point} className="flex items-start gap-2"><span className="mt-1 text-sky-300">•</span><span>{point}</span></li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <h3 className="text-xl font-semibold text-white">Passion</h3>
            <p className="mt-3 text-[15px] leading-7 text-slate-200">{journey.passion.description}</p>
            <ul className="mt-4 space-y-2 text-[15px] text-slate-200">
              {journey.passion.points.map((point) => (
                <li key={point} className="flex items-start gap-2"><span className="mt-1 text-emerald-300">•</span><span>{point}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-md">
          <h3 className="text-xl font-semibold text-white">Achievements</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {achievements.map((item) => (
              <span key={item} className="rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-2 text-sm text-sky-100">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Journey;
