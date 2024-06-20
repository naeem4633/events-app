import React, { FC, useRef, useState, useEffect } from "react";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import GooglePlacesAutocomplete from "components/GooglePlacesAutocomplete"; // Make sure this path is correct
import { useAddingPlaceContext } from "context/addingPlace"; // Import the AddingPlaceContext

export interface PageAddListing1Props {}

const PageAddListing1: FC<PageAddListing1Props> = () => {
  const { placeName, setPlaceName, vendorEmail, setVendorEmail, placeId, setPlaceId, websiteUri, featured, setFeatured } = useAddingPlaceContext(); // Use the context
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<{ description: string, place_id: string }[]>([]);

  const handleSelectPlace = (address: string, id: string) => {
    setPlaceName(address);
    setPlaceId(id);
  };

  useEffect(() => {
    console.log("websiteUri changed:", websiteUri);
  }, [websiteUri]);

  useEffect(() => {
    console.log("Place Name:", placeName);
  }, [placeName]);

  useEffect(() => {
    console.log("Vendor Email:", vendorEmail);
  }, [vendorEmail]);

  useEffect(() => {
    console.log("Place ID:", placeId);
  }, [placeId]);

  return (
    <CommonLayout
      index="01"
      backtHref="/add-listing-1"
      nextHref="/add-listing-2"
    >
      <>
        <h2 className="text-2xl font-semibold">Add Listing</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* Place Name */}
          <FormItem
            label="Place name"
            desc="Enter the place name using Google Places Autocomplete"
          >
            <div className="relative">
              <Input
                ref={inputRef}
                placeholder="Place name"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
              />
              <GooglePlacesAutocomplete
                inputRef={inputRef}
                onSelect={(address, id) => handleSelectPlace(address, id)}
                setSuggestions={setSuggestions}
              />
            </div>
          </FormItem>

          {/* Vendor Email */}
          <FormItem
            label="Vendor email"
            desc="Enter the vendor email address"
          >
            <Input
              type="email"
              placeholder="Vendor email"
              value={vendorEmail}
              onChange={(e) => setVendorEmail(e.target.value)}
            />
          </FormItem>

          {/* Featured */}
          <FormItem
            label="Featured"
            desc="Mark this place as featured"
          >
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
          </FormItem>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing1;
