export const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export const easeInQuad = (t) => t * t;

export const easeOutElastic = (t) => {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

export const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

export const lerp = (a, b, t) => a + (b - a) * t;

export const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

export const inverseLerp = (a, b, v) => clamp((v - a) / (b - a), 0, 1);