import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useSearchContext } from "context/search";
import { UserPlusIcon } from "@heroicons/react/24/outline";

export interface GuestsInputProps {
  className?: string;
}

const GuestsInput: FC<GuestsInputProps> = ({
  className = "",
}) => {
  const { guests, setGuests } = useSearchContext();
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState<string>(guests.toString());

  useEffect(() => {
    setGuestAdultsInputValue(guests.toString());
  }, [guests]);

  const handleChangeData = (value: string) => {
    setGuestAdultsInputValue(value);
    setGuests(parseInt(value));
  };

  const handleBlur = () => {
    let parsedValue = parseInt(guestAdultsInputValue);
    if (isNaN(parsedValue)) {
      parsedValue = 50;
    } else if (parsedValue < 50) {
      parsedValue = 50;
    } else if (parsedValue > 1000) {
      parsedValue = 1000;
    }
    setGuestAdultsInputValue(parsedValue.toString());
    setGuests(parsedValue);
  };

  return (
    <div className={`flex flex-col relative p-5 ${className}`}>
      <span className="mb-5 block font-semibold text-xl sm:text-2xl">
        {`Who's coming?`}
      </span>
      <div className="relative flex items-center">
        <div className="text-neutral-300 dark:text-neutral-400">
          <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow flex items-center justify-between">
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {"Guests"}
          </span>
          <input
            className="w-fit block xl:text-lg font-semibold w-full text-center border px-4 py-3 rounded-xl"
            type="text"
            value={guestAdultsInputValue}
            onChange={(e) => handleChangeData(e.target.value)}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default GuestsInput;
