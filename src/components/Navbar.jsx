import React from "react";
import { usePortfolio, scrollToSection } from "../context/PortfolioContext";

function Navbar() {
  const { data, assets } = usePortfolio();
  const [open, setOpen] = React.useState(false);

  const handleNavClick = (id) => {
    scrollToSection(id);
    setOpen(false);
  };

  const linkClass =
    "block px-3 py-2 rounded hover:text-blue-400 cursor-pointer transition-colors";

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-gray-900/70 bg-gray-900/90 text-white border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3"
        >
          <img
            src={assets.navbarProfileImg}
            alt="Profile"
            className="w-9 h-9 rounded-full ring-2 ring-blue-500 object-cover"
          />
          <span className="font-bold">{data.profile.shortName}</span>
        </button>

        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {data.nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={linkClass}
            >
              {item.name}
            </button>
          ))}
        </div>
      </nav>

      {open && (
        <div className="md:hidden px-4 pb-3 space-y-3">
          <div className="flex items-center gap-3 pt-1">
            <img src={assets.navbarProfileImg} alt="Profile" className="w-9 h-9 rounded-full ring-2 ring-blue-500 object-cover" />
            <span className="font-medium">{data.profile.shortName}</span>
          </div>
          <div className="space-y-1">
            {data.nav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={linkClass}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
