import React from "react";
import { FaTelegramPlane, FaYoutube, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  const socials = [
    {
      name: "Telegram",
      url: "https://t.me/@zeberling",
      icon: <FaTelegramPlane size={20} />,
      bgHover: "hover:bg-sky-50 hover:border-sky-200 text-sky-600",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@Amerawi",
      icon: <FaYoutube size={20} />,
      bgHover: "hover:bg-red-50 hover:border-red-200 text-red-600",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/guashberheambera",
      icon: <FaLinkedin size={20} />,
      bgHover: "hover:bg-blue-50 hover:border-blue-200 text-blue-700",
    },
    {
      name: "GitHub",
      url: "https://github.com/mercy143",
      icon: <FaGithub size={20} />,
      bgHover: "hover:bg-gray-50 hover:border-gray-200 text-gray-900",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-20">
      <div className="max-w-xl w-full p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Contact Me</h2>

        {/* Contact Info */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-blue-50 transition cursor-pointer">
            <FaEnvelope className="text-blue-600" />
            <a href="mailto:guashberhe2019@gmail.com" className="text-gray-800 font-medium underline">
              guashberhe2019@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-green-50 transition cursor-pointer">
            <FaPhone className="text-green-600" />
            <a href="tel:+251932330844" className="text-gray-800 font-medium underline">
              +251932330844
            </a>
          </div>
          <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-yellow-50 transition cursor-pointer">
            <FaMapMarkerAlt className="text-yellow-600" />
            <span className="text-gray-800 font-medium">Ministry of Revenue, Ethiopia</span>
          </div>
        </div>

        {/* Socials */}
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Socials</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {socials.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border bg-white transition transform hover:scale-110 hover:-translate-y-1 ${social.bgHover}`}
              aria-label={social.name}
            >
              {social.icon}
              <span>{social.name}</span>
            </a>
          ))}
        </div>

        {/* Optional: Smooth hover animation */}
        <style>
          {`
            .hover\\:-translate-y-1 {
              transition: transform 0.3s ease;
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default Contact;
