import { HTMLAttributes } from "react";

interface CalendarLegendProps extends HTMLAttributes<HTMLLIElement> {
  label: "agendado" | "pago" | "feriado" | "pendente" | string;
  color: "bg-red-500" | "bg-green-500" | "bg-yellow-500" | "bg-gray-500";
}

function CalendarLegend( { color, label, ...rest }:CalendarLegendProps ) {
  return (
    <li id={label} data-label={label} {...rest}>
      <div className="calendar__legend flex items-baseline gap-1 leading-none">
        <span className={`calendar__legend__icon rounded-full bg-gray-500 border block w-2 h-2 ${color}`}></span>
        <small className="brightness-50">{label}</small>
      </div>
    </li>
  );
}

export { CalendarLegend, type CalendarLegendProps };