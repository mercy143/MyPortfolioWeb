import React, {   } from "react";
import { useState, useEffect, useRef } from "react";

const skills = [
  { name: "React", percent: 85, color: "from-blue-400 to-purple-500" },
  { name: "JavaScript", percent: 90, color: "from-yellow-400 to-orange-500" },
  { name: "TailwindCSS", percent: 80, color: "from-teal-400 to-cyan-500" },
  { name: "Python", percent: 75, color: "from-green-400 to-blue-500" },
  { name: "Flutter", percent: 70, color: "from-indigo-400 to-purple-500" },
  { name: "Android", percent: 90, color: "from-green-500 to-emerald-600" },
  { name: "Firebase Integration", percent: 85, color: "from-yellow-300 to-orange-400" },
  { name: "API Integration", percent: 90, color: "from-pink-400 to-purple-500" },
];

function Skill() {
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

  return (
    <section className="max-w-3xl mx-auto p-6" ref={skillRef}>
      <h2 className="text-2xl font-semibold mb-10 text-center">My Skills</h2>
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.name} className="group relative">
            {/* Skill Name & Percent */}
            <div className="flex justify-between mb-1">
              <span className="text-gray-800 font-medium">{skill.name}</span>
              <span className="text-gray-600">{visible ? `${skill.percent}%` : "0%"}</span>
            </div>

            {/* Skill Bar */}
            <div className="w-full bg-gray-200 rounded h-5 overflow-hidden relative shadow-sm group-hover:shadow-xl transition-shadow duration-300">
              {/* Floating Badge */}
              <div
                className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full shadow-lg float-badge bg-gradient-to-br ${skill.color} animate-float-rotate transition-all duration-1000 group-hover:animate-pulse`}
                style={{
                  left: visible ? `calc(${skill.percent}% - 0.75rem)` : "0%",
                  boxShadow: "0 0 10px rgba(0,0,0,0.3), 0 0 15px rgba(255,255,255,0.4)",
                }}
              ></div>

              {/* Animated Gradient Bar with shimmer */}
              <div
                className={`h-5 rounded float-gradient transition-all duration-1000 ease-out group-hover:scale-y-105`}
                style={{
                  width: visible ? `${skill.percent}%` : "0%",
                  background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  "--tw-gradient-from": skill.color.split(" ")[0],
                  "--tw-gradient-to": skill.color.split(" ")[2],
                  backgroundSize: "200% 100%",
                  animation: "gradientShift 3s ease infinite",
                }}
                aria-label={`${skill.name} proficiency`}
                aria-valuenow={skill.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                role="progressbar"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skill;
