import { useSearchContext } from "context/search";
import React from "react";
import { ReactNode } from "react";

export interface Heading3Props {
  heading?: ReactNode;
  subHeading?: ReactNode;
  className?: string;
}

const Heading3: React.FC<Heading3Props> = ({
  className = "",
  heading,
  subHeading,
}) => {
  const { selectedVenue, guests, dates } = useSearchContext();

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  };

  const startDate = formatDate(dates.startDate);
  const endDate = formatDate(dates.endDate);

  if (!selectedVenue) {
    return null; // or you can return a placeholder if no venue is selected
  }

  return (
    <div className={`mb-12 lg:mb-16 ${className}`}>
      <h2 className="text-4xl font-semibold">
        Halls in {selectedVenue.name}
      </h2>
      {subHeading ? (
        subHeading
      ) : (
        <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
          {selectedVenue.halls.length} Halls
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

export default Heading3;
