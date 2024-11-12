import CalendarRoot from "./CalendarRoot"
import CalendarHeader from "./CalendarHeader"
import CalendarGrid from "./CalendarGrid"
import CalendarDay from "./CalendarDay"
import CalendarFooter from "./CalendarFooter"

export { default as CalendarRoot } from "./CalendarRoot"
export { default as CalendarFooter } from "./CalendarFooter"

const Calendar = {

    Root: CalendarRoot,
    Header: CalendarHeader,
    Grid: CalendarGrid,
    Day: CalendarDay,
    Footer: CalendarFooter,
}

export { Calendar }