import React, { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import ClearDataButton from "./ClearDataButton";
import ButtonSubmit from "./ButtonSubmit";

interface GuestsInputProps {
  onGuestsChange: (guests: number) => void;
  fieldClassName?: string;
  className?: string;
  buttonSubmitHref?: string;
  hasButtonSubmit?: boolean;
}

const GuestsInput: React.FC<GuestsInputProps> = ({
  onGuestsChange,
  fieldClassName = "nc-hero-field-padding",
  className = "nc-flex-1",
  buttonSubmitHref = "/listing-stay-map",
  hasButtonSubmit = true,
}) => {
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState("50");

  const handleChangeData = (value: string) => {
    setGuestAdultsInputValue(value);
    onGuestsChange(Number(value));
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
    onGuestsChange(parsedValue);
  };

  return (
    <div className={`flex relative ${className}`}>
      <div className={`flex-1 z-10 flex items-center focus:outline-none`}>
        <div
          className={`relative z-10 flex-1 flex text-left items-center ${fieldClassName} space-x-3 focus:outline-none`}
          onClickCapture={() => document.querySelector("html")?.click()}
        >
          <div className="text-neutral-300 dark:text-neutral-400">
            <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
          </div>
          <div className="flex-grow">
            <input
              className="block xl:text-lg font-semibold w-16 text-center"
              type="text"
              value={guestAdultsInputValue}
              onChange={(e) => handleChangeData(e.target.value)}
              onBlur={handleBlur}
            />
            <span className="block mt-1 ml-2 text-sm text-neutral-400 leading-none font-light">
              {"Guests"}
            </span>
          </div>
          {hasButtonSubmit && (
            <div className="pr-2 xl:pr-4">
              <ButtonSubmit href={buttonSubmitHref} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestsInput;
