import React, { useState } from 'react';

import { imgFallBack } from '@/assets/index';

interface ImageWithFallbackProps {
  src: string;
  alt?: string;
  className?: string;
  fallback?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Image',
  className = '',
  fallback = imgFallBack,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`transition-all duration-500 ease-in-out ${
        loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
      } ${className}`}
      onError={() => setImgSrc(fallback)}
      onLoad={() => setLoaded(true)}
    />
  );
};
