import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Projects from "./components/Projects";
import About from "./components/About";
import Skill from "./components/Skill";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Hobby from "./components/Hobby";
import Motivations from "./components/Motivations";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="scroll-smooth">
          <section id="home" className="transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 duration-300">
            <Home />
          </section>

          <section id="projects" className="transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 duration-300">
            <Projects />
          </section>

          <section id="about" className="transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 duration-300">
            <About />
          </section>

          <section id="skill" className="transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 duration-300">
            <Skill />
          </section>

          <section id="journey" className="transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 duration-300">
            <Journey />
          </section>

          <section id=" My hobby" className="transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 duration-300">
            <Hobby />
          </section>

          <section id="motivations" className="transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 duration-300">
            <Motivations />
          </section>

          <section id="contact" className="transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-50 duration-300">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
