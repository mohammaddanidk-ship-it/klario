import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function LogoImage() {
  return new ImageResponse(
    (
      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
        <rect width="512" height="512" rx="112" fill="#1683FF" />
        <path d="M256 72 126 126v102c0 87 54 147 130 188 76-41 130-101 130-188V126L256 72Z" fill="#0F1B2D" opacity=".22" />
        <path d="M256 88 144 132v96c0 75 43 128 112 167 69-39 112-92 112-167v-96L256 88Z" fill="none" stroke="#fff" strokeWidth="22" strokeLinejoin="round" />
        <path d="M210 170v172M210 256l112-86M210 256l112 86" fill="none" stroke="#fff" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    { ...size }
  );
}
