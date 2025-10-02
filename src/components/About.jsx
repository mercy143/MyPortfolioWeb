import React from "react";
import profileImg from "../assets/photo.png";

function About() {
  const glanceData = [
    { label: "Graduated", value: "2024", color: "from-blue-100 to-blue-200 text-blue-800" },
    { label: "University", value: "Mekelle Univ.", color: "from-green-100 to-green-200 text-green-800" },
    { label: "Focus", value: "Mobile & Web", color: "from-yellow-100 to-yellow-200 text-yellow-800" },
    { label: "Based", value: "Ethiopia", color: "from-purple-100 to-purple-200 text-purple-800" },
  ];

  return (
    <section className="px-6 py-12 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900">About Me</h1>
          <p className="mt-4 text-gray-700 leading-7">
            I'm a software engineer specialized in Android, Flutter, API integrations, and modern web UIs with React and TailwindCSS. I enjoy building reliable products with clean architecture and thoughtful UX.
          </p>

          {/* Education Card */}
          <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50">
            <h2 className="text-xl font-semibold text-gray-900">Education</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">B.Sc. in Software Engineering</p>
                  <p className="text-gray-700">Mekelle University • 2024 G.C</p>
                </div>
              </div>
            </div>
          </div>

          {/* What I Do & Strengths */}
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
              <h3 className="font-semibold text-gray-900">What I Do</h3>
              <ul className="mt-3 space-y-2 text-gray-700 list-disc list-inside">
                {[
                  "Android and Flutter app development",
                  "Firebase (Auth, Firestore, FCM) integration",
                  "REST API design and integration",
                  "Modern web UIs with React + TailwindCSS"
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="transition transform hover:translate-y-1 hover:scale-105 hover:text-blue-600 hover:shadow-md rounded px-1"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-300">
              <h3 className="font-semibold text-gray-900">Strengths</h3>
              <ul className="mt-3 space-y-2 text-gray-700 list-disc list-inside">
                {[
                  "Clean architecture and maintainable code",
                  "Problem solving and debugging",
                  "Performance-minded and UX-focused",
                  "Team collaboration and communication"
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="transition transform hover:translate-y-1 hover:scale-105 hover:text-green-600 hover:shadow-md rounded px-1"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden ring-2 ring-blue-500 animate-float-rotate">
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mt-6">At a Glance</h2>

            <dl className="mt-4 grid grid-cols-2 gap-4 text-gray-800">
              {glanceData.map((item, idx) => (
                <div
                  key={idx}
                  className={`transition transform hover:scale-105 hover:shadow-md rounded px-2 py-1 bg-gradient-to-br ${item.color} bg-opacity-20`}
                >
                  <dt className="text-sm text-gray-600">{item.label}</dt>
                  <dd className="font-semibold">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <a
                href="/projects"
                className="inline-block text-white bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded shadow-lg hover:from-purple-500 hover:to-blue-500 hover:scale-105 transition-all duration-300"
              >
                See my work →
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default About;