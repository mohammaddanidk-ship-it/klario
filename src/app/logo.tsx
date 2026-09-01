import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function LogoImage() {
  return new ImageResponse(
    (
      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <rect width="512" height="512" rx="112" fill="#ffffff" />
        <circle cx="256" cy="256" r="205" fill="none" stroke="#0F1B2D" strokeWidth="24" opacity="0.22" />
        <path d="M256 72 144 256l112 184" fill="none" stroke="#0F1B2D" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M256 72 368 256 256 440" fill="none" stroke="#1683FF" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="256" cy="256" r="40" fill="#1683FF" />
        <circle cx="256" cy="256" r="72" fill="none" stroke="#1683FF" strokeWidth="12" opacity="0.4" />
      </svg>
    ),
    { ...size }
  );
}
