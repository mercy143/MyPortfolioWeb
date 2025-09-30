import React, { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Projects from "./components/Projects";
import About from "./components/About";
import Skill from "./components/Skill";
import Journey from "./components/Journey";
import Hobby from "./components/Hobby";
import Motivations from "./components/Motivations";
import Contact from "./components/Contact";

function App() {
  const sections = [
    { id: "home", component: <Home /> },
    { id: "projects", component: <Projects /> },
    { id: "about", component: <About /> },
    { id: "skill", component: <Skill /> },
    { id: "journey", component: <Journey /> },
    { id: "hobby", component: <Hobby /> },
    { id: "motivations", component: <Motivations /> },
    { id: "contact", component: <Contact /> },
  ];

  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target);
            // Apply staggered delay based on section index
            entry.target.style.transitionDelay = `${index * 0.2}s`;
            entry.target.classList.add("slide-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App scroll-smooth bg-gray-50">
      <Navbar />
      <main>
        {sections.map((section, idx) => (
          <section
            key={idx}
            id={section.id}
            ref={(el) => (sectionRefs.current[idx] = el)}
            className="opacity-0 transform translate-y-10 transition-all duration-700 hover:scale-105 hover:shadow-lg hover:bg-gray-50"
          >
            {section.component}
          </section>
        ))}
      </main>
      <Footer />

      <style>
        {`
          .slide-fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}
      </style>
    </div>
  );
}

export default App;
