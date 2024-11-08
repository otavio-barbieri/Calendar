import { mockValues } from "../data/mockValues.js";

const checkIfHasSalesInTheDay = (day) => {

    const dateToCheck = new Date(2024, 11,day).toISOString().split("T")[0];

    return mockValues.some((daysWithSale) => {

      const saleDate = new Date(daysWithSale.date).toISOString().split("T")[0];

      if (saleDate === dateToCheck) {

        console.log(`sale: ${saleDate} === date: ${dateToCheck}`)

        console.log(daysWithSale.value)
      }


      return saleDate === dateToCheck;

    })
};

checkIfHasSalesInTheDay(11) ? console.log("TRUE") : console.log("FALSE")