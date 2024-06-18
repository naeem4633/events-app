import DatePicker from "react-datepicker";
import React, { FC, useState, useEffect } from "react";
import DatePickerCustomHeaderTwoMonth from "components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "components/DatePickerCustomDay";
import { useSearchContext } from "context/search";

export interface StayDatesRangeInputProps {
  className?: string;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "",
}) => {
  const { dates, setDates } = useSearchContext();
  const [startDate, setStartDate] = useState<Date | null>(dates.startDate);
  const [endDate, setEndDate] = useState<Date | null>(dates.endDate);

  useEffect(() => {
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
  }, [dates]);

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setDates({ startDate: start, endDate: end }); // Update context
  };

  return (
    <div>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {` When's your Event?`}
        </span>
      </div>
      <div
        className={`relative flex-shrink-0 flex justify-center z-10 py-5 ${className} `}
      >
        <DatePicker
          selected={startDate}
          onChange={onChangeDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={2}
          showPopperArrow={false}
          inline
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
          renderDayContents={(day, date) => (
            <DatePickerCustomDay dayOfMonth={day} date={date} />
          )}
        />
      </div>
    </div>
  );
};

export default StayDatesRangeInput;
