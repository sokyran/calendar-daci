import { useState } from "react";
import ReactCalendar from "react-calendar";
import { useClickAway } from "@uidotdev/usehooks";

import "./react-calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function Calendar() {
  const [isActive, setIsActive] = useState(false);
  const [value, onChange] = useState<Value>(new Date());

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsActive(false);
  });

  const fmtValue = (value: Value) => {
    if (Array.isArray(value)) {
      return value.map((v) => v?.toLocaleString()).join(' - ');
    }

    return value?.toLocaleString();
  }

  const inputValue = fmtValue(value);

  const setToday = () => {
    onChange(new Date());
  }

  const setPrevious7Days = () => {
    const today = new Date();
    const previous7Days = new Date(today);
    previous7Days.setDate(today.getDate() - 7);
    onChange([previous7Days, today]);
  }

  const setPrevious30Days = () => {
    const today = new Date();
    const previous30Days = new Date(today);
    previous30Days.setDate(today.getDate() - 30);
    onChange([previous30Days, today]);
  }

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
        <div className="container">
          <ReactCalendar
            selectRange
            showDoubleView
            minDetail="year"
            onChange={onChange}
            showNeighboringMonth={false}
            showFixedNumberOfWeeks={false}
            value={value}
          />
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <button onClick={setToday}>Today</button>
            <button onClick={setPrevious7Days}>Previous 7 days</button>
            <button onClick={setPrevious30Days}>Previous 30 days</button>
          </div>
        </div>
      )}
    </div>
  );
}
