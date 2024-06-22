import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import StartRating from "components/StartRating/StartRating";
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

interface StayCardProps {
  className?: string;
  data: Place | Hall;
  size?: "default" | "small";
}

const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data,
}) => {
  const navigate = useNavigate();
  const { setSelectedHall, setSelectedVenue } = useSearchContext();

  const isPlace = (data: Place | Hall): data is Place => {
    return (data as Place).rating !== undefined;
  };

  const handleCardClick = () => {
    if (isPlace(data)) {
      setSelectedVenue(data);
      navigate("/listing-stay");
    } else {
      setSelectedHall(data);
      navigate("/listing-stay-detail");
    }
  };

  const renderSliderGallery = () => {
    const images = isPlace(data) ? (data.google_images?.length ? data.google_images : data.images) : data.images;
    return (
      <div className="relative w-full">
        {images && images.length > 0 ? (
          <GallerySlider
            uniqueID={`StayCard_${isPlace(data) ? data.id : data._id}`}
            ratioClass="aspect-w-4 aspect-h-3"
            galleryImgs={images}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>No images available</p>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {data.name}
          </span>
          <div className="flex items-center space-x-2">
            <h2
              className={`font-medium capitalize ${
                size === "default" ? "text-lg" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{data.name}</span>
            </h2>
          </div>
          {isPlace(data) ? (
            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <StartRating reviewCount={data.userRatingCount} point={data.rating} />
            </div>
          ) : (
            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
              <span className="">{data.seating_capacity} guests</span>
            </div>
          )}
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            ${data.price_per_head}
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /head
              </span>
            )}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow cursor-pointer ${className}`}
      data-nc-id="StayCard"
      onClick={handleCardClick}
    >
      {renderSliderGallery()}
      {renderContent()}
    </div>
  );
};

export default StayCard;
