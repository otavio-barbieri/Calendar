import {
  ReactNode,
  useMemo,
  useState,
} from "react";

import "./calendar.css";

import {
  calendarSellingData,
  type CalendarSellingType,
  type PaymentStatusType,
} from "../../data/mockValues";

import PaymentDetailBox from "../PaymentDetailBox/PaymentDetailBox";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import CalendarFooter from "./CalendarFooter";
import Select, { type keyValueOptions } from "../Select/Select";
import { type WeekDay } from "../../types";

export type PaymentDays = {
  date: string;
  value: number;
  paidValues?: number[];
  scheduledValues?: number[];
};

interface CalendarRootProps {

  defaultDayOnChangeMonth?: number;
}

export default function CalendarRoot( { defaultDayOnChangeMonth = 1 }: CalendarRootProps ) {
  console.log("Re-rendered");

  const [currentDate, setCurrentDate] = useState(new Date());
  let selectedDay = currentDate.getDate();

  /**
   *
   * @param {CalendarSellingType} arr
   * @returns An array with the data properly converted to PaymentDays type.
   */
  const transformIncomingDataIntoPaymentStucuture = (
    arr: CalendarSellingType[]
  ): PaymentDays[] => {
    return arr.map((item) => ({
      date: item.date,
      value: item.netValue,
      ISODate: item.date,
      paidValues: item.status === "PAGO" ? [item.netValue] : [],
      scheduledValues: item.status === "AGENDADO" ? [item.netValue] : [],
    }));
  };

  /**
   * 
   * @param {Date} date 
   * @returns The passed date in the YYYY-MM-DD format.
   */
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  const salesArray = useMemo(
    () => transformIncomingDataIntoPaymentStucuture(calendarSellingData),
    [calendarSellingData]
  );

  console.log("SALES ARRAY", salesArray)

  const paymentDetailsBoxData = useMemo(() => {
    // Filter the sales data for the current day
    const filteredData = salesArray.filter(
      (item) => item.date === formatDate(currentDate)
    );

    // Calculate total paid and scheduled values
    const paidValues = filteredData.reduce((acc, payment) => {
      if (payment.paidValues) {
        return acc + payment.paidValues.reduce((sum, val) => sum + val, 0);
      }
      return acc;
    }, 0);

    const scheduledValues = filteredData.reduce((acc, payment) => {
      if (payment.scheduledValues) {
        return acc + payment.scheduledValues.reduce((sum, val) => sum + val, 0);
      }
      return acc;
    }, 0);

    return { paidValues, scheduledValues };
  }, [currentDate, salesArray]);

  console.log("This is PaymentData", paymentDetailsBoxData);

  const weekDays: WeekDay[] = [
    {
      fullName: "Domingo",
      shortName: "Dom",
      numberInTheWeek: 0,
      isVacationDay: true,
    },
    {
      fullName: "Segunda-feira",
      shortName: "Seg",
      numberInTheWeek: 1,
      isVacationDay: false,
    },
    {
      fullName: "Terça-feira",
      shortName: "Ter",
      numberInTheWeek: 2,
      isVacationDay: false,
    },
    {
      fullName: "Quarta-feira",
      shortName: "Qua",
      numberInTheWeek: 3,
      isVacationDay: false,
    },
    {
      fullName: "Quinta-feira",
      shortName: "Qui",
      numberInTheWeek: 4,
      isVacationDay: false,
    },
    {
      fullName: "Sexta-feira",
      shortName: "Sex",
      numberInTheWeek: 5,
      isVacationDay: false,
    },
    {
      fullName: "Sábado",
      shortName: "Sab",
      numberInTheWeek: 6,
      isVacationDay: true,
    },
  ];

  const months = [...Array(12).keys()].map((key) => ({
    label: new Date(0, key).toLocaleString("pt-br", { month: "long" }),
    value: key,
  }));

  /**
   * 
   * @param date - A Date obejct
   * @returns The date month, year, first day of the month and how many days the month has.
   */
  const getCurrentMonthDetails = (date: Date) => {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    return { currentMonth, currentYear, firstDayOfMonth, daysInMonth };
  };

  const { currentMonth, currentYear, firstDayOfMonth, daysInMonth } =
    getCurrentMonthDetails(currentDate);

    /**
     * Handles the change of the current month (going to the previous one or the next one). It also handles the reset of the selected day to the first day of the month.
     * @param {"prev" | "next"} direction (previous or next month)
     */
  const handleMonthChange = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);

    if (newDate.getDate() !== defaultDayOnChangeMonth) { newDate.setDate(defaultDayOnChangeMonth) }

    newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  /**
   * Create an array of empty spaces (days from the previous month) to adjust the order in the month and also returns an array of days from the selected month.
   * @returns {number[]}
   */
  const generateDaysArray = () => {
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    const emptySpaces = Array.from({ length: firstDayOfMonth }).fill(null);
    return [...emptySpaces, ...days];
  };

  /**
   * Generate an array of years from a starting point to a range x of years.
   * @param {number} startYear 
   * @param {number} rangeInYears 
   * @returns {number[]}
   */
  const generateArrayOfYears = (
    startYear: number,
    rangeInYears: number = 20
  ): number[] =>
    Array.from({ length: rangeInYears }, (_, idx) => startYear + idx);

  const changeDay = (newDay: number) => {
    const updatedDate = new Date(currentDate);
    updatedDate.setDate(newDay);
    setCurrentDate(updatedDate);
  };

  const generateDateToCheckWithISOFormat = (day: number) =>
    new Date(currentYear, currentMonth, day).toISOString().split("T")[0];

  const checkIfHasSalesInTheDay = (
    day: number
  ): { hasSale: boolean; status?: PaymentStatusType } | null => {
    try {
      const dateToCheck = generateDateToCheckWithISOFormat(day);
      const sale = salesArray.find(
        (daysWithSale) => daysWithSale.date === dateToCheck
      );
      if (sale) {
        const status = sale.paidValues?.length
          ? "PAGO"
          : sale.scheduledValues?.length
          ? "AGENDADO"
          : undefined;
        return { hasSale: true, status };
      }
      return { hasSale: false };

    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const keyValuesDate = useMemo(() => ({
    month: {
      label: currentDate.toLocaleDateString("pt-br", { month: "long" }),
      value: currentMonth,
    } as keyValueOptions,
    year: {
      label: currentDate.getFullYear().toString(),
      value: currentYear,
    } as keyValueOptions,
  }), [currentDate, currentMonth, currentYear]);

  console.log("KEY VALUES", keyValuesDate)

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center">
      <article className="calendar p-4 rounded-lg border w-full min-w-[45dvw] grid gap-2">
        {/* Calendar Header */}
        <header className="calendar__header flex justify-between items-center mb-3">
          <div className="calendar__month-year">
            <div className="flex flex-col w-[10ch] items-end">
              <Select
                variant="ghost"
                size="maxContent"
                spacing="tight"
                value={
                  keyValuesDate.month
                }
                options={months}
                onSelectChange={(value) =>
                  setCurrentDate(new Date(currentYear, parseInt(value as string), 1))
                }
              />
            
              <Select
                size="mini"
                variant="ghost"
                spacing="tight"
                //className="text-sm"
                value={
                  keyValuesDate.year
                }
                options={generateArrayOfYears(1999, 50).map((year) => ({
                  label: year.toString(),
                  value: year.toString(),
                }))}
                onSelectChange={(e) =>
                  setCurrentDate(new Date(parseInt(e as string), currentMonth, 1))
                }
              />
            </div>
          </div>
          {/* Month Navigation Controls */}
          <div className="calendar__controls w-fit space-x-1">
            <button
              className="calendar__btn w-fit p-3 border rounded-md"
              title="Ver mês anterior"
              onClick={() => handleMonthChange("prev")}
            >
              <FaAngleLeft />
            </button>
            <button
              className="calendar__btn w-fit p-3 border rounded-md"
              title="Ver mês posterior"
              onClick={() => handleMonthChange("next")}
            >
              <FaAngleRight />
            </button>
          </div>
        </header>

        {/* Calendar Grid */}
        <div className="calendar__grid">
          {/* Weekdays */}
          <section className="calendar__grid__weekdays grid grid-cols-7">
            {weekDays.map((item) => (
              <div
                className="calendar__day calendar__month-day flex items-center justify-center brightness-75 mb-2 md:mb-4 "
                key={item.numberInTheWeek}
                title={item.fullName}
              >
                {item.shortName}
              </div>
            ))}
          </section>

          {/* Month Days */}
          <section className="calendar__grid__monthdays gap-1 grid grid-cols-7 grid-rows-6 place-items-center">
            {generateDaysArray().map((day, index) => {
              const dayInfo = day ? checkIfHasSalesInTheDay(Number(day)) : null;

              return (
                <div
                  role="button"
                  tabIndex={day ? 0 : -1}
                  key={index}
                  {...(dayInfo?.hasSale ? { "data-sale": "true" } : {})} // Add the data-sale to the items that have a sale (paid or not)
                  {...(day && selectedDay === Number(day)
                    ? { "data-selected": "true" }
                    : {})}
                  {...(dayInfo?.status === "PAGO"
                    ? { "data-status": "paid" }
                    : { "data-status": "scheduled" })}
                  className={`calendar__day px-4 brightness-90 hover:opacity-75 w-[2ch] 
                    data-[selected="true"]:border-2 data-[selected="true"]:text-black data-[selected="true"]:bg-white data-[selected="true"]:focus-visible:outline-2 data-[selected="true"]:focus-visible:outline-black 
                    rounded-md aspect-square flex items-center justify-center transition-opacity duration-500

                    data-[status="paid"]:after:bg-green-500 
                    data-[status="scheduled"]:after:bg-gray-500
                    data-[status="pending"]:after:bg-yellow-500
                    data-[status="holiday"]:after:bg-red-500
                    ${
                    day === null ? "empty:pointer-events-none" : ""
                  }`}
                  onClick={() => changeDay(day as number)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      changeDay(day as number);
                    }
                  }}
                  title={
                    day
                      ? `${day} de ${months[currentMonth].label} ${currentYear}`
                      : undefined
                  }
                >
                  {day as unknown as ReactNode}
                </div>
              );
            })}
          </section>
        </div>

        {/* Calendar Footer with Legends */}
        <CalendarFooter
          legends={[
            { label: "pago", color: "bg-green-500" },
            { label: "agendado", color: "bg-gray-500" },
          ]}
        />
      </article>

      <PaymentDetailBox
        keyAndValues={[
          {
            label: "Agendado",
            value: paymentDetailsBoxData.scheduledValues || 0,
          },
          { label: "Pago", value: paymentDetailsBoxData.paidValues || 0 },
          {
            label: "Total",
            value:
              paymentDetailsBoxData.paidValues +
                paymentDetailsBoxData.scheduledValues || 0,
            isHighlighted: true,
          },
        ]}
        date={currentDate.toLocaleDateString("pt-br")}
      />
    </div>
  );
}
