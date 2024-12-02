export type PaymentStatusType = "PAGO" | "AGENDADO";



export type CalendarSellingType = {
  date: string; // YYYY-MM-DD format
  netValue: number;
  status: PaymentStatusType;
  type: string;
};

export const calendarSellingData: CalendarSellingType[] = [
  { date: "2022-12-21", netValue: 204.00, status: "PAGO", type: "success" },
  { date: "2024-11-01", netValue: 1233.00, status: "PAGO", type: "success" },
  { date: "2024-11-03", netValue: 1233.00, status: "AGENDADO", type: "success" },
  { date: "2024-11-07", netValue: 1233.00, status: "PAGO", type: "success" },
  { date: "2024-11-10", netValue: 1233.00, status: "PAGO", type: "success" },
  { date: "2024-11-12", netValue: 1233.00, status: "AGENDADO", type: "success" },
  { date: "2024-11-13", netValue: 1233.00, status: "AGENDADO", type: "success" },
  { date: "2024-11-15", netValue: 1233.00, status: "PAGO", type: "success" },
  { date: "2024-11-18", netValue: 1233.00, status: "AGENDADO", type: "success" },
  { date: "2024-11-18", netValue: 1233.00, status: "PAGO", type: "success" },
  { date: "2024-11-18", netValue: 1233.00, status: "AGENDADO", type: "success" },
  { date: "2024-11-18", netValue: 3.00, status: "PAGO", type: "success" },
  { date: "2024-11-18", netValue: 1233.00, status: "AGENDADO", type: "success" },
  { date: "2024-11-21", netValue: 1233.00, status: "PAGO", type: "success" },
  { date: "2024-11-25", netValue: 1233.00, status: "AGENDADO", type: "success" },
  { date: "2024-11-30", netValue: 1233.00, status: "PAGO", type: "success" },
  { date: "2024-12-29", netValue: 69.00, status: "AGENDADO", type: "success" },
  { date: "2025-01-22", netValue: 65.77, status: "AGENDADO", type: "success" },
];
