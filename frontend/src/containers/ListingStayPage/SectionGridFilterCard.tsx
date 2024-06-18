import React, { FC } from "react";
import StayCard from "components/StayCard/StayCard";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading3 from "components/Heading/Heading3";
import { useSearchContext } from "context/search"; // Import the context

export interface SectionGridFilterCardProps {
  className?: string;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
}) => {
  const { selectedVenue } = useSearchContext();

  if (!selectedVenue) {
    return <div>No venue selected</div>;
  }

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading3 />

      {/* <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div> */}
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {selectedVenue.halls.map((hall) => (
          <StayCard key={hall._id} data={hall} />
        ))}
      </div>
      {/* <div className="flex mt-16 justify-center items-center">
        <Pagination />
      </div> */}
    </div>
  );
};

export default SectionGridFilterCard;
