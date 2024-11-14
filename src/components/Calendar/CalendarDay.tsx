interface CalendarDayProps {
  day: number | null;
  selectedDay: number;
  hasSaleInfo: { hasSale: boolean; status?: string } | null;
  onSelectDay: () => void;
}

function CalendarDay({
  day,
  selectedDay,
  hasSaleInfo,
  onSelectDay,
}: CalendarDayProps) {
  return (
    <div
      role="button"
      tabIndex={day ? 0 : -1}
      className={`calendar__day ${
        day && selectedDay === day ? "calendar__day--selected" : ""
      }`}
      onClick={day ? onSelectDay : undefined}
    >
      {day}
    </div>
  );
}

export default CalendarDay;
