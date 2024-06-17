import React, { FC, useEffect } from "react";
import axios from 'axios';
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { useSearchContext } from "context/search";
import { BACKEND_URL } from "backendUrl"; 

const StaySearchForm: FC<{}> = () => {
  const { location, guests, dates, setLocation, setGuests, setDates } = useSearchContext();

  useEffect(() => {
    console.log("Location changed:", location);
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("submit")
    e.preventDefault();
    if (!location || !dates.startDate || !dates.endDate || !guests) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}places/search`, {
        city: location,
        guests: guests,
        startDate: dates.startDate.toISOString(),
        endDate: dates.endDate.toISOString()
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error searching for places:', error);
    }
  };

  return (
    <form className="w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
      <LocationInput className="flex-[1.5]" />
      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
      <StayDatesRangeInput className="flex-1" onDatesChange={(startDate, endDate) => setDates({ startDate, endDate })} />
      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
      <GuestsInput className="flex-1" onGuestsChange={setGuests} />
      <button onClick={handleSubmit} type="submit" className="hidden"></button>
    </form>
  );
};

export default StaySearchForm;
