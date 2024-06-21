import React from "react";
import CardCategoryBox1 from "components/CardCategoryBox1/CardCategoryBox1";
import Heading from "components/Heading/Heading";
import { TaxonomyType } from "data/types";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "context/search";

export interface SectionGridCategoryBoxProps {
  categories?: TaxonomyType[];
  headingCenter?: boolean;
  categoryCardType?: "card1";
  className?: string;
  gridClassName?: string;
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "#",
    name: "Islamabad",
    taxonomy: "category",
    count: 1882,
    thumbnail:
      "https://media-cdn.tripadvisor.com/media/photo-s/07/17/bb/08/faisal-mosque-faisal.jpg",
  },
  {
    id: "2",
    href: "#",
    name: "Karachi",
    taxonomy: "category",
    count: 8288,
    thumbnail:
      "https://cdn.britannica.com/85/128585-050-5A1BDD02/Karachi-Pakistan.jpg",
  },
  {
    id: "3",
    href: "#",
    name: "Lahore",
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2022/03/Body-2-7-1024x640.jpg",
  },
  {
    id: "4",
    href: "#",
    name: "Multan",
    taxonomy: "category",
    count: 112,
    thumbnail:
      "https://www.flydubai.com/en/media/multan_tcm8-6326.jpg",
  },
  {
    id: "5",
    href: "#",
    name: "Faisalabad",
    taxonomy: "category",
    count: 323,
    thumbnail:
      "https://img.dunyanews.tv/news/2022/January/01-24-22/news_big_images/638075_32861860.jpg",
  },
  {
    id: "6",
    href: "#",
    name: "Peshawar",
    taxonomy: "category",
    count: 2223,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Islamia_College_Peshawar_2.jpg/220px-Islamia_College_Peshawar_2.jpg",
  },
  {
    id: "7",
    href: "#",
    name: "Rawalpindi",
    taxonomy: "category",
    count: 1775,
    thumbnail:
      "https://tourism.punjab.gov.pk/system/files/islamabad1.jpg",
  },
  {
    id: "8",
    href: "#",
    name: "Sukkur",
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/7/70/Rohri.jpg",
  },
];

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
  categories = DEMO_CATS,
  categoryCardType = "card1",
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  const navigate = useNavigate();
  const { setLocation, setGuests, setDates, searchPlaces } = useSearchContext();
  let CardComponentName = CardCategoryBox1;

  const handleCardClick = async (city: string) => {
    setLocation(`${city}, Pakistan`);
    setGuests(0);
    setDates({ startDate: null, endDate: null });
    await searchPlaces();
    navigate("/listing-stay-map");
  };

  switch (categoryCardType) {
    case "card1":
      CardComponentName = CardCategoryBox1;
      break;

    default:
      CardComponentName = CardCategoryBox1;
  }

  return (
    <div className={`nc-SectionGridCategoryBox relative ${className}`}>
      <Heading
        desc="Discover great places near where you live"
        isCenter={headingCenter}
      >
        Explore nearby
      </Heading>
      <div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-8`}>
        {categories.map((item, i) => (
          <div key={i} onClick={() => handleCardClick(item.name)}>
            <CardComponentName taxonomy={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGridCategoryBox;
