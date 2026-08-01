import React, { useRef, useEffect, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { getMotivationIcon } from "../utils/icons";

function Motivations() {
  const { data, assets } = usePortfolio();
  const { motivations } = data;
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
  }, [motivations.points.length]);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center py-20 px-6">
      <img
        src={assets.motivationBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-900/55" aria-hidden="true" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <h2 className="text-4xl font-bold text-center text-white mb-6">What Drives Me 🚀</h2>
        <p className="text-lg text-slate-200 text-center mb-12 max-w-3xl mx-auto animate-fadeIn">
          {motivations.intro}
        </p>

        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12">
          <ul className="space-y-6">
            {motivations.points.map((point, idx) => (
              <li
                key={point.text}
                ref={(el) => (cardRefs.current[idx] = el)}
                data-idx={idx}
                className={`flex items-center gap-4 p-6 rounded-2xl shadow-lg transform transition duration-700 ${
                  visibleCards.includes(idx.toString())
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-r ${point.gradient}`}
              >
                <span className="text-3xl w-14 h-14 flex items-center justify-center rounded-full bg-white text-gray-800 shadow-md">
                  {getMotivationIcon(point.icon)}
                </span>
                <span className="text-lg font-medium text-white">{point.text}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-center items-start">
            <img
              src={assets.motivationImg}
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
          .animate-fadeIn { animation: fadeIn 0.8s ease forwards; }
        `}
      </style>
    </div>
  );
}

export default Motivations;
