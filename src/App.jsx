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

          <section id="projects">
            <Projects />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="skill">
            <Skill />
          </section>

          <section id="journey">
            <Journey />
          </section>

          <section id="hobby">
            <Hobby />
          </section>

          <section id="motivations">
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
