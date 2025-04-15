import anime from "animejs/lib/anime.es.js";
import { useEffect, useRef, useState } from "react";
import "../../styles/SectionContent.css";

const ContactSection = ({ isActive }) => {
  const sectionRef = useRef(null);
  const [formState, setFormState] = useState({
    name: "",
    message: "",
    realm: "digital",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const contactPortals = [
    {
      name: "Ethereal Mail",
      icon: "✉️",
      desc: "Send a scroll through the ethereal planes",
      link: "mailto:example@realm.com",
    },
    {
      name: "Crystal Sphere",
      icon: "🔮",
      desc: "Commune through the LinkedIn crystal sphere",
      link: "https://linkedin.com/in/yourprofile",
    },
    {
      name: "Shadow Network",
      icon: "🦉",
      desc: "Find me in the Twitter shadow realm",
      link: "https://twitter.com/yourhandle",
    },
    {
      name: "Code Repository",
      icon: "📚",
      desc: "Examine my spellbook of code incantations",
      link: "https://github.com/yourusername",
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

      // Animate the contact portals
      anime({
        targets: ".portal-item",
        scale: [0.9, 1],
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(150),
        duration: 800,
        easing: "easeOutElastic(1, .6)",
      });

      // Animate the form
      anime({
        targets: ".contact-form",
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 800,
        easing: "easeOutQuad",
      });

      // Animate the portal icons pulsing
      anime({
        targets: ".portal-icon",
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
        easing: "easeInOutSine",
        duration: 3000,
        loop: true,
        delay: anime.stagger(500),
      });
    }
  }, [isActive]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Animate the form submission
    anime({
      targets: ".contact-form",
      scale: [1, 0.95, 1.02, 1],
      duration: 800,
      easing: "easeInOutElastic",
      complete: () => {
        // Reset form and show success message
        setFormSubmitted(true);

        // Success message animation
        anime({
          targets: ".form-success",
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 600,
          easing: "easeOutElastic(1, .6)",
        });
      },
    });
  };

  return (
    <div className="section-content" ref={sectionRef}>
      <div className="section-header">
        <h2 className="mystical-title">Portal Nexus</h2>
        <p className="mystical-subtitle">
          Establish a magical connection across the realms to communicate with
          the creator of these enchantments.
        </p>
      </div>

      <div className="contact-container">
        <div className="portal-container">
          <h3 className="portal-title">Communication Portals</h3>
          <div className="portals-grid">
            {contactPortals.map((portal, index) => (
              <a
                key={index}
                href={portal.link}
                className="portal-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="portal-icon">{portal.icon}</div>
                <h4 className="portal-name">{portal.name}</h4>
                <p className="portal-desc">{portal.desc}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="contact-form-container">
          {!formSubmitted ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3 className="form-title">Send a Magical Message</h3>

              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Enter your name, traveler"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Realm</label>
                <select
                  name="realm"
                  className="form-select"
                  value={formState.realm}
                  onChange={handleInputChange}
                >
                  <option value="digital">Digital Realm</option>
                  <option value="creative">Creative Dimension</option>
                  <option value="business">Business Kingdom</option>
                  <option value="academia">Academia Archives</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Your Message</label>
                <textarea
                  name="message"
                  className="form-textarea"
                  placeholder="Write your magical message here..."
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="mystical-button">
                Cast Message
              </button>
            </form>
          ) : (
            <div className="form-success">
              <div className="success-icon">✨</div>
              <h3 className="success-title">Message Successfully Cast!</h3>
              <p className="success-message">
                Your magical message has been sent across the realms. Expect a
                response when the stars align.
              </p>
              <button
                className="mystical-button secondary"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormState({ name: "", message: "", realm: "digital" });
                }}
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mystical-quote">
        "The strongest connections transcend distance and time."
      </div>
    </div>
  );
};

export default ContactSection;
