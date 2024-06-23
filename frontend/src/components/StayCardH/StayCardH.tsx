import React, { useEffect, FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import StartRating from "components/StartRating/StartRating";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "context/search";

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
  images: string[];
  google_images: string[];
  rating: number;
  vendor_email?: string;
  userRatingCount: number;
  halls: Hall[];
  featured: boolean;
  latitude?: number;
  longitude?: number;
  map: MapLocation;
}

export interface StayCardHProps {
  className?: string;
  data: Place;
}

const StayCardH: FC<StayCardHProps> = ({ className = "", data }) => {
  const { images, address, name, id, rating, userRatingCount, halls, google_images } = data;
  const { selectedVenue, setSelectedVenue } = useSearchContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("selected venue changed:", selectedVenue);
  }, [selectedVenue]);

  const handleCardClick = () => {
    setSelectedVenue(data);
    navigate("/listing-stay");
  };

  const renderSliderGallery = () => {
    return (
      <div className="relative flex-shrink-0 w-full md:w-72">
        <GallerySlider
          ratioClass="aspect-w-6 aspect-h-5"
          galleryImgs={images.length ? images : google_images}
          uniqueID={`StayCardH_${id}`}
        />
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="hidden sm:grid grid-cols-3 gap-2">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-user text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {halls.reduce((acc, hall) => acc + hall.seating_capacity, 0)} guests
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col space-y-2">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
        </div>
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          <span>{address}</span>
        </div>
        <div className="hidden sm:block w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        {/* {renderTienIch()} */}
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        <div className="flex justify-between items-end">
          <StartRating reviewCount={userRatingCount} point={rating} />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow will-change-transform cursor-pointer ${className}`}
      data-nc-id="StayCardH"
    >
      <div className="grid grid-cols-1 md:flex md:flex-row">
        {renderSliderGallery()}
        <div onClick={handleCardClick}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StayCardH;
