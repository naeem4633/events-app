import React, { FC, useEffect, useMemo } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import { TaxonomyType } from "data/types";
import CardCategory3 from "components/CardCategory3/CardCategory3";
import CardCategory4 from "components/CardCategory4/CardCategory4";
import CardCategory5 from "components/CardCategory5/CardCategory5";
import NextPrev from "shared/NextPrev/NextPrev";
import useNcId from "hooks/useNcId";
import { useSearchContext } from "context/search";

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
  const { featuredVenues, getFeaturedVenues } = useSearchContext();

  useEffect(() => {
    getFeaturedVenues();
  }, [getFeaturedVenues]);

  const UNIQUE_CLASS =
    "SectionSliderNewCategories__" + uniqueClassName + useNcId();

  let MY_GLIDEJS = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      perView: itemPerRow,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: itemPerRow - 1,
        },
        1024: {
          gap: 20,
          perView: itemPerRow - 1,
        },
        768: {
          gap: 20,
          perView: itemPerRow - 2,
        },
        640: {
          gap: 20,
          perView: itemPerRow - 3,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    });
  }, [UNIQUE_CLASS]);

  useEffect(() => {
    setTimeout(() => {
      MY_GLIDEJS.mount();
    }, 100);
  }, [MY_GLIDEJS, UNIQUE_CLASS, featuredVenues]);

  const renderCard = (item: Place, index: number) => {
    const taxonomyItem: TaxonomyType = {
      id: item.id,
      href: `/listing-stay/${item.id}`,
      name: item.name,
      taxonomy: "category",
      count: item.userRatingCount,
      thumbnail: item.google_images[0] || item.images[0],
    };

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
  };

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`}>
        <Heading
          desc={subHeading}
          hasNextPrev={sliderStyle === "style1"}
          isCenter={sliderStyle === "style2"}
        >
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {featuredVenues.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                {renderCard(item, index)}
              </li>
            ))}
          </ul>
        </div>

        {sliderStyle === "style2" && (
          <NextPrev className="justify-center mt-16" />
        )}
      </div>
    </div>
  );
};

export default SectionSliderNewCategories;
