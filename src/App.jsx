import React from "react";
import { PortfolioProvider } from "./context/PortfolioContext";
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
    <PortfolioProvider>
      <div className="App">
        <Navbar />
        <main className="scroll-smooth">
          <section id="home">
            <Home />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="about">
            <About />
          </section>
          
          <section id="journey">
            <Journey />
          </section>
          <section id="skill">
            <Skill />
          </section>
          <section id="hobby">
            <Hobby />
          </section>
          <section id="motivations">
            <Motivations />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  );
}

export default App;
