import React from "react";
import { FaMobileAlt, FaReact, FaBook, FaChess, FaGuitar, FaBullhorn, FaFootballBall } from "react-icons/fa";

function Hobby() {
  const hobbies = [
    { name: "Mobile app development", icon: <FaMobileAlt size={24} /> },
    { name: "Experimenting with Flutter and React", icon: <FaReact size={24} /> },
    { name: "Reading books on AI and programming", icon: <FaBook size={24} /> },
    { name: "Playing chess and puzzles", icon: <FaChess size={24} /> },
    { name: "Playing musical instruments", icon: <FaGuitar size={24} /> },
    { name: "Reading Motivational Books and Listening Motivational Speeches", icon: <FaBullhorn size={24} /> },
    { name: "Sports", icon: <FaFootballBall size={24} /> }, // Added sports
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-20" id="hobby">
      <section className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Hobbies</h2>
        <p className="text-lg text-gray-700 mb-12 text-center">
          I enjoy exploring new technologies, building personal projects, reading tech blogs, working on side projects that improve my skills, and staying active with sports.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center gap-4 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-100 hover:via-purple-100 hover:to-pink-100 animate-float-rotate"
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
