import React from "react";
import { FaTelegramPlane, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { name: "Telegram", url: "https://t.me/@zeberling", icon: <FaTelegramPlane />, color: "text-sky-600 hover:text-sky-400" },
    { name: "YouTube", url: "https://www.youtube.com/@Amerawi", icon: <FaYoutube />, color: "text-red-600 hover:text-red-400" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/guashberheambera", icon: <FaLinkedin />, color: "text-blue-700 hover:text-blue-400" },
    { name: "GitHub", url: "https://github.com/mercy143", icon: <FaGithub />, color: "text-gray-900 hover:text-gray-600" },
  ];

  return (
    <footer className="mt-16 border-t bg-white/80 backdrop-blur py-6 animate-fadeIn">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-700">
        <p>© {year} Guash Berhe. All rights reserved.</p>
        <div className="flex gap-4">
          {socials.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1 transition transform hover:scale-110 ${social.color}`}
              aria-label={social.name}
            >
              {social.icon}
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Animation CSS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease forwards;
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;



