import React, { FC, ReactNode } from "react";
import imagePng from "images/hero-right2.png";
import { useSearchContext } from "context/search";

export interface SectionHeroArchivePageHallsProps {
  className?: string;
  rightImage?: string;
}

const SectionHeroArchivePageHalls: FC<SectionHeroArchivePageHallsProps> = ({
  className = "",
  rightImage = imagePng,
}) => {
  const { selectedVenue } = useSearchContext();

  if (!selectedVenue) {
    return <div>No venue selected</div>;
  }

  return (
    <div
      className={`nc-SectionHeroArchivePageHalls flex flex-col relative ${className}`}
      data-nc-id="SectionHeroArchivePageHalls"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 lg:pb-64 xl:pb-80 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
            {selectedVenue.name}
          </h2>
          <div className="text-lg text-neutral-500 dark:text-neutral-400">
            {selectedVenue.address}
          </div>
          <div className="flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            <i className="text-2xl las la-home"></i>
            <span className="ml-2.5">{selectedVenue.halls.length} Halls</span>
          </div>
        </div>
        <div className="flex-grow">
          <img className="w-full" src={rightImage} alt="hero" />
        </div>
      </div>

      <div className="hidden lg:flow-root w-full">
        <div className="z-10 lg:-mt-40 xl:-mt-56 w-full">
          {/* Optionally add any other component here */}
        </div>
      </div>
    </div>
  );
};

export default SectionHeroArchivePageHalls;
