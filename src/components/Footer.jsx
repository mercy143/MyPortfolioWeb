import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

function Footer() {
  const { data } = usePortfolio();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-700">
        <p>© {year} {data.profile.shortName}. All rights reserved.</p>
        <div className="flex gap-4">
          {data.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className={social.hoverColor}
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
