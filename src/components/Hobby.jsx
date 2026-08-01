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
      <div className="absolute inset-0 bg-slate-900/55" aria-hidden="true" />

      <section className="relative z-10 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Beyond Coding 💡</h2>
        <p className="text-lg text-slate-200 mb-12 text-center">{hobbies.intro}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.items.map((hobby) => (
            <div
              key={hobby.name}
              className="p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-white/20 flex flex-col items-center gap-4 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white animate-float-rotate"
            >
              <div className="text-blue-500 mb-2">{getHobbyIcon(hobby.icon)}</div>
              <p className="text-gray-800 font-medium text-center">{hobby.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Hobby;
