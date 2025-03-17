import Image from "next/image";
import React from "react";

interface XlIconProps {
  src: string;
  alt: string;
  size?: number;
}

const XlIcon = ({ src, alt, size = 120 }: XlIconProps) => {
  return (
    <div className="relative w-[120px] h-[120px] overflow-hidden rounded-lg">
      <Image
        src={src}
        fill
        sizes="120px"
        className="object-cover"
        alt={alt}
      />
    </div>
  );
};

export default XlIcon;