import React, { createContext, useContext, useEffect, useState } from "react";
import { portfolioData as localData, portfolioAssets } from "../data/portfolio";

const PortfolioContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(localData);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("local");

  useEffect(() => {
    let cancelled = false;

    async function loadPortfolio() {
      try {
        const response = await fetch(`${API_URL}/api/portfolio`);
        if (!response.ok) throw new Error("Failed to fetch portfolio");

        const apiData = await response.json();
        if (!cancelled) {
          setData(apiData);
          setSource("api");
        }
      } catch {
        if (!cancelled) {
          setData(localData);
          setSource("local");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPortfolio();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, assets: portfolioAssets, loading, source }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
}

export function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "smooth" });
}
