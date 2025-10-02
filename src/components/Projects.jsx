import React, { useRef } from "react";
import {
  Smartphone,
  QrCode,
  Database,
  MessageSquare,
  UserPlus,
} from "lucide-react"; // icons

function Projects() {
  const projects = [
    {
      title: "QR Scanner Mobile App",
      tech: "Android, Flutter, REST API",
      description:
        "QR scanner app for manual invoice validation with backend API integration.",
      highlights: [
        "Scans QR codes to fetch and validate invoice details",
        "Implemented camera handling and permission flows",
        "Integrated secure REST endpoints for validation",
      ],
      icon: <QrCode className="w-8 h-8 text-blue-500 animate-float-rotate transition-transform duration-300" />,
    },
    {
      title: "TIN Validator Mobile app (SIGTAS Integration)",
      tech: "Android(Java), SIGTAS API",
      description:
        "Tax Identification Number validator integrated with SIGTAS systems.",
      highlights: [
        "Validated TINs via SIGTAS APIs with proper error handling",
        "Added request signing/auth and input normalization",
        "Provided status dashboards and audit logs",
      ],
      icon: <Database className="w-8 h-8 text-purple-500 animate-float-rotate transition-transform duration-300" />,
    },
    {
      title: "Chat Messaging App",
      tech: "Android, Firebase (Auth, Firestore, FCM)",
      description:
        "Realtime chat application with Firebase backend services.",
      highlights: [
        "User auth with Firebase Authentication",
        "Realtime messaging via Firestore and push via FCM",
        "Typing indicators, read receipts, and media upload",
      ],
      icon: <MessageSquare className="w-8 h-8 text-green-500 animate-float-rotate transition-transform duration-300" />,
    },
    {
      title: "User Registration System",
      tech: "Android, Firebase Authentication",
      description:
        "Signup/sign-in flows with secure session handling and profile storage.",
      highlights: [
        "Email/password and social providers",
        "Form validation and password reset",
        "Protected routes and persistent sessions",
      ],
      icon: <UserPlus className="w-8 h-8 text-pink-500 animate-float-rotate transition-transform duration-300" />,
    },
  ];

  // tilt handler
  const handleMouseMove = (e, cardRef) => {
    const card = cardRef.current;
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

  const handleMouseLeave = (cardRef) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <section className="px-6 py-12 max-w-6xl mx-auto" id="projects">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
        My Projects
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const cardRef = useRef(null);

          return (
            <article
              key={p.title}
              ref={cardRef}
              onMouseMove={(e) => handleMouseMove(e, cardRef)}
              onMouseLeave={() => handleMouseLeave(cardRef)}
              className="group relative rounded-2xl border border-gray-200 bg-white shadow-md p-6 
                         transition-all duration-500 ease-out 
                         hover:shadow-2xl hover:border-transparent 
                         hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 
                         transform-gpu will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-gray-100 shadow-md">
                  {p.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">
                  {p.title}
                </h3>
              </div>

              {/* Tech Badge */}
              <span className="inline-block mb-3 text-xs px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md">
                {p.tech}
              </span>

              {/* Description */}
              <p className="text-gray-700 mb-4">{p.description}</p>

              {/* Highlights */}
              <ul className="space-y-2 text-gray-700">
                {p.highlights.map((h, idx) => (
                  <li
                    key={h}
                    className={`flex items-start gap-2 transform transition-all duration-500 
                               group-hover:translate-x-2 group-hover:text-blue-800 delay-[${idx * 100}ms]`}
                  >
                    <span className="text-blue-500">✔</span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-100 to-purple-100 blur-lg -z-10"></div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
