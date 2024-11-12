import CalendarDay from "./CalendarDay";
import { WeekDay } from "../../types"; // Define types for weekdays in a types file if needed

interface CalendarGridProps {
  weekDays: WeekDay[];
  daysArray: (number | null)[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
  checkIfHasSalesInTheDay: (
    day: number
  ) => { hasSale: boolean; status?: string } | null;
}

function CalendarGrid({
  weekDays,
  daysArray,
  selectedDay,
  onSelectDay,
  checkIfHasSalesInTheDay,
}: CalendarGridProps) {

  return (
    <div className="calendar__grid">
      <section className="calendar__grid__weekdays grid grid-cols-7">
        {weekDays.map((item) => (
          <div key={item.numberInTheWeek} title={item.fullName}>
            {item.shortName}
          </div>
        ))}
      </section>
      <section className="calendar__grid__monthdays grid grid-cols-7">
        {daysArray.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            selectedDay={selectedDay}
            hasSaleInfo={day ? checkIfHasSalesInTheDay(day) : null}
            onSelectDay={() => onSelectDay(day as number)}
          />
        ))}
      </section>
    </div>
  );
}

export default CalendarGrid;
