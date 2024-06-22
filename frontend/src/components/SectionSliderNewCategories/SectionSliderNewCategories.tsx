import React, { FC, useEffect } from "react";
import Heading from "components/Heading/Heading";
import { TaxonomyType } from "data/types";
import CardCategory3 from "components/CardCategory3/CardCategory3";
import CardCategory4 from "components/CardCategory4/CardCategory4";
import CardCategory5 from "components/CardCategory5/CardCategory5";
import NextPrev from "shared/NextPrev/NextPrev";
import { useSearchContext } from "context/search";
import { useNavigate } from "react-router-dom";

interface Hall {
  _id: string;
  name: string;
  price_per_head: number;
  seating_capacity: number;
  images: string[];
  place: string;
}

interface MapLocation {
  lat: number;
  lng: number;
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
  map: MapLocation;
}

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: TaxonomyType[];
  categoryCardType?: "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
  uniqueClassName: string;
}

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading = "Featured Venues",
  subHeading = "The chosen Venues from us",
  className = "",
  itemClassName = "",
  categoryCardType = "card3",
  itemPerRow = 5,
  sliderStyle = "style1",
  uniqueClassName,
}) => {
  const { featuredVenues, getFeaturedVenues, setSelectedVenue } = useSearchContext();
  const navigate = useNavigate();

  useEffect(() => {
    getFeaturedVenues();
  }, [getFeaturedVenues]);

  const handleCardClick = (venue: Place) => {
    setSelectedVenue(venue);
    navigate("/listing-stay");
  };

  const renderCard = (item: Place, index: number) => {
    const taxonomyItem: TaxonomyType = {
      id: item.id,
      href: `/listing-stay`,
      name: item.name,
      taxonomy: "category",
      count: item.userRatingCount,
      thumbnail: item.google_images[0] || item.images[0],
    };

    const cardComponent = (() => {
      switch (categoryCardType) {
        case "card3":
          return <CardCategory3 taxonomy={taxonomyItem} />;
        case "card4":
          return <CardCategory4 taxonomy={taxonomyItem} />;
        case "card5":
          return <CardCategory5 taxonomy={taxonomyItem} />;
        default:
          return <CardCategory3 taxonomy={taxonomyItem} />;
      }
    })();

    return (
      <div
        key={index}
        className={`nc-SectionSliderNewCategories__item ${itemClassName}`}
        onClick={() => handleCardClick(item)}
      >
        {cardComponent}
      </div>
    );
  };

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <Heading
        desc={subHeading}
        hasNextPrev={sliderStyle === "style1"}
        isCenter={sliderStyle === "style2"}
      >
        {heading}
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {featuredVenues.map((item, index) => (
          <div key={index} className={`nc-SectionSliderNewCategories__item ${itemClassName}`}>
            {renderCard(item, index)}
          </div>
        ))}
      </div>

      {sliderStyle === "style2" && (
        <NextPrev className="justify-center mt-16" />
      )}
    </div>
  );
};

export default SectionSliderNewCategories;
