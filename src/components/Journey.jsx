import React from "react";

const milestoneColors = [
  "from-blue-400 to-purple-500",
  "from-yellow-400 to-orange-500",
  "from-teal-400 to-cyan-500",
  "from-green-400 to-blue-500",
  "from-pink-400 to-purple-500",
];

const confettiColorsMission = [
  "from-blue-400 to-purple-500",
  "from-indigo-400 to-blue-500",
  "from-cyan-400 to-teal-500",
  "from-purple-400 to-pink-500",
];

const confettiColorsVision = [
  "from-green-400 to-emerald-500",
  "from-lime-400 to-green-500",
  "from-teal-400 to-cyan-500",
  "from-yellow-300 to-orange-400",
];

function Journey() {
  const milestones = [
    {
      year: "2021",
      title: "Started My Tech Journey",
      description:
        "Began exploring programming and software development, focusing on mobile and web technologies. Learned the fundamentals of Java, Python, and problem-solving.",
    },
    {
      year: "2022",
      title: "Mobile & Web Development",
      description:
        "Specialized in Android development with Java and Flutter. Started working on small projects and contributed to real-world apps. Built strong skills in Firebase integration and backend APIs.",
    },
    {
      year: "2023",
      title: "Professional Experience",
      description:
        "Worked as a software developer under the Ministry of Revenue, supervised by Director Kuratu Lemma. Developed mobile and web solutions, including tax reporting applications with Firebase and charts.",
    },
    {
      year: "2024",
      title: "Expanding Horizons",
      description:
        "Focused on ReactJS for frontend development and Python for backend. Started exploring AI and data science. Designed a Kebele Administration system with Flutter and integrated advanced Android features like QR scanning, file picker, and chat messaging.",
    },
    {
      year: "2025/2026",
      title: "Dreaming Bigger",
      description:
        "Aiming to pursue a Master's scholarship abroad in Project Management/ Artificial Intelligence/Software Engineering/Data Science/Computer Science. Currently building professional Mobile and Web Applications, freelancing in Android app development, and working towards becoming a professional AI developer and cyber security expert.",
    },
  ];

  const renderConfetti = (colors) =>
    colors.map((color, idx) => (
      <div
        key={idx}
        className={`absolute w-4 h-4 rounded-full shadow-lg bg-gradient-to-br ${color} animate-float-diagonal`}
        style={{
          top: `${Math.random() * 80}%`,
          left: `${Math.random() * 90}%`,
        }}
      ></div>
    ));

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-10 text-center">My Journey</h2>

      {/* Milestones */}
      <div className="relative border-l border-gray-300">
        {milestones.map((milestone, idx) => {
          const color = milestoneColors[idx % milestoneColors.length];
          return (
            <div
              key={idx}
              className="mb-10 ml-6 relative transform transition-all duration-500 hover:scale-105"
            >
              <div
                className={`absolute -left-3 top-2 w-5 h-5 rounded-full shadow-lg float-badge bg-gradient-to-br ${color} animate-float-rotate`}
              ></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-500">
                {milestone.year}
              </time>
              <h3 className="text-lg font-semibold text-blue-900">
                {milestone.title}
              </h3>
              <p className="text-gray-700 mt-1">{milestone.description}</p>
            </div>
          );
        })}
      </div>

      {/* Mission Card */}
      <section className="relative mt-12 p-8 rounded-xl shadow-lg border border-gray-200 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 transform transition hover:scale-105 hover:shadow-2xl">
        {renderConfetti(confettiColorsMission)}
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Mission
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          My mission is to build innovative and reliable software solutions that
          solve real-world problems. I strive to deliver high-quality
          applications, continuously learn, and make a meaningful impact
          through technology.
        </p>
        <ul className="space-y-2 text-gray-700 list-disc list-inside">
          <li>Create user-friendly mobile and web applications</li>
          <li>Integrate robust APIs for seamless experiences</li>
          <li>Maintain code quality and best practices</li>
          <li>Help businesses and individuals achieve their goals</li>
        </ul>
      </section>

      {/* Vision Card */}
      <section className="relative mt-8 p-8 rounded-xl shadow-lg border border-gray-200 bg-gradient-to-r from-green-100 via-green-50 to-green-100 transform transition hover:scale-105 hover:shadow-2xl">
        {renderConfetti(confettiColorsVision)}
        <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">
          Vision
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          My vision is to become a professional AI and software developer who
          builds impactful technology solutions, inspires innovation, and
          contributes to a smarter and more connected world.
        </p>
        <ul className="space-y-2 text-gray-700 list-disc list-inside">
          <li>Be recognized as a skilled software developer and AI enthusiast</li>
          <li>Continuously innovate and create meaningful software</li>
          <li>Mentor and collaborate with upcoming developers</li>
          <li>Use technology to solve global challenges</li>
        </ul>
      </section>

      <style>
        {`
          @keyframes floatRotate {
            0%,100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-5px) rotate(-3deg); }
            50% { transform: translateY(-10px) rotate(3deg); }
            75% { transform: translateY(-5px) rotate(-2deg); }
          }
          .animate-float-rotate {
            animation: floatRotate 3s ease-in-out infinite;
          }

          @keyframes floatDiagonal {
            0% { transform: translate(0,0) rotate(0deg); }
            25% { transform: translate(5px,-5px) rotate(3deg); }
            50% { transform: translate(-5px,-10px) rotate(-3deg); }
            75% { transform: translate(5px,-5px) rotate(2deg); }
            100% { transform: translate(0,0) rotate(0deg); }
          }
          .animate-float-diagonal {
            animation: floatDiagonal 3s ease-in-out infinite;
          }

          @keyframes float {
            0%,100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-5px) rotate(3deg); }
          }
          .float-badge {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

export default Journey;
