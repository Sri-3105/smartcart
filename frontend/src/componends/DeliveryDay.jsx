import { useEffect, useState } from "react";

const DELIVERY_DAYS = 3; // standard delivery time

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// First given weekday (0 = Sunday ... 6 = Saturday) on or after `from`
const nextWeekday = (from, weekday) => {
  const diff = (weekday - from.getDay() + 7) % 7;
  return addDays(from, diff);
};

// "Tuesday — 6 October 2026"
const formatLabel = (date) =>
  `${WEEKDAYS[date.getDay()]} — ${date.getDate()} ${
    MONTHS[date.getMonth()]
  } ${date.getFullYear()}`;

// "2026-10-06" (local date, safe to send to backend)
const formatISO = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

function DeliveryDay({ onChange }) {
  const [today] = useState(() => new Date());

  const [mode, setMode] = useState("standard"); // "standard" | "weekend"
  const [weekendDay, setWeekendDay] = useState("saturday");

  const standardDate = addDays(today, DELIVERY_DAYS);
  const saturdayDate = nextWeekday(standardDate, 6);
  const sundayDate = nextWeekday(standardDate, 0);

  let selectedDate = standardDate;

  if (mode === "weekend") {
    selectedDate = weekendDay === "saturday" ? saturdayDate : sundayDate;
  }

  const selectedLabel = formatLabel(selectedDate);

  // Tell Checkout page which delivery day is selected
  useEffect(() => {
    if (onChange) {
      onChange({
        label: selectedLabel,
        date: formatISO(selectedDate),
        type: mode === "standard" ? "Standard" : "Weekend",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLabel, mode]);

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Choose Delivery Day</h2>

      {/* Option 1: normal delivery in 3 days */}
      <label style={styles.option}>
        <input
          type="radio"
          name="deliveryMode"
          style={styles.radio}
          checked={mode === "standard"}
          onChange={() => setMode("standard")}
        />
        <span>
          <strong>Delivery in {DELIVERY_DAYS} days</strong>
          <br />
          <span style={styles.date}>{formatLabel(standardDate)}</span>
        </span>
      </label>

      {/* Option 2: only if customer wants weekend */}
      <label style={styles.option}>
        <input
          type="radio"
          name="deliveryMode"
          style={styles.radio}
          checked={mode === "weekend"}
          onChange={() => setMode("weekend")}
        />
        <span>
          <strong>I want Saturday / Sunday delivery only</strong>
          <br />
          <span style={styles.hint}>Choose a weekend day below</span>
        </span>
      </label>

      {mode === "weekend" && (
        <div style={styles.weekendBox}>
          <label style={styles.subOption}>
            <input
              type="radio"
              name="weekendDay"
              style={styles.radio}
              checked={weekendDay === "saturday"}
              onChange={() => setWeekendDay("saturday")}
            />
            <span>{formatLabel(saturdayDate)}</span>
          </label>

          <label style={styles.subOption}>
            <input
              type="radio"
              name="weekendDay"
              style={styles.radio}
              checked={weekendDay === "sunday"}
              onChange={() => setWeekendDay("sunday")}
            />
            <span>{formatLabel(sundayDate)}</span>
          </label>
        </div>
      )}

      <p style={styles.selected}>Selected delivery: {selectedLabel}</p>
    </div>
  );
}

const styles = {
  card: {
    background: "#1f1b3a",
    border: "1px solid #332d57",
    borderRadius: "16px",
    padding: "24px",
    color: "#fff",
    marginBottom: "20px",
  },
  title: {
    margin: "0 0 16px",
    paddingBottom: "14px",
    borderBottom: "1px solid #332d57",
    fontSize: "20px",
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: "#2a2442",
    border: "1px solid #3a3358",
    borderRadius: "10px",
    padding: "14px 16px",
    marginBottom: "12px",
    cursor: "pointer",
    lineHeight: 1.5,
  },
  radio: {
    accentColor: "#1fd1a5",
    width: "18px",
    height: "18px",
    cursor: "pointer",
  },
  date: {
    color: "#c9c4e8",
    fontSize: "14px",
  },
  hint: {
    color: "#9e98c4",
    fontSize: "13px",
  },
  weekendBox: {
    marginLeft: "24px",
    marginBottom: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  subOption: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#241f3d",
    border: "1px solid #3a3358",
    borderRadius: "10px",
    padding: "12px 16px",
    cursor: "pointer",
  },
  selected: {
    margin: "8px 0 0",
    fontSize: "13px",
    color: "#9e98c4",
  },
};

export default DeliveryDay;