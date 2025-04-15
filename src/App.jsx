import anime from "animejs/lib/anime.es.js";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import GameCharacter from "./components/GameCharacter";
import GameWorld from "./components/GameWorld";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isFollowingCursor, setIsFollowingCursor] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [introCopy, setIntroCopy] = useState("Yet another boring portfolio.");
  const introRef = useRef(null);
  const buttonRef = useRef(null);
  const gameContainerRef = useRef(null);
  const introTextRef = useRef(null);

  // Cinematic intro effect
  useEffect(() => {
    if (showIntro && introTextRef.current) {
      const firstPhrase = "Yet another boring portfolio.";
      const secondPhrase = "I wonder who is the poor fellow...";

      // Clear any existing text
      setIntroCopy("");

      // Type out first phrase with controlled timing
      let currentIndex = 0;
      const typeFirstPhrase = setInterval(() => {
        if (currentIndex < firstPhrase.length) {
          setIntroCopy((prev) => {
            // Return the full substring up to current index to prevent character duplication
            return firstPhrase.substring(0, currentIndex + 1);
          });
          currentIndex++;
        } else {
          clearInterval(typeFirstPhrase);

          // Pause before starting second phrase
          setTimeout(() => {
            // Clear the text before starting second phrase
            setIntroCopy("");

            // Type out second phrase
            let secondIndex = 0;
            const typeSecondPhrase = setInterval(() => {
              if (secondIndex < secondPhrase.length) {
                setIntroCopy((prev) => {
                  // Return the full substring up to current index to prevent character duplication
                  return secondPhrase.substring(0, secondIndex + 1);
                });
                secondIndex++;
              } else {
                clearInterval(typeSecondPhrase);

                // Fade out and proceed to actual intro
                setTimeout(() => {
                  anime({
                    targets: ".cinematic-intro",
                    opacity: 0,
                    duration: 1500,
                    easing: "easeOutQuad",
                    complete: () => {
                      setShowIntro(false);
                    },
                  });
                }, 2000);
              }
            }, 100); // Speed of typing for second phrase
          }, 1500); // Pause between phrases
        }
      }, 100); // Speed of typing for first phrase

      // Clean up intervals on component unmount
      return () => {
        clearInterval(typeFirstPhrase);
      };
    }
  }, [showIntro]);

  // Track cursor position
  useEffect(() => {
    if (gameStarted) {
      const handleMouseMove = (e) => {
        // Calculate position relative to the center of the screen
        const containerRect = gameContainerRef.current.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;

        const relativeX = e.clientX - containerRect.left - centerX;
        const relativeY = e.clientY - containerRect.top - centerY;

        // Limit the distance from center for smoother movement
        const maxDistance = 300;
        const distance = Math.sqrt(
          relativeX * relativeX + relativeY * relativeY
        );

        if (distance > maxDistance) {
          const ratio = maxDistance / distance;
          setCursorPosition({
            x: relativeX * ratio,
            y: relativeY * ratio,
          });
        } else {
          setCursorPosition({
            x: relativeX,
            y: relativeY,
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [gameStarted]);

  // Update character position based on cursor or section selection
  useEffect(() => {
    if (isFollowingCursor && gameStarted) {
      setCharacterPosition(cursorPosition);
    }
  }, [cursorPosition, isFollowingCursor, gameStarted]);

  // Initial load animations
  useEffect(() => {
    if (!gameStarted && introRef.current) {
      // Animate the intro elements
      anime
        .timeline({
          easing: "easeOutExpo",
        })
        .add({
          targets: ".game-header h1",
          opacity: [0, 1],
          translateY: [-50, 0],
          duration: 1200,
          delay: 300,
        })
        .add(
          {
            targets: introRef.current,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
          },
          "-=800"
        );

      // Let the CSS animations handle the text sequence
      // Add a subtle camera movement effect to the background
      anime({
        targets: ".game-intro",
        backgroundPosition: ["50% 50%", "51% 51%", "49% 49%", "50% 50%"],
        duration: 20000,
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true,
      });
    }
  }, [gameStarted]);

  // Start game animation
  useEffect(() => {
    if (gameStarted && gameContainerRef.current) {
      // Animation when game starts
      anime
        .timeline({
          easing: "easeOutExpo",
        })
        .add({
          targets: ".game-header h1",
          fontSize: ["3rem", "2.5rem"],
          letterSpacing: ["0px", "3px"],
          duration: 1000,
          delay: 300,
        })
        .add(
          {
            targets: gameContainerRef.current,
            opacity: [0, 1],
            duration: 800,
          },
          "-=500"
        );
    }
  }, [gameStarted]);

  // Handle section selection and character movement
  const handleSectionSelect = (sectionId) => {
    setActiveSection(sectionId);

    // Temporarily stop following cursor when a section is selected
    setIsFollowingCursor(false);

    // Move character to the selected section with adjusted positions
    const sectionPositions = {
      skills: { x: -180, y: -100 },
      projects: { x: 180, y: -100 },
      about: { x: -180, y: 120 },
      contact: { x: 180, y: 120 },
    };

    // Map section IDs to mythical titles
    const sectionTitles = {
      skills: "The Forge",
      projects: "Ancient Artifacts",
      about: "The Oracle",
      contact: "Portal Nexus",
    };

    setCharacterPosition(sectionPositions[sectionId]);

    // Animate the section detail
    anime({
      targets: ".section-detail",
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      easing: "easeOutQuad",
    });

    // Resume cursor following after a delay
    setTimeout(() => {
      setIsFollowingCursor(true);
    }, 2500);
  };

  // Render the active section component
  const renderActiveSection = () => {
    switch (activeSection) {
      case "skills":
        return <SkillsSection isActive={true} />;
      case "projects":
        return <ProjectsSection isActive={true} />;
      case "about":
        return <AboutSection isActive={true} />;
      case "contact":
        return <ContactSection isActive={true} />;
      default:
        return (
          <div className="section-detail">
            <h3>Select a realm to explore...</h3>
            <p className="section-lore">
              Move your character to one of the magical zones to discover more.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="portfolio-game">
      {showIntro ? (
        <div className="cinematic-intro">
          <div className="intro-text" ref={introTextRef}>
            {introCopy}
          </div>
        </div>
      ) : (
        <>
          <header className="game-header">
            <h1>Portfolio Adventure</h1>
          </header>

          {!gameStarted ? (
            <div className="game-intro" ref={introRef}>
              <h2 className="cinematic-subtitle">
                Ready to break the fourth wall?
              </h2>
              <div className="cinematic-text-sequence">
                <p className="intro-line intro-line-1">
                  This isn't just a portfolio.
                </p>
                <p className="intro-line intro-line-2">
                  It's an <span className="highlight-text">experience</span>.
                </p>
                <p className="intro-line intro-line-3">
                  Your choices shape the journey.
                </p>
              </div>
              <button
                className="start-button"
                ref={buttonRef}
                onClick={() => setGameStarted(true)}
              >
                Begin the Experience
              </button>
            </div>
          ) : (
            <div className="game-container" ref={gameContainerRef}>
              <div className="character-container">
                <GameCharacter
                  isActive={gameStarted}
                  position={characterPosition}
                  isFollowingCursor={isFollowingCursor}
                />
              </div>
              <GameWorld onSectionSelect={handleSectionSelect} />

              {activeSection && (
                <div className="section-content-container">
                  {renderActiveSection()}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
