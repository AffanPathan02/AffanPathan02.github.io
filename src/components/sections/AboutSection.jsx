import anime from "animejs/lib/anime.es.js";
import { useEffect, useRef } from "react";
import "../../styles/SectionContent.css";

const AboutSection = ({ isActive }) => {
  const sectionRef = useRef(null);

  // Character traits presented as magical attributes
  const traits = [
    { name: "Creativity", value: 90, element: "Fire" },
    { name: "Problem Solving", value: 85, element: "Earth" },
    { name: "Communication", value: 80, element: "Air" },
    { name: "Adaptability", value: 95, element: "Water" },
    { name: "Leadership", value: 75, element: "Spirit" },
  ];

  // Journey stages as a mystical timeline
  const journeyStages = [
    {
      period: "The Awakening",
      year: "2015-2018",
      description:
        "Discovered the secrets of code and began studying the ancient texts of programming.",
      icon: "🌅",
    },
    {
      period: "The Apprenticeship",
      year: "2018-2020",
      description:
        "Trained under the guidance of master craftsmen, learning to forge simple but powerful artifacts.",
      icon: "⚒️",
    },
    {
      period: "The Wanderer",
      year: "2020-2022",
      description:
        "Ventured across different realms, gathering knowledge and facing challenges to enhance my craft.",
      icon: "🧭",
    },
    {
      period: "The Conjurer",
      year: "2022-Present",
      description:
        "Mastered the art of creating complex enchantments and sharing wisdom with fellow seekers.",
      icon: "✨",
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

      // Animate the traits chart
      anime({
        targets: ".trait-fill",
        width: (el) => {
          return el.getAttribute("data-value") + "%";
        },
        delay: anime.stagger(100),
        duration: 1200,
        easing: "easeInOutQuart",
      });

      // Animate the journey timeline
      anime({
        targets: ".journey-item",
        opacity: [0, 1],
        translateX: [-50, 0],
        delay: anime.stagger(200),
        duration: 800,
        easing: "easeOutQuad",
      });

      // Animate the portrait
      anime({
        targets: ".oracle-portrait",
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: "easeOutElastic(1, .5)",
      });
    }
  }, [isActive]);

  return (
    <div className="section-content" ref={sectionRef}>
      <div className="section-header">
        <h2 className="mystical-title">The Oracle</h2>
        <p className="mystical-subtitle">
          Gaze into the crystal and discover the essence of the one who wields
          this magic.
        </p>
      </div>

      <div className="oracle-container">
        <div className="oracle-portrait">
          {/* Replace with actual image in production */}
          <div className="portrait-placeholder">
            <span className="portrait-icon">👤</span>
          </div>
          <div className="oracle-name">Arcanist Exemplar</div>
        </div>

        <div className="oracle-traits">
          <h3 className="traits-title">Mystical Attributes</h3>
          {traits.map((trait, index) => (
            <div key={index} className="trait-item">
              <div className="trait-header">
                <span className="trait-name">{trait.name}</span>
                <span className="trait-element">{trait.element}</span>
              </div>
              <div className="trait-bar">
                <div
                  className="trait-fill"
                  data-value={trait.value}
                  style={{ backgroundColor: getElementColor(trait.element) }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="oracle-journey">
        <h3 className="journey-title">The Arcane Journey</h3>
        <div className="journey-timeline">
          {journeyStages.map((stage, index) => (
            <div key={index} className="journey-item">
              <div className="journey-icon">{stage.icon}</div>
              <div className="journey-content">
                <h4 className="journey-period">
                  {stage.period}{" "}
                  <span className="journey-year">{stage.year}</span>
                </h4>
                <p className="journey-description">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mystical-quote">
        "To know oneself is to hold the key to all magical mysteries."
      </div>
    </div>
  );
};

// Helper function to get color based on element
function getElementColor(element) {
  const colors = {
    Fire: "#e63946",
    Earth: "#588157",
    Air: "#90e0ef",
    Water: "#1d3557",
    Spirit: "#c77dff",
  };
  return colors[element] || "#cccccc";
}

export default AboutSection;
