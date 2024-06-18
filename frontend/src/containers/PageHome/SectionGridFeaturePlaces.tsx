import React, { FC, ReactNode } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "components/StayCard/StayCard";
import { useSearchContext } from "context/search"; // Import the context

//
export interface SectionGridFeaturePlacesProps {
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  gridClass = "",
  heading = "Explore Our Venues",
  subHeading = "Popular Venues recommended by tayari",
  headingIsCenter,
  tabs = ["Islamabad", "Lahore", "Karachi", "Peshawar"],
}) => {
  const { selectedVenue } = useSearchContext();

  const renderCard = (hall: any) => {
    return <StayCard key={hall._id} data={hall} />;
  };

  if (!selectedVenue) {
    return <div>No venue selected</div>;
  }

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={"Islamabad"}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
        onClickTab={() => {}}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {selectedVenue.halls.map((hall) => renderCard(hall))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
