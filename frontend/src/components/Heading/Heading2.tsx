import { useSearchContext } from "context/search";
import React from "react";
import { ReactNode } from "react";

export interface Heading2Props {
  heading?: ReactNode;
  subHeading?: ReactNode;
  className?: string;
}

const Heading2: React.FC<Heading2Props> = ({
  className = "",
  heading = "Stays in Tokyo",
  subHeading,
}) => {
  const { city, searchResults, guests, dates } = useSearchContext();

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  };

  const startDate = formatDate(dates.startDate);
  const endDate = formatDate(dates.endDate);

  return (
    <div className={`mb-12 lg:mb-16 ${className}`}>
      <h2 className="text-4xl font-semibold">Venues in {city}</h2>
      {subHeading ? (
        subHeading
      ) : (
        <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
          {searchResults.length} Venues
          {startDate && endDate && (
            <>
              <span className="mx-2">·</span>
              {startDate} - {endDate}
            </>
          )}
          <span className="mx-2">·</span>
          {guests} Guests
        </span>
      )}
    </div>
  );
};

export default Heading2;
