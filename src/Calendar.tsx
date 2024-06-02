import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  onDateChange: (date: Date | null) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="yyyy/MM/dd"
      placeholderText="Select Date"
      isClearable
      showYearDropdown
      scrollableMonthYearDropdown
    />
  );
};

export default Calendar;
