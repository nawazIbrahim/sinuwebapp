/**
 * Gallery Carousel Component
 * 
 * Horizontal carousel for displaying gallery images using Swiper
 * Features: swipe support, navigation arrows, visible pagination dots
 */

'use client';

import { UIGalleryImage } from '@/types/gallery';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface GalleryCarouselProps {
  images: UIGalleryImage[];
}

export default function GalleryCarousel({ images }: GalleryCarouselProps) {
  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-[#617289]">
        No images available
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <style jsx global>{`
        /* Swiper Container */
        .gallery-swiper {
          padding: 0;
        }

        /* Navigation Buttons - Figma Design */
        .swiper-button-prev,
        .swiper-button-next {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          border: 1px solid #FFFBEB;
          box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
        }
        
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: rgba(255, 255, 255, 1);
          border-color: #136DEC;
          box-shadow: 0px 10px 20px -3px rgba(19, 109, 236, 0.2), 0px 4px 6px -4px rgba(0, 0, 0, 0.1);
          transform: scale(1.05);
        }

        .swiper-button-prev:active,
        .swiper-button-next:active {
          transform: scale(0.95);
        }
        
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 12px;
          color: #000000 !important;
          font-weight: bold;
          transition: color 0.3s;
          width: 7px !important;
          height: 11px !important;
          display: inline-block;
        }

        .swiper-button-prev:hover::after,
        .swiper-button-next:hover::after {
          color: #136DEC !important;
        }

        /* Positioning - Figma Design */
        .swiper-button-prev {
          left: -8px;
        }

        .swiper-button-next {
          right: -8px;
        }

        /* Disabled state */
        .swiper-button-disabled {
          opacity: 0.35;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Pagination - Figma Design */
        .swiper-pagination {
          position: relative;
          margin-top: 32px;
          padding: 8px 0;
        }
        
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #FFFBEB;
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: none;
        }
        
        .swiper-pagination-bullet:hover {
          background: #F3F4F6;
          transform: scale(1.15);
        }
        
        .swiper-pagination-bullet-active {
          width: 10px;
          height: 10px;
          background: #136DEC;
          box-shadow: 0px 0px 0px 2px rgba(19, 109, 236, 0.3);
          transform: scale(1);
        }

        .swiper-pagination-bullet-active:hover {
          background: #0B5ED7;
          transform: scale(1.1);
        }

        /* Touch feedback on mobile */
        @media (hover: none) {
          .swiper-button-prev:active,
          .swiper-button-next:active {
            background: rgba(255, 255, 255, 1);
            transform: scale(0.95);
          }

          .swiper-pagination-bullet:active {
            transform: scale(0.9);
          }
        }
      `}</style>

      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: false,
        }}
        loop={images.length > 1}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        grabCursor={true}
        speed={600}
        className="gallery-swiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image.galleryID}>
            {/* Image Card */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#E5E7EB]">
              {/* Aspect Ratio Container */}
              <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                {/* Image */}
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 512px"
                />

                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
                  }}
                />

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                  <h2 className="text-2xl font-bold leading-8 mb-1">
                    {image.title}
                  </h2>
                  <p className="text-sm font-medium text-[#E5E7EB] leading-5">
                    {image.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
