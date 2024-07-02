import { useState } from 'react';
import { useDayzed, type RenderProps } from 'dayzed';
import { useClickAway } from '@uidotdev/usehooks';
import { format } from 'date-fns';

import './dayzed.css';

// Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
const monthNamesShort = [...Array(12).keys()].map(i => format(new Date(2021, i, 1), 'MMM'));
// Sun, Mon, Tue, Wed, Thu, Fri, Sat
const weekdayNamesShort = [...Array(7).keys()].map(i => format(new Date(2021, 0, i+3), 'EEE'));

const Calendar = (props: RenderProps) => {
  const { calendars, getBackProps, getForwardProps, getDateProps } = props;

  if (calendars.length) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div>
          <button {...getBackProps({ calendars })}>Back</button>
          <button {...getForwardProps({ calendars })}>Next</button>
        </div>
        {calendars.map(calendar => (
          <div key={`${calendar.month}${calendar.year}`} className="container">
            <p>{monthNamesShort[calendar.month]} {calendar.year}</p>
            <div className="grid-row">
              {weekdayNamesShort.map(weekday => (
                <div key={`${calendar.month}${calendar.year}${weekday}`}>
                  {weekday}
                </div>
              ))}
            </div>
            <div className="grid-row">
              {calendar.weeks.map((week, weekIndex) =>
                week.map((dateObj, index) => {
                  const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                  if (!dateObj) {
                    return (
                      <div key={key} className="cell" />
                    );
                  }
                  const { date, selected, selectable, today, prevMonth, nextMonth } = dateObj;
                  let background = today ? 'cornflowerblue' : '';
                  background = (prevMonth || nextMonth) ? 'lightgray' : background;
                  background = selected ? 'purple' : background;
                  background = !selectable ? 'teal' : background;
                  return (
                    <button
                      className="cell"
                      style={{
                        background
                      }}
                      key={key}
                      {...getDateProps({ dateObj })}
                    >
                      {selectable ? date.getDate() : 'X'}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export const Dayzed = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | Date[]>();

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsActive(false);
  });

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  const dayzedData = useDayzed({
    showOutsideDays: true,
    maxDate,
    selected: selectedDate,
    onDateSelected: ({ selectable, selected, date }) => {
      console.log({ selectable, selected, date });
      setSelectedDate(date);
    },
  });

  return (
    <div ref={ref}>
      <input
        style={{ width: '300px', fontSize: '16px', padding: '4px' }}
        onFocus={() => setIsActive(true)}
        placeholder="enter date"
        value={selectedDate?.toLocaleString()}
        readOnly
      />
      {isActive && (
        <>
          <Calendar {...dayzedData} />
          {selectedDate && (
            <div style={{ paddingTop: 20, textAlign: 'center' }}>
              <p>Selected:</p>
              <p>{`${selectedDate.toLocaleString()}`}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
