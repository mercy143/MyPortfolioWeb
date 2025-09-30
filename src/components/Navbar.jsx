import React from "react";
import profileImg from "../assets/photo.png";

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("home");

  const base =
    "px-3 py-2 rounded transition-colors duration-200 cursor-pointer";

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Projects", id: "projects" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skill" },
    { name: "Journey", id: "journey" },
    { name: "Hobby", id: "hobby" },
    { name: "Motivations", id: "motivations" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActive(id);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-gray-900/70 bg-gray-900/90 text-white border-b border-white/10 shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Name */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <img
            src={profileImg}
            alt="Profile"
            className="w-9 h-9 rounded-full ring-2 ring-blue-500 object-cover"
          />
          <span className="font-bold text-lg hover:text-blue-400">
            Guash Berhe
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h18M3 12h18M3 18h18"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          {navItems.map((item) => (
            <span
              key={item.id}
              className={`${base} ${
                active === item.id
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400"
                  : "hover:text-blue-300"
              }`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.name}
            </span>
          ))}
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-gray-900/95 text-white animate-slideDown">
          {navItems.map((item) => (
            <span
              key={item.id}
              className={`${base} block ${
                active === item.id
                  ? "text-blue-400 font-semibold"
                  : "hover:text-blue-300"
              }`}
              onClick={() => {
                scrollToSection(item.id);
                setOpen(false);
              }}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
