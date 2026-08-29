import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#ffffff" />
        <circle cx="32" cy="32" r="25" fill="none" stroke="#0F1B2D" strokeWidth="3" opacity="0.22" />
        <path d="M32 9 18 32l14 23" fill="none" stroke="#0F1B2D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 9 46 32 32 55" fill="none" stroke="#1683FF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="32" r="5" fill="#1683FF" />
        <circle cx="32" cy="32" r="9" fill="none" stroke="#1683FF" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
    { ...size }
  );
}
