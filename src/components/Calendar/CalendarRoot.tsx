import { ReactNode, useState } from "react";
import { } from "react-icons"
import "./calendar.css";
import { mockValues } from "../../data/mockValues";
import PaymentDetailBox from "../PaymentDetailBox/PaymentDetailBox";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type WeekDay = {
  shortName: string;
  fullName: string;
  numberInTheWeek: number;
};

export default function CalendarRoot() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const selectedDay = currentDate.getDate()

  const convertDMYDateFormatToISO = (dateArray: { date: string, value: number }[]) => {

    return dateArray.map(item => {

      const [ day, month, year ] = item.date.split("/")

      return {
        date: `${year}-${month}-${day}`,
        value: item.value
      }
    })
  }

  const salesArray = convertDMYDateFormatToISO(mockValues)

  const weekDays: WeekDay[] = [
    { fullName: "Domingo", shortName: "Dom", numberInTheWeek: 0 },
    { fullName: "Segunda-feira", shortName: "Seg", numberInTheWeek: 1 },
    { fullName: "Terça-feira", shortName: "Ter", numberInTheWeek: 2 },
    { fullName: "Quarta-feira", shortName: "Qua", numberInTheWeek: 3 },
    { fullName: "Quinta-feira", shortName: "Qui", numberInTheWeek: 4 },
    { fullName: "Sexta-feira", shortName: "Sex", numberInTheWeek: 5 },
    { fullName: "Sábado", shortName: "Sab", numberInTheWeek: 6 },
  ];

  const months = [...Array(12).keys()].map((key) =>
    new Date(0, key).toLocaleString("pt-br", { month: "long" })
  );

  const getCurrentMonthDetails = (date: Date) => {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    return { currentMonth, currentYear, firstDayOfMonth, daysInMonth };
  };

  const { currentMonth, currentYear, firstDayOfMonth, daysInMonth } =
    getCurrentMonthDetails(currentDate);

  const handleMonthChange = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  const generateDaysArray = () => {
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    const emptySpaces = Array.from({ length: firstDayOfMonth }).fill(null);
    return [...emptySpaces, ...days];
  };

  const generateArrayOfYears = (startYear: number, rangeInYears: number = 20): number[] => {
    return Array.from({ length: rangeInYears }, (_, idx) => startYear + idx);
  };

  const changeDay = (newDay: number) => {

    const updatedDate = new Date(currentDate)

    updatedDate.setDate(newDay)

    setCurrentDate(updatedDate)
  }

  const checkIfHasSalesInTheDay = (day: number) => {

    try {

      const dateToCheck = new Date(currentYear, currentMonth, day).toISOString().split("T")[0];

      return salesArray.some((daysWithSale) => {

        const saleDate = new Date(daysWithSale.date).toISOString().split("T")[0];

        return saleDate === dateToCheck;

      });
    } catch (err) {

      console.error(err);

      return false;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center">
      <article className="calendar p-4 rounded-lg border w-full min-w-[45dvw] grid gap-2">
        <header className="calendar__header flex justify-between items-center mb-3">
          <div className="calendar__month-year w-fit flex flex-col items-end">
            <h2 className="calendar__title">
              <select
                className="calendar__select hover:opacity-80 transition-opacity text-end text-lg cursor-pointer capitalize appearance-none border-none bg-transparent"
                role="heading"
                value={currentMonth}
                onChange={(e) =>
                  setCurrentDate(new Date(currentYear, parseInt(e.target.value), 1))
                }
              >
                {months.map((item, idx) => (
                  <option className="calendar__option text-black" key={idx} value={idx} aria-selected={currentMonth === idx}>
                    {item}
                  </option>
                ))}
              </select>
            </h2>
            <small>
              <select
                className="calendar__select calendar__select--small focus:outline-none appearance-none brightness-75 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
                value={currentYear}
                onChange={(e) =>
                  setCurrentDate(new Date(parseInt(e.target.value), currentMonth, 1))
                }
              >
                {generateArrayOfYears(1999, 100).map((item) => (
                  <option className="calendar__option" key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </small>
          </div>

          <div className="calendar__controls w-fit space-x-1">
            <button className="calendar__btn w-fit p-3 border rounded-md" title="Ver mês anterior" onClick={() => handleMonthChange("prev")}>
              <FaAngleLeft />
            </button>
            <button className="calendar__btn w-fit p-3 border rounded-md" title="Ver mês posterior" onClick={() => handleMonthChange("next")}>
              <FaAngleRight />
            </button>
          </div>
        </header>

        <div className="calendar__grid">
          <section className="calendar__grid__weekdays grid grid-cols-7">
            {weekDays.map((item) => (
              <div className="calendar__day calendar__month-day flex items-center justify-center brightness-75 mb-2 md:mb-4 " key={item.numberInTheWeek} title={item.fullName}>
                {item.shortName}
              </div>
            ))}
          </section>

          <section className="calendar__grid__monthdays gap-1 grid grid-cols-7 grid-rows-6 place-items-center">
            {generateDaysArray().map((day, index) => (
              <div
                role="button"
                tabIndex={day ? 0 : -1}
                key={index}
                {...(checkIfHasSalesInTheDay(Number(day)) ? { "data-sale": "true" } : {})}
                {...day && selectedDay === Number(day) ? { "data-selected": "true" } : {}}
                className={`calendar__day px-4 brightness-90 hover:opacity-75 w-[2ch] data-[selected="true"]:border-2 data-[selected="true"]:text-black data-[selected="true"]:bg-white rounded-md aspect-square flex items-center justify-center transition-opacity duration-500 data-[sale="true"]:after:bg-green-500 ${day === null ? "empty:pointer-events-none" : ""} `}
                onClick={() => changeDay(day as number)}
                title={day ? `${day} de ${months[currentMonth]} ${currentYear}` : undefined}
              >
                {day as unknown as ReactNode}
              </div>
            ))}
          </section>
        </div>

        <footer className="calendar__footer">
          <ul className="calendar__footer__list flex items-center gap-2">
            
            <li><div className="calendar__legend flex items-baseline gap-1 leading-none"><span className="calendar__legend__icon rounded-full bg-green-500 block w-2 h-2"></span><small className="brightness-50">devendo</small></div></li>
          </ul>
        </footer>
      </article>

      <PaymentDetailBox
        keyAndValues={[{label: "Total", value: "69.90"}, {label: "Valor a receber", "value": "69.99"} ]}
        date={currentDate.toLocaleDateString("pt-br")}
        
      />
    </div>
  );
}
