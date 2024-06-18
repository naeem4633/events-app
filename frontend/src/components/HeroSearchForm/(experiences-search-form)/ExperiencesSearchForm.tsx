import React, { FC, useState } from "react";
import axios from 'axios';
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import ExperiencesDateSingleInput from "./ExperiencesDateSingleInput";
import { BACKEND_URL } from "backendUrl";

export interface ExperiencesSearchFormProps {}

const ExperiencesSearchForm: FC<ExperiencesSearchFormProps> = () => {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState<Date | null>(null);

  const handleLocationChange = (location: string) => {
    setLocation(location);
  };

  const handleGuestsChange = (guests: number) => {
    setGuests(guests);
  };

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !date || !guests) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}experiences/search`, {
        city: location,
        guests: guests,
        date: date.toISOString()
      });
      console.log('Experiences:', response.data);
    } catch (error) {
      console.error('Error searching for experiences:', error);
    }
  };

  return (
    <form className="w-full relative mt-8 flex flex-col md:flex-row rounded-3xl md:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800" onSubmit={handleSubmit}>
      <LocationInput className="flex-[1.5]"  />
      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
      <ExperiencesDateSingleInput className="flex-1"  />
      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
      <GuestsInput className="flex-1" />
      <button type="submit" className="hidden"></button>
    </form>
  );
};

export default ExperiencesSearchForm;
