import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

interface XlIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

const XlIcon = ({ src, alt, size = 120, className }: XlIconProps) => {
  return (
    <div 
      className={cn("relative overflow-hidden rounded-lg", className)} 
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        fill
        sizes={`${size}px`}
        className="object-cover"
        alt={alt}
      />
    </div>
  );
};

export default XlIcon;