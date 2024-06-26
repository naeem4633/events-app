import React, { FC, useState } from "react";
import AnyReactComponent from "components/AnyReactComponent/AnyReactComponent";
import StayCardH from "components/StayCardH/StayCardH";
import GoogleMapReact from "google-map-react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import { useSearchContext } from "context/search";

export interface SectionGridHasMapProps {}

const SectionGridHasMap: FC<SectionGridHasMapProps> = () => {
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);
  const { searchResults, filteredResults } = useSearchContext();

  const results = filteredResults.length > 0 ? filteredResults : searchResults;

  return (
    <div>
      <div className="relative flex min-h-screen">
        {/* CARDSSSS */}
        <div className="min-h-screen w-full xl:w-[780px] 2xl:w-[880px] flex-shrink-0 xl:px-8">
          <Heading2 />
          <div className="mb-8 lg:mb-11">
            <TabFilters />
          </div>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {results.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setCurrentHoverID((_) => item.id)}
                  onMouseLeave={() => setCurrentHoverID((_) => -1)}
                >
                  <StayCardH data={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p>No results found</p>
            </div>
          )}
          <div className="flex mt-16 justify-center items-center">
            {/* <Pagination /> */}
          </div>
        </div>

        {!showFullMapFixed && (
          <div
            className="flex xl:hidden items-center justify-center fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-neutral-900 text-white shadow-2xl rounded-full z-30 space-x-3 text-sm cursor-pointer"
            onClick={() => setShowFullMapFixed(true)}
          >
            <i className="text-lg las la-map"></i>
            <span>Show map</span>
          </div>
        )}

        {/* MAPPPPP */}
        <div
          className={`xl:flex-grow xl:static xl:block ${
            showFullMapFixed ? "fixed inset-0 z-50" : "hidden"
          }`}
        >
          {showFullMapFixed && (
            <ButtonClose
              onClick={() => setShowFullMapFixed(false)}
              className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
            />
          )}

          <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
            {results.length > 0 && (
              <div className="absolute bottom-5 left-3 lg:bottom-auto lg:top-2.5 lg:left-1/2 transform lg:-translate-x-1/2 py-2 px-4 bg-white dark:bg-neutral-800 shadow-xl z-10 rounded-2xl min-w-max">
                <Checkbox
                  className="text-xs xl:text-sm"
                  name="xx"
                  label="Search as I move the map"
                />
              </div>
            )}

            {/* BELLOW IS MY GOOGLE API KEY -- PLEASE DELETE AND TYPE YOUR API KEY */}
            {results.length > 0 ? (
              <GoogleMapReact
                defaultZoom={12}
                defaultCenter={{ lat: results[0].map.lat, lng: results[0].map.lng }}
                bootstrapURLKeys={{
                  key: "AIzaSyCub7X0l9J4rMg3QkTWRhvKjv5-hh2SfQQ",
                }}
                yesIWantToUseGoogleMapApiInternals
              >
                {results.map((item) => (
                  <AnyReactComponent
                    isSelected={currentHoverID === item.id}
                    key={item.id}
                    lat={item.map.lat}
                    lng={item.map.lng}
                    listing={item}
                  />
                ))}
              </GoogleMapReact>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>No map data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionGridHasMap;
