import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 100, height = 100, className = "" }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="La Maison O'Pizza"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      priority
    />
  );
}
