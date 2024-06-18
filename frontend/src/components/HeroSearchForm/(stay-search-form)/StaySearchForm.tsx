import React, { FC, useEffect } from "react";
import axios from 'axios';
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { useSearchContext } from "context/search";
import { BACKEND_URL } from "backendUrl"; 
import { useNavigate } from "react-router-dom";

const StaySearchForm: FC<{}> = () => {
  const navigate = useNavigate();
  const { location, guests, dates, searchResults, setSearchResults } = useSearchContext();

  useEffect(() => {
    console.log("Location changed:", location);
  }, [location]);

  useEffect(() => {
    console.log("date changed:", dates);
  }, [dates]);

  useEffect(() => {
    console.log("number of guests changed:", guests);
  }, [guests]);

  useEffect(() => {
    console.log("searchResults changed:", searchResults);
  }, [searchResults]);

  const handleSubmit = async () => {
    console.log("submit")
    if (!location || !dates.startDate || !dates.endDate || !guests) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}search-places`, {
        address: location,
        guests: guests,
        startDate: dates.startDate.toISOString(),
        endDate: dates.endDate.toISOString()
      });
      console.log('Response:', response.data);
      setSearchResults(response.data);
      navigate('listing-stay-map');
      // Optionally navigate here after successful response
      // router.push("/listing-stay-map");
    } catch (error) {
      console.error('Error searching for places:', error);
    }
  };

  return (
    <div className="w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
      <LocationInput className="flex-[1.5]" />
      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
      <StayDatesRangeInput className="flex-1"/>
      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
      <GuestsInput className="flex-1"/>
      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-full">
        Search
      </button>
    </div>
  );
};

export default StaySearchForm;
