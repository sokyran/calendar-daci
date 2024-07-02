import { useState } from "react";
import { format } from 'date-fns';
import { DateRange, DayPicker as ReactDayPicker } from "react-day-picker";
import { useClickAway } from "@uidotdev/usehooks";
import "./react-day-picker.css";

export function DayPicker() {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState<DateRange>();

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsActive(false);
  });

  const fmtDate = (date: Date | undefined) => date ? format(date, 'dd MMM yyyy HH:mm') : 'empty';

  const formattedSelected = selected 
    ? `${fmtDate(selected.from)} - ${fmtDate(selected.to)}` 
    : 'empty';

  const setToToday = () => {
    setSelected({ from: new Date(), to: new Date() });
  }

  const setPrevious7Days = () => {
    const today = new Date();
    const previous7Days = new Date(today);
    previous7Days.setDate(today.getDate() - 7);
    setSelected({ from: previous7Days, to: today });
  }

  const setPrevious30Days = () => {
    const today = new Date();
    const previous30Days = new Date(today);
    previous30Days.setDate(today.getDate() - 30);
    setSelected({ from: previous30Days, to: today });
  }

  const setTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const date = selected?.from ?? new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    setSelected({ from: date, to: selected?.to });
  }

  return (
    <div ref={ref} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
      <input
        style={{ width: '300px', fontSize: '16px', padding: '4px' }}
        onFocus={() => setIsActive(true)}
        placeholder="enter date"
        value={formattedSelected}
        readOnly
      />
      {isActive && (
        <div className="rdp-container">
          <ReactDayPicker
            mode="range"
            selected={selected}
            onSelect={setSelected}
            toDate={new Date()}
            numberOfMonths={2}
            showOutsideDays
          />
          <div style={{ width: '100px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '4px' }}>
            <button onClick={setToToday}>Today</button>
            <button onClick={setPrevious7Days}>Previous 7 days</button>
            <button onClick={setPrevious30Days}>Previous 30 days</button>

            <input type="time" onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>
      )}
    </div>
  );
}
