type PetalConfig = {
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: "#FBE8E7" | "#F7D9D7" | "#EFC3C8";
  opacity: number;
  rotate: number;
};

type SparkleConfig = {
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

const petals: PetalConfig[] = [
  { top: "32%", left: "8%", size: 22, duration: 22, delay: 0, color: "#FBE8E7", opacity: 0.14, rotate: -18 },
  { top: "38%", left: "90%", size: 16, duration: 18, delay: -5, color: "#F7D9D7", opacity: 0.11, rotate: 12 },
  { top: "48%", left: "5%", size: 28, duration: 25, delay: -9, color: "#EFC3C8", opacity: 0.1, rotate: -8 },
  { top: "56%", left: "86%", size: 14, duration: 15, delay: -3, color: "#FBE8E7", opacity: 0.16, rotate: 20 },
  { top: "68%", left: "16%", size: 20, duration: 20, delay: -12, color: "#F7D9D7", opacity: 0.12, rotate: -14 },
  { top: "78%", left: "72%", size: 24, duration: 23, delay: -15, color: "#EFC3C8", opacity: 0.13, rotate: -22 },
];

const sparkles: SparkleConfig[] = [
  { top: "12%", left: "58%", size: 4, duration: 9, delay: 0, opacity: 0.08 },
  { top: "28%", left: "28%", size: 3, duration: 11, delay: -4, opacity: 0.06 },
  { top: "44%", left: "68%", size: 5, duration: 13, delay: -2, opacity: 0.1 },
  { top: "58%", left: "38%", size: 3, duration: 10, delay: -6, opacity: 0.07 },
  { top: "71%", left: "84%", size: 4, duration: 12, delay: -8, opacity: 0.09 },
  { top: "82%", left: "54%", size: 3, duration: 8, delay: -3, opacity: 0.05 },
];

export function LuxuryAtmosphere() {
  return (
    <div className="luxury-atmosphere" aria-hidden="true">
      {petals.map((petal, i) => (
        <span
          key={`petal-${i}`}
          className="luxury-sakura-petal"
          style={{
            top: petal.top,
            left: petal.left,
            width: `${petal.size}px`,
            height: `${petal.size * 1.12}px`,
            backgroundColor: petal.color,
            opacity: petal.opacity,
            ["--luxury-duration" as string]: `${petal.duration}s`,
            ["--luxury-delay" as string]: `${petal.delay}s`,
            ["--luxury-rotate" as string]: `${petal.rotate}deg`,
          }}
        />
      ))}

      {sparkles.map((sparkle, i) => (
        <span
          key={`sparkle-${i}`}
          className="luxury-sparkle"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            ["--luxury-duration" as string]: `${sparkle.duration}s`,
            ["--luxury-delay" as string]: `${sparkle.delay}s`,
            ["--luxury-sparkle-opacity" as string]: String(sparkle.opacity),
          }}
        />
      ))}
    </div>
  );
}
