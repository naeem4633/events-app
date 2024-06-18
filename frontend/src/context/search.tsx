import React, { createContext, useState, FC, ReactNode, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "backendUrl";

interface Hall {
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
}

// Define the shape of your context data
interface SearchContextType {
  location: string;
  setLocation: (location: string) => void;
  guests: number;
  setGuests: (guests: number) => void;
  dates: { startDate: Date | null; endDate: Date | null };
  setDates: (dates: { startDate: Date | null; endDate: Date | null }) => void;
  searchResults: Place[];
  setSearchResults: (results: Place[]) => void;
  searchPlaces: () => Promise<void>;
  city: string;
  country: string;
  filterResultsByPrice: (minPrice: number, maxPrice: number) => void;
  filteredResults: Place[];
}

// Create the context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Function to extract city and country from location
const getLocationParts = (location: string) => {
  const parts = location.split(',').map(part => part.trim());
  return {
    city: parts.length > 1 ? parts[parts.length - 2] : '',
    country: parts.length > 0 ? parts[parts.length - 1] : ''
  };
};

// Create a provider component
export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<string>(() => {
    return localStorage.getItem("location") || "";
  });

  const [guests, setGuests] = useState<number>(() => {
    return parseInt(localStorage.getItem("guests") || "50");
  });

  const [dates, setDates] = useState<{ startDate: Date | null; endDate: Date | null }>(() => {
    const startDate = localStorage.getItem("startDate");
    const endDate = localStorage.getItem("endDate");
    return {
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null
    };
  });

  const [searchResults, setSearchResults] = useState<Place[]>(() => {
    const storedResults = localStorage.getItem("searchResults");
    return storedResults ? JSON.parse(storedResults) : [];
  });

  const [filteredResults, setFilteredResults] = useState<Place[]>([]);

  const { city, country } = getLocationParts(location);

  useEffect(() => {
    localStorage.setItem("location", location);
  }, [location]);

  useEffect(() => {
    localStorage.setItem("guests", guests.toString());
  }, [guests]);

  useEffect(() => {
    if (dates.startDate) {
      localStorage.setItem("startDate", dates.startDate.toISOString());
    } else {
      localStorage.removeItem("startDate");
    }
    if (dates.endDate) {
      localStorage.setItem("endDate", dates.endDate.toISOString());
    } else {
      localStorage.removeItem("endDate");
    }
  }, [dates]);

  useEffect(() => {
    localStorage.setItem("searchResults", JSON.stringify(searchResults));
  }, [searchResults]);

  const searchPlaces = async () => {
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
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching for places:', error);
    }
  };

  const filterResultsByPrice = (minPrice: number, maxPrice: number) => {
    console.log(`Filtering results by price range: ${minPrice} - ${maxPrice}`);
    const filtered = searchResults.filter(place =>
      place.halls.some((hall: Hall) => hall.price_per_head >= minPrice && hall.price_per_head <= maxPrice)
    );
    console.log('Filtered results:', filtered);
    setFilteredResults(filtered);
  };

  return (
    <SearchContext.Provider
      value={{
        location,
        setLocation,
        guests,
        setGuests,
        dates,
        setDates,
        searchResults,
        setSearchResults,
        searchPlaces,
        city,
        country,
        filterResultsByPrice,
        filteredResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};