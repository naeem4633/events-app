import React, { createContext, useState, FC, ReactNode } from "react";

// Define the shape of your context data
interface SearchContextType {
  location: string;
  setLocation: (location: string) => void;
  guests: number;
  setGuests: (guests: number) => void;
  dates: { startDate: Date | null; endDate: Date | null };
  setDates: (dates: { startDate: Date | null; endDate: Date | null }) => void;
}

// Create the context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Create a provider component
export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(50);
  const [dates, setDates] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null
  });

  return (
    <SearchContext.Provider
      value={{
        location,
        setLocation,
        guests,
        setGuests,
        dates,
        setDates
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
