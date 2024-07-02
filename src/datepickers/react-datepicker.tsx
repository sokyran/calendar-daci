import { useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';
import "./react-datepicker.css";

import { useClickAway } from "@uidotdev/usehooks";

registerLocale('es', es);

export const DatePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsActive(false);
  });

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const setToday = () => {
    setStartDate(new Date());
    setEndDate(new Date());
  }

  const setPrevious7Days = () => {
    const today = new Date();
    const previous7Days = new Date(today);
    previous7Days.setDate(today.getDate() - 7);
    
    setStartDate(previous7Days);
    setEndDate(today);
  }

  const setPrevious30Days = () => {
    const today = new Date();
    const previous30Days = new Date(today);
    previous30Days.setDate(today.getDate() - 30);
    
    setStartDate(previous30Days);
    setEndDate(today);
  }

  const inputValue = `${startDate?.toLocaleString()} - ${endDate?.toLocaleString()}`;

  const dateAfter1Month = new Date();
  dateAfter1Month.setMonth(dateAfter1Month.getMonth() + 1);

  return (
    <div ref={ref}>
      <input
        value={inputValue}
        style={{ width: '300px', fontSize: '16px', padding: '4px'  }}
        onFocus={() => setIsActive(true)}
        placeholder="enter date"
        readOnly
      />
      {isActive && (
        <div style={{ display: 'flex' }}>
          <ReactDatePicker
            inline
            monthsShown={2}
            startDate={startDate}
            endDate={endDate}
            dateFormat="Pp"
            selectsRange
            shouldCloseOnSelect={false}
            closeOnScroll={false}
            onChange={onChange}
            onCalendarClose={() => setIsActive(false)}
            maxDate={dateAfter1Month}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button onClick={setToday}>Today</button>
            <button onClick={setPrevious7Days}>Previous 7 days</button>
            <button onClick={setPrevious30Days}>Previous 30 days</button>
          </div>
        </div>
      )}
    </div>
  );
};
