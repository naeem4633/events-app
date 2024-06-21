import React, { FC, useState, useEffect } from "react";
import NcImage from "shared/NcImage/NcImage";
import NextPrev from "shared/NextPrev/NextPrev";
import { Link } from "react-router-dom";

export interface GallerySliderProps {
  className?: string;
  galleryImgs: string[];
  ratioClass?: string;
  uniqueID: string;
  href?: string;
}

const GallerySlider: FC<GallerySliderProps> = ({
  className = "",
  galleryImgs,
  ratioClass = "aspect-w-4 aspect-h-3",
  uniqueID = "uniqueID",
  href = "/listing-stay",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === galleryImgs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryImgs.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [galleryImgs.length]);

  if (galleryImgs.length === 0) {
    return (
      <div className={`nc-GallerySlider ${className}`} data-nc-id="GallerySlider">
        <div className="relative w-full h-full flex items-center justify-center">
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`nc-GallerySlider ${className}`} data-nc-id="GallerySlider">
      <div className="relative group overflow-hidden">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {galleryImgs.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <Link to={href} className={`block ${ratioClass}`}>
                <NcImage src={item} />
              </Link>
            </div>
          ))}
        </div>

        {/* DOTS */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
          {galleryImgs.map((_, i) => (
            <button
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${currentIndex === i ? 'bg-neutral-900' : 'bg-neutral-300'}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>

        {/* NAV */}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
          <NextPrev
            className="justify-start"
            btnClassName="w-8 h-8"
            onClickPrev={prevSlide}
            onlyPrev
          />
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
          <NextPrev
            className="justify-end"
            btnClassName="w-8 h-8"
            onClickNext={nextSlide}
            onlyNext
          />
        </div>
      </div>
    </div>
  );
};

export default GallerySlider;
