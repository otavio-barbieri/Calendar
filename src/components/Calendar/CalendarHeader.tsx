import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface CalendarHeaderProps {
  currentMonth: number;
  currentYear: number;
  months: string[];
  onMonthChange: (direction: "prev" | "next") => void;
  onYearChange: (year: number) => void;
  onMonthSelect: (month: number) => void;
}

function CalendarHeader({
  currentMonth,
  currentYear,
  months,
  onMonthChange,
  onYearChange,
  onMonthSelect,
}: CalendarHeaderProps) {

  return (
    <header className="calendar__header flex justify-between items-center mb-3">
      <div className="calendar__month-year w-fit flex flex-col items-end">
        <h2 className="calendar__title">
          <select
            className="calendar__select"
            value={currentMonth}
            onChange={(e) => onMonthSelect(parseInt(e.target.value))}
          >
            {months.map((item, idx) => (
              <option key={idx} value={idx}>
                {item}
              </option>
            ))}
          </select>
        </h2>
        <small>
          <select
            className="calendar__select calendar__select--small"
            value={currentYear}
            onChange={(e) => onYearChange(parseInt(e.target.value))}
          >
            {[...Array(50)].map((_, i) => (
              <option key={i} value={1999 + i}>
                {1999 + i}
              </option>
            ))}
          </select>
        </small>
      </div>
      <div className="calendar__controls w-fit space-x-1">
        <button onClick={() => onMonthChange("prev")}>
          <FaAngleLeft />
        </button>
        <button onClick={() => onMonthChange("next")}>
          <FaAngleRight />
        </button>
      </div>
    </header>
  );
}

export default CalendarHeader;
