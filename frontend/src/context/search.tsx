import React, { createContext, useState, FC, ReactNode, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "backendUrl";

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
  latitude?: number;
  longitude?: number;
}

interface SearchContextType {
  location: string;
  setLocation: (location: string) => void;
  guests: number;
  setGuests: (guests: number) => void;
  dates: { startDate: Date | null; endDate: Date | null };
  setDates: (dates: { startDate: Date | null; endDate: Date | null }) => void;
  searchResults: Place[];
  setSearchResults: (results: Place[]) => void;
  searchPlaces: (params?: {
    location?: string;
    guests?: number;
    startDate?: Date | null;
    endDate?: Date | null;
  }) => Promise<void>;
  city: string;
  country: string;
  filterResultsByPrice: (minPrice: number, maxPrice: number) => void;
  filteredResults: Place[];
  selectedVenue: Place | null;
  setSelectedVenue: (venue: Place | null) => void;
  selectedHall: Hall | null;
  setSelectedHall: (hall: Hall | null) => void;
  featuredVenues: Place[];
  getFeaturedVenues: () => Promise<void>;
  allVenues: Place[];
  getAllVenues: () => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const getLocationParts = (location: string) => {
  const parts = location.split(',').map(part => part.trim());
  return {
    city: parts.length > 1 ? parts[parts.length - 2] : '',
    country: parts.length > 0 ? parts[parts.length - 1] : ''
  };
};

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
  const [selectedVenue, setSelectedVenue] = useState<Place | null>(() => {
    const storedVenue = localStorage.getItem("selectedVenue");
    return storedVenue ? JSON.parse(storedVenue) : null;
  });
  
  const [selectedHall, setSelectedHall] = useState<Hall | null>(() => {
    const storedHall = localStorage.getItem("selectedHall");
    return storedHall ? JSON.parse(storedHall) : null;
  });

  const [featuredVenues, setFeaturedVenues] = useState<Place[]>([]);
  const [allVenues, setAllVenues] = useState<Place[]>([]);

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

  useEffect(() => {
    localStorage.setItem("selectedVenue", JSON.stringify(selectedVenue));
  }, [selectedVenue]);

  useEffect(() => {
    localStorage.setItem("selectedHall", JSON.stringify(selectedHall));
  }, [selectedHall]);

  const searchPlaces = async (params?: { location?: string; guests?: number; startDate?: Date | null; endDate?: Date | null }) => {
    const searchLocation = params?.location || location;
    const searchGuests = params?.guests !== undefined ? params.guests : guests;
    const searchStartDate = params?.startDate !== undefined ? params.startDate : dates.startDate;
    const searchEndDate = params?.endDate !== undefined ? params.endDate : dates.endDate;
  
    try {
      const filteredVenues = allVenues.filter(place => place.address.toLowerCase().includes(searchLocation.toLowerCase()));
      setSearchResults(filteredVenues);
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

  const getFeaturedVenues = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}featured-places`);
      setFeaturedVenues(response.data);
    } catch (error) {
      console.error('Error fetching featured venues:', error);
    }
  };

  const getAllVenues = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}places`);
      const venuesWithMap = response.data.map((place: any) => ({
        ...place,
        map: {
          lat: place.latitude,
          lng: place.longitude
        }
      }));
      setAllVenues(venuesWithMap);
    } catch (error) {
      console.error('Error fetching all venues:', error);
    }
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
        selectedVenue,
        setSelectedVenue,
        selectedHall,
        setSelectedHall,
        featuredVenues,
        getFeaturedVenues,
        allVenues,
        getAllVenues,
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
