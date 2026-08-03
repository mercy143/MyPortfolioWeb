import React from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { getHobbyIcon } from "../utils/icons";

function Hobby() {
  const { data, assets } = usePortfolio();
  const { hobbies } = data;

  return (
    <div className="relative min-h-screen overflow-hidden py-20">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={assets.hobbiesVideo}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_36%),linear-gradient(135deg,_rgba(2,6,23,0.9),_rgba(3,37,70,0.92))]" aria-hidden="true" />

      <section className="relative z-10 mx-auto max-w-5xl px-6">
        <h2 className="mb-10 text-center text-3xl font-bold text-white">Beyond Coding 💡</h2>
        <p className="mb-12 text-center text-lg text-slate-200">{hobbies.intro}</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hobbies.items.map((hobby) => (
            <div
              key={hobby.name}
              className="flex flex-col items-center gap-4 rounded-[1.35rem] border border-sky-400/20 bg-slate-950/80 p-6 shadow-[0_15px_45px_rgba(2,8,23,0.35)] backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:border-sky-400/40 hover:shadow-[0_20px_60px_rgba(14,165,233,0.2)]"
            >
              <div className="mb-2 rounded-2xl bg-sky-500/10 p-3 text-sky-300">{getHobbyIcon(hobby.icon)}</div>
              <p className="text-center font-medium text-slate-100">{hobby.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Hobby;
