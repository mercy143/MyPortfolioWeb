import React, { useRef, useEffect, useState } from "react";
import { FaProjectDiagram, FaLaptopCode, FaUsers, FaChartLine } from "react-icons/fa";
import motivationImg from "../assets/image.jpg";
import motivationBg from "../motivation.avif";

const points = [
  { icon: <FaProjectDiagram />, text: "Building meaningful projects that help people", gradient: "from-purple-500 to-indigo-500" },
  { icon: <FaLaptopCode />, text: "Learning and mastering new technologies", gradient: "from-green-400 to-teal-500" },
  { icon: <FaUsers />, text: "Collaborating with passionate developers", gradient: "from-yellow-400 to-orange-500" },
  { icon: <FaChartLine />, text: "Growing as a professional and a leader", gradient: "from-pink-400 to-red-500" },
];

function Motivations() {
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...prev, entry.target.dataset.idx]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center py-20 px-6">
      <img
        src={motivationBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-900/55" aria-hidden="true" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <h2 className="text-4xl font-bold text-center text-white mb-6">Motivations</h2>

        <p className="text-lg text-slate-200 text-center mb-12 max-w-3xl mx-auto animate-fadeIn">
          I am motivated by creating impactful software, solving real-world problems,
          and continuously learning new technologies. I aim to deliver reliable,
          scalable, and user-friendly applications that make a difference.
        </p>

        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12">
          {/* Left: Cards */}
          <ul className="space-y-6">
            {points.map((point, idx) => (
              <li
                key={idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                data-idx={idx}
                className={`flex items-center gap-4 p-6 rounded-2xl shadow-lg transform transition duration-700
                  ${
                    visibleCards.includes(idx.toString())
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  } hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-r ${point.gradient}`}
              >
                <span className="text-3xl w-14 h-14 flex items-center justify-center rounded-full bg-white text-gray-800 shadow-md">
                  {point.icon}
                </span>
                <span className="text-lg font-medium text-white">{point.text}</span>
              </li>
            ))}
          </ul>

          {/* Right: Image */}
          <div className="flex justify-center items-start">
            <img
              src={motivationImg}
              alt="Growth Motivation"
              className="max-w-full h-auto rounded-2xl shadow-lg ring-1 ring-white/20 transition-transform transform hover:scale-105 hover:shadow-2xl hover:brightness-110 duration-500"
            />
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease forwards;
          }
        `}
      </style>
    </div>
  );
}

export default Motivations;
