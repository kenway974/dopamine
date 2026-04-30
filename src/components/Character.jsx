import React, { useEffect, useRef } from 'react';

const FACES = {
  EUPHORIC: '◉ᗜ◉',
  HAPPY: '◠‿◠',
  NEUTRAL: '– ‿ –',
  LOW: '◟◞',
  CRASHED: 'x_x',
};

const Character = ({ mood, dopamine, wobbleIntensity, glowColor, isPeaking, isCrashing }) => {
  const charRef = useRef(null);
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const animate = (t) => {
      timeRef.current = t;
      if (charRef.current) {
        const wobble = Math.sin(t * 0.003 * wobbleIntensity) * wobbleIntensity * 2;
        const bounce = isPeaking ? Math.abs(Math.sin(t * 0.008)) * 8 : 0;
        const shake = isCrashing ? (Math.random() - 0.5) * 2 : 0;
        charRef.current.style.transform = `translateY(${-bounce + shake}px) rotate(${wobble}deg)`;
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [wobbleIntensity, isPeaking, isCrashing]);

  const size = 60 + (dopamine / 100) * 40;
  const opacity = 0.4 + (dopamine / 100) * 0.6;

  return (
    <div className="character-wrapper">
      <div
        className="character-glow"
        style={{
          width: size * 1.8,
          height: size * 1.8,
          background: `radial-gradient(circle, ${glowColor}44 0%, transparent 70%)`,
          opacity,
        }}
      />
      <div
        ref={charRef}
        className={`character mood-${mood.toLowerCase()}`}
        style={{
          fontSize: `${size * 0.5}px`,
          '--glow': glowColor,
          filter: `drop-shadow(0 0 ${dopamine / 10}px ${glowColor})`,
        }}
      >
        <div className="char-body">
          <div className="char-face">{FACES[mood] || '– ‿ –'}</div>
          <div className="char-orb" style={{ background: glowColor }} />
        </div>
      </div>
      {isPeaking && (
        <div className="sparkles">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="sparkle" style={{ '--i': i }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Character;