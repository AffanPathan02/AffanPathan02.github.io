import anime from "animejs/lib/anime.es.js";
import { useEffect, useRef } from "react";
import "../../styles/SectionContent.css";

const ProjectsSection = ({ isActive }) => {
  const sectionRef = useRef(null);

  const projects = [
    {
      title: "Crystal Viewer",
      description:
        "A scrying tool that reveals dynamic visualizations of complex data patterns.",
      tags: ["React", "D3.js", "API Integration"],
      icon: "💎",
    },
    {
      title: "Shadow Messenger",
      description:
        "A secure communication artifact that whispers messages across the digital realm.",
      tags: ["Node.js", "WebSockets", "Encryption"],
      icon: "🔮",
    },
    {
      title: "Elemental Gallery",
      description:
        "A magical collection that transforms and displays visual enchantments.",
      tags: ["React", "Animation", "CSS Sorcery"],
      icon: "✨",
    },
    {
      title: "Runic Compiler",
      description:
        "Translates ancient runes into powerful machine incantations.",
      tags: ["TypeScript", "WebAssembly", "Algorithms"],
      icon: "⚗️",
    },
  ];

  useEffect(() => {
    if (isActive && sectionRef.current) {
      // Animate the section entrance
      anime({
        targets: ".section-header",
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 800,
        easing: "easeOutExpo",
      });

      // Animate the projects
      anime({
        targets: ".project-card",
        scale: [0.9, 1],
        opacity: [0, 1],
        delay: anime.stagger(150),
        duration: 800,
        easing: "easeOutElastic(1, .6)",
      });

      // Animate the project icons
      anime({
        targets: ".project-icon",
        rotate: [0, 360],
        scale: [0.5, 1],
        opacity: [0, 1],
        delay: anime.stagger(200, { start: 300 }),
        duration: 1200,
        easing: "easeOutElastic(1, .5)",
      });
    }
  }, [isActive]);

  return (
    <div className="section-content" ref={sectionRef}>
      <div className="section-header">
        <h2 className="mystical-title">Ancient Artifacts</h2>
        <p className="mystical-subtitle">
          Powerful creations born from arcane knowledge and countless hours of
          magical crafting.
        </p>
      </div>

      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-icon">{project.icon}</div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
            <button className="mystical-button">Examine Artifact</button>
          </div>
        ))}
      </div>

      <div className="mystical-quote">
        "Every artifact has a story, a purpose, and a piece of its creator's
        soul."
      </div>
    </div>
  );
};

export default ProjectsSection;
