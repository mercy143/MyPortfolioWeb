import React, { useRef } from "react";
import profileImg from "../assets/image.jpg";

function Home() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = imgRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / 20).toFixed(2);
    const rotateY = ((centerX - x) / 20).toFixed(2);

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    const card = imgRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  const technologies = ["Android", "Flutter", "API Integration", "Firebase", "React"];

  return (
    <div className="min-h-screen bg-gray-50" id="home">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Text */}
          <div>
            <p className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
              Software Engineer and Developer
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
              Guash Berhe Tela
            </h1>
            <p className="text-lg text-gray-700 mt-4">
              I build reliable Android and Flutter apps, integrate robust APIs, and ship performant web UIs with React and TailwindCSS.
            </p>

            {/* Floating Badges */}
            <div className="flex flex-wrap gap-3 mt-6">
              {technologies.map((tech, idx) => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-full text-sm cursor-default transform transition-all duration-500 hover:scale-110 float-badge font-semibold ${
                    idx % 2 === 0 ? "bg-blue-50 text-blue-700" :
                    idx === 1 ? "bg-emerald-50 text-emerald-700" :
                    idx === 2 ? "bg-orange-50 text-orange-700" :
                    idx === 3 ? "bg-indigo-50 text-indigo-700" :
                    "bg-sky-50 text-sky-700"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:from-purple-500 hover:to-pink-500"
              >
                View Projects
              </button>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=guashberhe2019@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              >
                Hire Me
              </a>
            </div>
          </div>

          {/* Right Image + Highlights */}
          <div className="md:justify-self-end">
            {/* Profile Card */}
            <div
              ref={imgRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-56 h-56 md:w-64 md:h-64 mx-auto rounded-2xl overflow-hidden shadow-md transition-transform duration-500 transform-gpu cursor-pointer hover:shadow-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50"
            >
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 transform-gpu group-hover:scale-105"
              />
            </div>

            {/* Highlights Card */}
            <div className="mt-6 rounded-2xl border bg-white shadow-md p-6 transition-all duration-500 hover:shadow-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Highlights</h2>
              <ul className="space-y-3 text-gray-700">
                {[
                  "QR Scanner app for manual invoice validation with secure API",
                  "TIN validator integrating with SIGTAS",
                  "Android chat app with Firebase (Auth, Firestore, FCM)",
                  "User registration with Firebase Authentication"
                ].map(item => (
                  <li key={item} className="highlight-item hover:text-blue-700 hover:scale-105 transition-all duration-300">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <button
                  onClick={() => scrollToSection("skill")}
                  className="text-blue-600 hover:underline"
                >
                  Explore my skills →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;