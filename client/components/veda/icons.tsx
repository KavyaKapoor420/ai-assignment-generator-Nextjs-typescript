import React from "react";

type IconProps = { size?: number; color?: string };

export const IcGrid = ({ size = 18, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <rect x="1" y="1" width="6.5" height="6.5" rx="1.5" stroke={color} strokeWidth="1.5" />
    <rect x="10.5" y="1" width="6.5" height="6.5" rx="1.5" stroke={color} strokeWidth="1.5" />
    <rect x="1" y="10.5" width="6.5" height="6.5" rx="1.5" stroke={color} strokeWidth="1.5" />
    <rect x="10.5" y="10.5" width="6.5" height="6.5" rx="1.5" stroke={color} strokeWidth="1.5" />
  </svg>
);
export const IcUsers = ({ size = 18, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <circle cx="6.5" cy="5.5" r="2.5" stroke={color} strokeWidth="1.5" />
    <path d="M1 14c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="13" cy="5" r="2" stroke={color} strokeWidth="1.5" />
    <path d="M15.5 13.5c0-2-1.5-3.5-3.5-3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
export const IcFile = ({ size = 18, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <rect x="3" y="1.5" width="10" height="15" rx="1.5" stroke={color} strokeWidth="1.5" />
    <path d="M6 6h6M6 9h6M6 12h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
export const IcWand = ({ size = 18, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M10.5 3l1 1-8.5 8.5-1-1L10.5 3z" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13 1v2M17 5h-2M15.4 2.6l-1.4 1.4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
export const IcClock = ({ size = 18, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke={color} strokeWidth="1.5" />
    <path d="M9 5v4l2.5 2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IcSettings = ({ size = 18, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="2.5" stroke={color} strokeWidth="1.5" />
    <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M3.7 14.3l1.4-1.4M12.9 5.1l1.4-1.4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
export const IcArrowLeft = ({ size = 18, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M11 4l-5 5 5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IcBell = ({ size = 20, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M10 2a6 6 0 0 1 6 6v3l1.5 2.5H2.5L4 11V8a6 6 0 0 1 6-6z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 16a2 2 0 0 0 4 0" stroke={color} strokeWidth="1.5" />
  </svg>
);
export const IcChevronDown = ({ size = 14, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M3 5l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IcPlus = ({ size = 14, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M7 1v12M1 7h12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
export const IcMinus = ({ size = 14, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M1 7h12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
export const IcFilter = ({ size = 16, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M2 4h12M4 8h8M6 12h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
export const IcSearch = ({ size = 16, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke={color} strokeWidth="1.5" />
    <path d="M11 11l3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
export const IcDots = ({ size = 18, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="4" r="1.5" fill={color} />
    <circle cx="9" cy="9" r="1.5" fill={color} />
    <circle cx="9" cy="14" r="1.5" fill={color} />
  </svg>
);
export const IcSparkle = ({ size = 11, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M6 0l1.2 4.8L12 6l-4.8 1.2L6 12l-1.2-4.8L0 6l4.8-1.2L6 0z" fill={color} />
  </svg>
);
export const IcUpload = ({ size = 28, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <path d="M7 18a4 4 0 0 1-.5-7.97 6 6 0 0 1 11.6-1.5A4.5 4.5 0 0 1 21 18" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 12v8M10.5 15.5L14 12l3.5 3.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
export const IcCalendar = ({ size = 18, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <rect x="2" y="3.5" width="14" height="12" rx="2" stroke={color} strokeWidth="1.5"/>
    <path d="M2 7h14M6 1.5v3M12 1.5v3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
export const IcMic = ({ size = 18, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <rect x="6.5" y="2" width="5" height="9" rx="2.5" stroke={color} strokeWidth="1.5"/>
    <path d="M3.5 9a5.5 5.5 0 0 0 11 0M9 14.5V17" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
export const IcX = ({ size = 14, color = "currentColor" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M2 2l10 10M12 2L2 12" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);