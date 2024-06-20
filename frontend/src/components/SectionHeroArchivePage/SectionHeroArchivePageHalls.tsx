import React, { FC } from "react";
import { useSearchContext } from "context/search";

export interface SectionHeroArchivePageHallsProps {
  className?: string;
}

const SectionHeroArchivePageHalls: FC<SectionHeroArchivePageHallsProps> = ({
  className = "",
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
        <div className="flex-grow grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-2 lg:gap-4">
          {selectedVenue.google_images.slice(0, 3).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Venue ${index + 1}`}
              className="object-cover w-full h-48 md:h-64 lg:h-80 rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionHeroArchivePageHalls;
