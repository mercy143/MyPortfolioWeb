import React from "react";
import { FaMobileAlt, FaReact, FaBook, FaChess, FaGuitar, FaBullhorn, FaFootballBall } from "react-icons/fa";
import hobbiesVideo from "../hobbies.mp4";

function Hobby() {
  const hobbies = [
    { name: "Mobile app development", icon: <FaMobileAlt size={24} /> },
    { name: "Experimenting with Flutter and React", icon: <FaReact size={24} /> },
    { name: "Reading books on AI and programming", icon: <FaBook size={24} /> },
    { name: "Playing chess and puzzles", icon: <FaChess size={24} /> },
    { name: "Playing musical instruments", icon: <FaGuitar size={24} /> },
    { name: "Reading Motivational Books and Listening Motivational Speeches", icon: <FaBullhorn size={24} /> },
    { name: "Sports", icon: <FaFootballBall size={24} /> },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden py-20" id="hobby">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={hobbiesVideo}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-900/55" aria-hidden="true" />

      <section className="relative z-10 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Hobbies</h2>
        <p className="text-lg text-slate-200 mb-12 text-center">
          I enjoy exploring new technologies, building personal projects, reading tech blogs, working on side projects that improve my skills, and staying active with sports.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, idx) => (
            <div
              key={idx}
              className="p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-white/20 flex flex-col items-center gap-4 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white animate-float-rotate"
            >
              <div className="text-blue-500 mb-2">{hobby.icon}</div>
              <p className="text-gray-800 font-medium text-center">{hobby.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Hobby;
