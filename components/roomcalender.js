import { useState } from "react";
import { DayPickerRangeController } from "react-dates";
import moment from "moment";

export default function RoomCalender({ dates, setDates }) {
  const defaultFocusedInput = "startDate";
  const [focusedInput, setFocusedInput] = useState(defaultFocusedInput);
  const defaultMinDate = new Date(2022, 7, 16);

  const handleDatesChange = (dates) => {
    setDates(dates);
  };

  const onFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
  };
  return (
    <div className="text-center hidden lg:block text-lg text-semibold">
      <DayPickerRangeController
        startDate={dates.startDate}
        endDate={dates.endDate}
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput || defaultFocusedInput}
        onFocusChange={onFocusChange}
        numberOfMonths={2}
        minimumNights={3}
        enableOutsideDays={false}
        isOutsideRange={(day) => day.isBefore(moment().add(0, "days"))}
        //initialVisibleMonth={() => null} // PropTypes.func or null,
      />
      ;
    </div>
  );
}
