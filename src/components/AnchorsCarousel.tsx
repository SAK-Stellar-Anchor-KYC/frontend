'use client';

import React from 'react';
import Image from 'next/image';

interface AnchorsCarouselProps {
  images: string[];
}

export const AnchorsCarousel: React.FC<AnchorsCarouselProps> = ({ images }) => {
  // Filtrar imágenes que no existen (para desarrollo)
  const validImages = images.filter(img => img);
  
  if (validImages.length === 0) {
    return null;
  }

  // Duplicar las imágenes para crear un loop infinito
  const duplicatedImages = [...validImages, ...validImages, ...validImages];

  return (
    <div className="relative w-full">
      {/* Carrusel animado */}
      <div className="flex animate-scroll items-center">
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 -mx-12"
            style={{ width: '600px', height: '300px' }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={image}
                alt={`Anchor ${index + 1}`}
                width={600}
                height={300}
                className="object-contain w-full h-full"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

