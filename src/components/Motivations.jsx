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

  const introParagraphs = motivations.intro.split("\n\n").filter(Boolean);

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden px-6 py-20">
      <img
        src={assets.motivationBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-900/60" aria-hidden="true" />

      <div className="relative z-10 flex w-full flex-col items-center">
        <h2 className="mb-6 text-center text-4xl font-bold text-white">What Drives Me 🚀</h2>
        <div className="mb-10 flex max-w-3xl flex-col gap-3 text-center text-lg text-slate-200 animate-fadeIn">
          {introParagraphs.map((paragraph, index) => (
            <p key={`${paragraph.slice(0, 20)}-${index}`}>{paragraph}</p>
          ))}
        </div>

        <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ul className="grid gap-4 md:gap-5">
            {motivations.points.map((point, idx) => (
              <li
                key={point.text}
                ref={(el) => (cardRefs.current[idx] = el)}
                data-idx={idx}
                className={`group flex items-start gap-4 rounded-[1.5rem] border border-white/15 p-5 shadow-xl backdrop-blur-sm transition-all duration-700 ${
                  visibleCards.includes(idx.toString())
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                } hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 bg-gradient-to-br ${point.gradient}`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-slate-800 shadow-md">
                  <span className="text-xl transition-transform duration-500 group-hover:rotate-6">
                    {getMotivationIcon(point.icon)}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-3">
                    <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
                      0{idx + 1}
                    </span>
                    <span className="text-lg font-semibold text-white">{point.text}</span>
                  </div>
                  {point.description && (
                    <p className="text-sm leading-6 text-slate-100/90">{point.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-start justify-center">
            <img
              src={assets.motivationImg}
              alt="Growth Motivation"
              className="h-auto w-full max-w-[420px] rounded-[1.75rem] object-cover shadow-2xl ring-1 ring-white/20 transition-transform duration-500 hover:scale-[1.02] hover:brightness-110"
            />
          </div>
        </div>

        <div className="mt-12 max-w-3xl text-center">
          <p className="text-xl italic text-slate-100/95">
            “Technology is most valuable when it solves real problems and empowers people. That is the kind of software I strive to build every day.”
          </p>
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
