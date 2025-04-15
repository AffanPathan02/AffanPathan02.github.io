import anime from "animejs/lib/anime.es.js";
import { useEffect, useRef, useState } from "react";
import "../styles/GameWorld.css";

const GameWorld = ({ onSectionSelect }) => {
  const [activeSection, setActiveSection] = useState(null);
  const worldRef = useRef(null);
  const sectionsRef = useRef({});

  const sections = [
    { id: "skills", title: "The Forge", color: "#64dfdf" },
    { id: "projects", title: "Ancient Artifacts", color: "#ff9a8c" },
    { id: "about", title: "The Oracle", color: "#9896f1" },
    { id: "contact", title: "Portal Nexus", color: "#4cc9f0" },
  ];

  // Initial animation for sections
  useEffect(() => {
    if (worldRef.current) {
      anime
        .timeline({
          easing: "easeOutExpo",
          delay: 500,
        })
        .add({
          targets: worldRef.current,
          opacity: [0, 1],
          duration: 800,
        })
        .add({
          targets: ".world-section",
          translateY: [50, 0],
          opacity: [0, 1],
          duration: 800,
          delay: anime.stagger(150),
        });

      // Add hover effect for all sections
      anime({
        targets: ".section-icon",
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
        duration: 3000,
        loop: true,
        easing: "easeInOutQuad",
        delay: anime.stagger(500),
      });
    }
  }, []);

  // Handle section hover effects
  const handleSectionHover = (sectionId) => {
    if (sectionsRef.current[sectionId]) {
      anime({
        targets: sectionsRef.current[sectionId],
        scale: 1.05,
        boxShadow: [
          "0 5px 15px rgba(0, 0, 0, 0.1)",
          "0 15px 25px rgba(0, 0, 0, 0.3)",
        ],
        duration: 300,
        easing: "easeOutQuad",
      });

      // Animate the section icon
      anime({
        targets: `#section-${sectionId} .section-icon`,
        scale: 1.2,
        rotate: 10,
        duration: 300,
        easing: "easeOutBack",
      });
    }
  };

  const handleSectionLeave = (sectionId) => {
    if (sectionsRef.current[sectionId] && activeSection !== sectionId) {
      anime({
        targets: sectionsRef.current[sectionId],
        scale: 1,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        duration: 400,
        easing: "easeOutQuad",
      });

      // Reset the section icon
      anime({
        targets: `#section-${sectionId} .section-icon`,
        scale: 1,
        rotate: 0,
        duration: 300,
        easing: "easeOutQuad",
      });
    }
  };

  // Handle section selection
  const handleSectionClick = (sectionId) => {
    // Don't reselect the same section
    if (activeSection === sectionId) return;

    setActiveSection(sectionId);

    // Reset all sections
    Object.keys(sectionsRef.current).forEach((key) => {
      if (key !== sectionId && sectionsRef.current[key]) {
        anime({
          targets: sectionsRef.current[key],
          scale: 0.95,
          opacity: 0.7,
          duration: 400,
          easing: "easeOutQuad",
        });
      }
    });

    // Animate the selected section
    if (sectionsRef.current[sectionId]) {
      const timeline = anime.timeline({
        easing: "easeOutElastic(1, .6)",
      });

      timeline
        .add({
          targets: sectionsRef.current[sectionId],
          scale: [1, 1.2, 1.05],
          opacity: 1,
          boxShadow: [
            "0 5px 15px rgba(0, 0, 0, 0.1)",
            "0 25px 50px rgba(0, 0, 0, 0.3)",
            "0 15px 30px rgba(0, 0, 0, 0.2)",
          ],
          borderLeftWidth: [5, 10],
          duration: 800,
        })
        .add(
          {
            targets: `#section-${sectionId} .section-content h2`,
            scale: [1, 1.2, 1],
            color: [
              "#fff",
              sections.find((s) => s.id === sectionId).color,
              "#fff",
            ],
            textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
            duration: 800,
          },
          "-=600"
        )
        .add(
          {
            targets: `#section-${sectionId} .section-icon`,
            scale: [1, 1.5, 1.2],
            rotate: 360,
            duration: 800,
          },
          "-=800"
        );
    }

    // Notify parent component
    if (onSectionSelect) {
      onSectionSelect(sectionId);

      // After a bit, reset non-selected sections for a cleaner UI
      setTimeout(() => {
        Object.keys(sectionsRef.current).forEach((key) => {
          if (key !== sectionId && sectionsRef.current[key]) {
            anime({
              targets: sectionsRef.current[key],
              scale: 1,
              opacity: 1,
              duration: 400,
              easing: "easeOutQuad",
            });
          }
        });
      }, 2000);
    }
  };

  return (
    <div className="game-world" ref={worldRef}>
      {sections.map((section) => (
        <div
          id={`section-${section.id}`}
          key={section.id}
          className={`world-section section-${section.id} ${
            activeSection === section.id ? "active" : ""
          }`}
          style={{ "--section-color": section.color }}
          onMouseEnter={() => handleSectionHover(section.id)}
          onMouseLeave={() => handleSectionLeave(section.id)}
          onClick={() => handleSectionClick(section.id)}
          ref={(el) => (sectionsRef.current[section.id] = el)}
        >
          <div className="section-content">
            <h2>{section.title}</h2>
            <div className="section-icon"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameWorld;
