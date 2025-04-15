import anime from "animejs/lib/anime.es.js";
import { useEffect, useRef, useState } from "react";
import "../styles/GameCharacter.css";

const GameCharacter = ({ isActive, position, isFollowingCursor = false }) => {
  const characterRef = useRef(null);
  const [isJumping, setIsJumping] = useState(false);
  const [movementTimeline, setMovementTimeline] = useState(null);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  // Initialize character animation
  useEffect(() => {
    if (isActive && characterRef.current) {
      // Initial entry animation
      const timeline = anime.timeline({
        easing: "easeOutElastic(1, .6)",
      });

      timeline
        .add({
          targets: characterRef.current,
          translateY: [100, 0],
          opacity: [0, 1],
          scale: [0.6, 1],
          rotate: [20, 0],
          duration: 1200,
        })
        .add(
          {
            targets: ".character-head, .character-body",
            translateY: [10, 0],
            duration: 400,
            delay: anime.stagger(100),
          },
          "-=600"
        )
        .add(
          {
            targets: ".character-shadow",
            scale: [0.5, 1],
            opacity: [0, 0.2],
            duration: 600,
          },
          "-=800"
        );
    }
  }, [isActive]);

  // Movement animation based on position changes
  useEffect(() => {
    if (characterRef.current && position && isActive) {
      // Calculate velocity
      const dx = position.x - lastPosition.x;
      const dy = position.y - lastPosition.y;

      // Only update velocity if there's significant movement
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        setVelocity({ x: dx, y: dy });
      }

      // Update last position
      setLastPosition(position);

      // Stop any existing timeline
      if (movementTimeline) {
        movementTimeline.pause();
      }

      // Different animation for cursor following vs section movement
      if (isFollowingCursor) {
        // Smoother cursor following animation
        const timeline = anime({
          targets: characterRef.current,
          translateX: position.x,
          translateY: position.y,
          duration: 300,
          easing: "spring(1, 80, 10, 0)",
          update: function (anim) {
            // Add tilt based on velocity when following cursor
            if (characterRef.current && velocity.x !== 0) {
              // Limit tilt angle
              const maxTilt = 15;
              const tiltX = Math.max(
                -maxTilt,
                Math.min(maxTilt, velocity.x * 2)
              );

              characterRef.current.style.rotate = `${tiltX}deg`;

              // Add running animation if moving fast enough
              if (Math.abs(velocity.x) > 5 || Math.abs(velocity.y) > 5) {
                characterRef.current.classList.add("character-run");
              } else {
                characterRef.current.classList.remove("character-run");
              }
            }
          },
        });

        setMovementTimeline(timeline);
      } else {
        // Jump effect on position change for section selection
        setIsJumping(true);

        // Jump animation for section selection
        const timeline = anime.timeline({
          easing: "easeOutQuad",
        });

        timeline
          .add({
            targets: characterRef.current,
            translateY: -40,
            scale: 1.1,
            rotate: 0, // Reset rotation
            duration: 300,
          })
          .add({
            targets: characterRef.current,
            translateX: position.x,
            translateY: [
              characterRef.current.style.translateY || 0,
              position.y,
            ],
            scale: 1,
            duration: 700,
            easing: "easeOutQuint",
            complete: () => {
              // Land with a small bounce
              anime({
                targets: characterRef.current,
                translateY: [position.y - 10, position.y],
                duration: 200,
                easing: "easeOutBounce",
                complete: () => {
                  setIsJumping(false);

                  // Add a small dust effect on landing
                  anime({
                    targets: ".character-shadow",
                    scale: [1.5, 1],
                    opacity: [0.4, 0.2],
                    duration: 400,
                    easing: "easeOutQuad",
                  });
                },
              });
            },
          });

        setMovementTimeline(timeline);
      }
    }
  }, [position, isActive, isFollowingCursor]);

  // Handle idle animation when not moving
  useEffect(() => {
    if (isActive && characterRef.current && !isJumping && !isFollowingCursor) {
      const idleAnimation = anime({
        targets: characterRef.current,
        translateY: [0, -5, 0],
        duration: 2000,
        easing: "easeInOutQuad",
        loop: true,
        autoplay: true,
      });

      return () => idleAnimation.pause();
    }
  }, [isActive, isJumping, isFollowingCursor]);

  // Add a hover effect for shadow
  useEffect(() => {
    if (isActive && !isJumping) {
      anime({
        targets: ".character-shadow",
        scale: [1, 0.85, 1],
        opacity: [0.2, 0.15, 0.2],
        easing: "easeInOutSine",
        duration: 2000,
        loop: true,
      });
    }
  }, [isActive, isJumping]);

  return (
    <div
      className={`game-character ${isJumping ? "jumping" : ""} ${
        isFollowingCursor ? "following-cursor" : ""
      }`}
      ref={characterRef}
    >
      <div className="character-head"></div>
      <div className="character-body"></div>
      <div className="character-shadow"></div>
    </div>
  );
};

export default GameCharacter;
