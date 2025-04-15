import anime from "animejs/lib/anime.es.js";
import { useEffect, useRef } from "react";
import "../../styles/SectionContent.css";

const SkillsSection = ({ isActive }) => {
  const sectionRef = useRef(null);

  const skills = [
    { name: "HTML/CSS", level: 90, category: "Elemental Weaving", icon: "🌋" },
    { name: "JavaScript", level: 85, category: "Arcane Scripts", icon: "⚡" },
    { name: "React", level: 80, category: "Mystical Constructs", icon: "🔮" },
    { name: "Node.js", level: 75, category: "Shadowy Backend", icon: "🌑" },
    {
      name: "UI/UX Design",
      level: 85,
      category: "Illusion Crafting",
      icon: "✨",
    },
    {
      name: "Animation",
      level: 88,
      category: "Motion Enchantment",
      icon: "💫",
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

      // Animate the skills
      anime({
        targets: ".skill-item",
        opacity: [0, 1],
        translateX: [-30, 0],
        delay: anime.stagger(100),
        duration: 800,
        easing: "easeOutQuad",
      });

      // Animate skill levels
      anime({
        targets: ".skill-level-fill",
        width: (el) => {
          return el.getAttribute("data-level") + "%";
        },
        delay: anime.stagger(150, { start: 300 }),
        duration: 1200,
        easing: "easeInOutQuart",
      });
    }
  }, [isActive]);

  return (
    <div className="section-content" ref={sectionRef}>
      <div className="section-header">
        <h2 className="mystical-title">The Forge</h2>
        <p className="mystical-subtitle">
          Where raw potential is tempered into mastery through the fires of
          experience and dedication.
        </p>
      </div>

      <div className="skills-container">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-info">
              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-category">{skill.category}</p>
              <div className="skill-level">
                <div
                  className="skill-level-fill"
                  data-level={skill.level}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mystical-quote">
        "The mightiest spells begin with the simplest incantations."
      </div>
    </div>
  );
};

export default SkillsSection;
