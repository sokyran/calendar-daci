import { DayPicker, DatePicker, Calendar, Dayzed } from "./datepickers";

import "./styles.css";

export default function App() {
  return (
    <div className="App" style={{ width: "100%" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', width: '100%', alignItems: 'center' }}>
        <span>
          <h3>react-day-picker</h3>
          <DayPicker />
        </span>

        <span>
          <h3>react-datepicker</h3>
          <DatePicker />
        </span>

        <span>
          <h3>react-calendar</h3>
          <Calendar />
        </span>

        <span>
          <h3>dayzed</h3>
          <Dayzed />
        </span>
      </div>
    </div>
  );
}
