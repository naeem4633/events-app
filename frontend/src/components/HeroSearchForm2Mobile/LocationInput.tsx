import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useRef, FC } from "react";
// import ClearDataButton from "./ClearDataButton";
import GooglePlacesAutocomplete from "components/GooglePlacesAutocomplete";
import { useSearchContext } from "context/search";

interface Props {
  onClick?: () => void;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  headingText?: string;
}

const LocationInput: FC<Props> = ({
  onChange = () => {},
  className = "",
  defaultValue = "United States",
  headingText = "Which Location?",
}) => {
  const { location, setLocation } = useSearchContext();
  const [value, setValue] = useState(defaultValue);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{ description: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(location);
  }, [location]);

  const handleSelectLocation = (address: string) => {
    setLocation(address);
    setShowSuggestions(false);
  };

  const renderSearchValues = ({
    heading,
    items,
  }: {
    heading: string;
    items: string[];
  }) => {
    return (
      <>
        <p className="block font-semibold text-base">
          {heading || "Destinations"}
        </p>
        <div className="mt-3">
          {items.map((item) => {
            return (
              <div
                className="py-2 mb-1 flex items-center space-x-3 text-sm cursor-pointer"
                onClick={() => handleSelectLocation(item)}
                key={item}
              >
                <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <span className="">{item}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className={`${className}`} ref={containerRef}>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {headingText}
        </span>
        <div className="relative mt-5">
          <input
            className={`block w-full bg-transparent border px-4 py-3 pr-12 border-neutral-900 dark:border-neutral-200 rounded-xl focus:ring-0 focus:outline-none text-base leading-none placeholder-neutral-500 dark:placeholder-neutral-300 truncate font-bold placeholder:truncate`}
            placeholder={"Select Location"}
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
              setShowSuggestions(true);
            }}
            ref={inputRef}
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <MagnifyingGlassIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-400" />
          </span>
          {/* {value && (
            <ClearDataButton
              onClick={() => {
                setValue("");
                setLocation("");
                setShowSuggestions(false);
              }}
            />
          )} */}
        </div>
        {showSuggestions && (
          <GooglePlacesAutocomplete
            inputRef={inputRef}
            onSelect={handleSelectLocation}
            setSuggestions={setSuggestions}
          />
        )}
        <div className="mt-7">
          {value
            ? renderSearchValues({
                heading: "Locations",
                items: suggestions.map((suggestion) => suggestion.description),
              })
            : renderSearchValues({
                heading: "Popular Locations",
                items: ["Islamabad, Pakistan", "Lahore, Pakistan", "Karachi, Pakistan", "Peshawar, Pakistan", "Quetta, Pakistan"],
              })}
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
