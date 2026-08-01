import React, { useEffect, useRef, useState } from "react";
import { FaBrain, FaCloud, FaCode, FaDatabase, FaReact } from "react-icons/fa";
import { usePortfolio } from "../context/PortfolioContext";

function Skill() {
  const { data, assets } = usePortfolio();
  const [visible, setVisible] = useState(false);
  const skillRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (skillRef.current) observer.observe(skillRef.current);
    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      title: "Programming",
      icon: FaCode,
      skills: [
        { name: "Python", percent: 92, experience: "2+ Years", icon: "🐍", color: "from-cyan-400 to-blue-500" },
        { name: "JavaScript", percent: 88, experience: "2 Years", icon: "⚡", color: "from-yellow-400 to-orange-500" },
        { name: "Java", percent: 85, experience: "2 Years", icon: "☕", color: "from-red-400 to-orange-500" },
        { name: "SQL", percent: 90, experience: "2+ Years", icon: "📊", color: "from-indigo-400 to-purple-500" },
      ],
    },
    {
      title: "AI & Machine Learning",
      icon: FaBrain,
      skills: [
        { name: "Machine Learning", percent: 88, experience: "2 Years", icon: "🤖", color: "from-emerald-400 to-cyan-500" },
        { name: "Deep Learning", percent: 80, experience: "1+ Years", icon: "🧠", color: "from-violet-400 to-fuchsia-500" },
        { name: "FastAPI", percent: 90, experience: "2 Years", icon: "☁", color: "from-teal-400 to-cyan-500" },
        { name: "Scikit-learn", percent: 88, experience: "2 Years", icon: "📈", color: "from-green-400 to-emerald-500" },
        { name: "Pandas / NumPy", percent: 90, experience: "2 Years", icon: "📐", color: "from-sky-400 to-blue-500" },
      ],
    },
    {
      title: "Data Engineering",
      icon: FaDatabase,
      skills: [
        { name: "Apache Spark", percent: 75, experience: "1 Year", icon: "⚡", color: "from-orange-400 to-amber-500" },
        { name: "PySpark", percent: 78, experience: "1 Year", icon: "🔥", color: "from-rose-400 to-pink-500" },
        { name: "Kafka", percent: 70, experience: "1 Year", icon: "📡", color: "from-purple-400 to-indigo-500" },
        { name: "Airflow", percent: 72, experience: "1 Year", icon: "🛠", color: "from-slate-400 to-slate-600" },
        { name: "Docker", percent: 80, experience: "2 Years", icon: "🐳", color: "from-cyan-400 to-sky-500" },
      ],
    },
    {
      title: "Frontend & Backend",
      icon: FaReact,
      skills: [
        { name: "React", percent: 85, experience: "2 Years", icon: "⚛", color: "from-blue-400 to-cyan-500" },
        { name: "Next.js", percent: 82, experience: "1+ Years", icon: "▲", color: "from-slate-400 to-slate-600" },
        { name: "TailwindCSS", percent: 85, experience: "2 Years", icon: "🎨", color: "from-teal-400 to-cyan-500" },
        { name: "REST APIs", percent: 92, experience: "2+ Years", icon: "🔗", color: "from-fuchsia-400 to-purple-500" },
        { name: "PostgreSQL", percent: 85, experience: "2 Years", icon: "🗄", color: "from-blue-500 to-indigo-500" },
        { name: "Firebase", percent: 82, experience: "2 Years", icon: "🔥", color: "from-yellow-400 to-orange-500" },
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: FaCloud,
      skills: [
        { name: "Git", percent: 85, experience: "2 Years", icon: "🌿", color: "from-orange-400 to-red-500" },
        { name: "Linux", percent: 80, experience: "2 Years", icon: "🐧", color: "from-blue-400 to-slate-500" },
        { name: "Flutter", percent: 75, experience: "1+ Years", icon: "📱", color: "from-indigo-400 to-purple-500" },
        { name: "Android", percent: 80, experience: "2 Years", icon: "🤖", color: "from-green-400 to-emerald-500" },
      ],
    },
  ];

  const techBadges = [
    "Python", "FastAPI", "React", "Next.js", "Node.js", "Docker", "PostgreSQL", "Firebase",
    "Git", "Linux", "Spark", "Kafka", "TensorFlow", "Scikit-learn", "Pandas", "NumPy",
  ];

  return (
    <section className="relative overflow-hidden py-16" ref={skillRef}>
      <img
        src={assets.skillBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-950/75" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Technical Stack</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">My Skills</h2>
          <p className="mt-4 text-lg text-slate-300">Focused on AI, data engineering, backend systems, and modern full-stack product development.</p>
        </div>

        <div className="mt-10 space-y-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.title} className="rounded-[1.75rem] border border-white/10 bg-slate-900/45 p-6 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-sky-500/10 p-3 text-sky-400"><Icon /></div>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>

                <div className="mt-6 space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="group relative">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{skill.icon}</span>
                          <span className="font-medium text-white">{skill.name}</span>
                        </div>
                        <div className="text-right text-sm text-slate-300">
                          <div>{`${skill.percent}%`}</div>
                          <div className="text-xs text-slate-400">{skill.experience}</div>
                        </div>
                      </div>

                      <div className="h-5 overflow-hidden rounded-full bg-white/10 shadow-sm backdrop-blur-sm">
                        <div
                          className={`h-5 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out group-hover:scale-y-105`}
                          style={{ width: visible ? `${skill.percent}%` : "0%" }}
                          aria-label={`${skill.name} proficiency`}
                          aria-valuenow={skill.percent}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          role="progressbar"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-slate-900/45 p-6 shadow-2xl backdrop-blur-md">
          <h3 className="text-xl font-semibold text-white">Technologies</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {techBadges.map((badge) => (
              <span key={badge} className="rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-2 text-sm font-medium text-sky-100">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skill;
