import { ReactNode, useMemo, useState } from "react";
import "./calendar.css";
import { mockValues, type mockValuesType, PaymentStatusType } from "../../data/mockValues";
import PaymentDetailBox from "../PaymentDetailBox/PaymentDetailBox";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

enum WeekDays {

  "domingo", "segunda-Feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"
}

type WeekDay = {
  shortName: string;
  fullName: string;
  numberInTheWeek: number;
  isVacationDay?: boolean
};

export type PaymentDays = {

  date: string
  value: number
  ISODate: string
  hasHoliday?: boolean
  paidValues?: number[]
  scheduledValues?: number[]
}

export default function CalendarRoot() {

  console.log("Re-rendered")

  const [currentDate, setCurrentDate] = useState(new Date());
  const selectedDay = currentDate.getDate()

  const transformIncomingDataIntoPaymentStucuture = (arr: mockValuesType[]): PaymentDays[] => {

    return arr.map((item, _idx) => ({

        date: item.date,
        value: item.value,
        ISODate: item.ISODate || convertDMYToISO(item.date),
        hasHoliday: item.hasHoliday,
        paidValues: item.status === "paid" ? [item.value] : [],
        scheduledValues: item.status === "scheduled" ? [item.value] : []
      }
    ))
  }

  const convertDMYToISO = (date: string) => {

    const [day, month, year] = date.split("/")

    return `${year}-${month}-${day}`
  }

  const salesArray = useMemo(() => transformIncomingDataIntoPaymentStucuture(mockValues), [mockValues])

  const weekDays: WeekDay[] = [
    { fullName: "Domingo", shortName: "Dom", numberInTheWeek: 0, isVacationDay: true },
    { fullName: "Segunda-feira", shortName: "Seg", numberInTheWeek: 1, isVacationDay: false },
    { fullName: "Terça-feira", shortName: "Ter", numberInTheWeek: 2, isVacationDay: false },
    { fullName: "Quarta-feira", shortName: "Qua", numberInTheWeek: 3, isVacationDay: false },
    { fullName: "Quinta-feira", shortName: "Qui", numberInTheWeek: 4, isVacationDay: false },
    { fullName: "Sexta-feira", shortName: "Sex", numberInTheWeek: 5, isVacationDay: false },
    { fullName: "Sábado", shortName: "Sab", numberInTheWeek: 6, isVacationDay: true },
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

  const generateArrayOfYears = (startYear: number, rangeInYears: number = 20): number[] => Array.from({ length: rangeInYears }, (_, idx) => startYear + idx);

  const changeDay = (newDay: number) => {

    const updatedDate = new Date(currentDate);

    updatedDate.setDate(newDay);

    setCurrentDate(updatedDate);
  }

  const generateDateToCheckWithISOFormat = (day: number) => new Date(currentYear, currentMonth, day).toISOString().split("T")[0];

  /**
   * 
   * @param  day - A number representing the day wich is intended to search for sales
   * @returns If the giving day has a sale or not
   */
  const checkIfHasSalesInTheDay = (day: number): { hasSale: boolean, status?: PaymentStatusType } | null => {

    try {

      const dateToCheck = generateDateToCheckWithISOFormat(day)
      const sale = salesArray.find((daysWithSale) => daysWithSale.ISODate === dateToCheck)

      if (sale) {

        const status = sale.paidValues?.length ? "paid" : sale.scheduledValues?.length ? "scheduled" : undefined

        return { hasSale: true, status }
      }

      return { hasSale: false};

    } catch (err) {

      console.error(err);

      return null;
    }
  };


  /* const concatenateSalesWithSameStatus = (salesArr: PaymentDays[]) => {
    return salesArr.reduce((acc, current, idx) => {

      const dateToMatch = convertDMYToISO(current.date);
      const existingEntry = [acc].find((item) => item.ISODate === dateToMatch)

      if (existingEntry) {

        existingEntry.value += current.value

        if (mockValues[idx].status === "paid") {

          existingEntry.paidValues = [...(existingEntry.paidValues || []), current.value]
        } else if (mockValues[idx].status === "scheduled") {

          existingEntry.scheduledValues = [...(existingEntry.scheduledValues || []), current.value]
        }
      } else {

        [acc].push({

          ...current,
          ISODate: dateToMatch,
          paidValues: mockValues[idx].status === "paid" ? [current.value] : [],
          scheduledValues: mockValues[idx].status === "scheduled" ? [current.value] : []
        })
      }

      return acc
    })
  }

  console.log(concatenateSalesWithSameStatus(salesArray)) */

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
            {generateDaysArray().map((day, index) => {

              const dayInfo = day ? checkIfHasSalesInTheDay(Number(day)) : null

              return (

                <div
                  role="button"
                  tabIndex={day ? 0 : -1}
                  key={index}
                  {...(dayInfo?.hasSale ? { "data-sale": "true" } : {})}
                  {...day && selectedDay === Number(day) ? { "data-selected": "true" } : {}}
                  {...dayInfo?.status === "paid" ? { "data-status": "paid"} : { "data-status": "scheduled"}}
                  className={`calendar__day px-4 brightness-90 hover:opacity-75 w-[2ch] data-[selected="true"]:border-2 data-[selected="true"]:text-black data-[selected="true"]:bg-white rounded-md aspect-square flex items-center justify-center transition-opacity duration-500 data-[sale="true"]:after:bg-green-500 data-[sale="scheduled"]:after:bg-gray-300 ${day === null ? "empty:pointer-events-none" : ""} `}
                  onClick={() => changeDay(day as number)}
                  title={day ? `${day} de ${months[currentMonth]} ${currentYear}` : undefined}
                >
                  {day as unknown as ReactNode}
                </div>
                )
            }
            )}
          </section>
        </div>

        <footer className="calendar__footer">
          <ul className="calendar__footer__list flex items-center gap-2">

            <li><div className="calendar__legend flex items-baseline gap-1 leading-none"><span className="calendar__legend__icon rounded-full bg-green-500 block w-2 h-2"></span><small className="brightness-50">pago</small></div></li>

            <li><div className="calendar__legend flex items-baseline gap-1 leading-none"><span className="calendar__legend__icon rounded-full bg-gray-500 border block w-2 h-2"></span><small className="brightness-50">a receber</small></div></li>
          </ul>
        </footer>
      </article>

      <PaymentDetailBox
        keyAndValues={[{ label: "Total", value: "69.90" }, { label: "Pago", "value": "69.99" }]}
        date={currentDate.toLocaleDateString("pt-br")}

      />
    </div>
  );
}
