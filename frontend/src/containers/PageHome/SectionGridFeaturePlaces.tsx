import React, { FC, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "components/StayCard/StayCard";
import { useSearchContext } from "context/search"; // Import the context

interface Hall {
  _id: string;
  name: string;
  price_per_head: number;
  seating_capacity: number;
  images: string[];
  place: string;
}

interface Place {
  id: string;
  name: string;
  address: string;
  website_uri?: string;
  google_maps_uri?: string;
  vendor?: string;
  seating_capacity?: number;
  price_per_head?: number;
  type?: string;
  rating: number;
  userRatingCount: number;
  halls: Hall[];
  images: string[];
  google_images: string[];
  featured: boolean;
}

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
  const { allVenues, getAllVenues } = useSearchContext();
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  useEffect(() => {
    getAllVenues();
  }, [getAllVenues]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const filteredVenues = allVenues.filter(venue =>
    venue.address.toLowerCase().includes(activeTab.toLowerCase())
  );

  const renderCard = (venue: Place) => {
    return <StayCard key={venue.id} data={venue} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={activeTab}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
        onClickTab={handleTabClick}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {filteredVenues.map(venue => renderCard(venue))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
