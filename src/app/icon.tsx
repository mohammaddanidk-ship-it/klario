import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="15" fill="#1683FF" />
        <path d="M32 9 14 16v14c0 12 7.7 20.1 18 25 10.3-4.9 18-13 18-25V16L32 9Z" fill="#0F1B2D" opacity=".22" />
        <path d="M32 11 16 17v12.5c0 10.7 6.6 18 16 23 9.4-5 16-12.3 16-23V17L32 11Z" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
        <path d="M25 21v22M25 32l14-11M25 32l14 11" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    { ...size }
  );
}
