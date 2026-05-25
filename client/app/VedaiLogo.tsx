import React from "react";

interface VedaLogoProps {
  compact?: boolean;
}

const VedaLogo = ({ compact = false }: VedaLogoProps) => {
  const iconSize = compact ? 28 : 40;
  const radius = compact ? 10 : 15;
  const gap = compact ? 8 : 12;
  const textSize = compact ? 16 : 23;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: `${gap}px`,
        userSelect: "none",
        marginBottom: compact ? "0" : "24px",
      }}
    >
      <div
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          borderRadius: `${radius}px`,
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          backgroundImage: "url('/bg-graident-image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
          }}
        >
          <path
            d="M9.6 10.9H20.5L22.55 19.65L24.95 10.9H33.8L27.35 29.1H15.2L9.6 10.9Z"
            fill="white"
          />
          <path
            d="M18.85 10.9H25.15L22.55 19.65L20.5 10.9H18.85Z"
            fill="#F7F7F7"
          />
          <path
            d="M9.6 10.9H20.5L17.85 29.1H15.2L9.6 10.9Z"
            fill="rgba(0,0,0,0.10)"
          />
        </svg>
      </div>

      <span
        style={{
          fontFamily: "'Bricolage Grotesque', 'Inter', sans-serif",
          fontSize: `${textSize}px`,
          lineHeight: 1,
          fontWeight: 700,
          letterSpacing: "-0.055em",
          color: "#363636",
        }}
      >
        VedaAI
      </span>
    </div>
  );
};

export default VedaLogo;
