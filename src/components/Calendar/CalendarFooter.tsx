import { HTMLAttributes } from "react";
import { CalendarLegend, type CalendarLegendProps } from "./CalendarLegend";

interface CalendarFooterProps extends HTMLAttributes<HTMLDivElement> {
  legends: CalendarLegendProps[];
}

function CalendarFooter({ legends, ...rest }: CalendarFooterProps) {
  return (
    <footer className="calendar__footer" {...rest}>
      <ul className="calendar__footer__list flex items-center gap-2">
        {legends.map((legend) => (
          <CalendarLegend
            key={legend.label}
            label={legend.label}
            color={legend.color}
          />
        ))}
      </ul>
    </footer>
  );
}

export default CalendarFooter;
