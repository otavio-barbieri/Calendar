export type PaymentStatusType = "paid" | "scheduled"

export type mockValuesType = {

    date: string
    value: number
    status: PaymentStatusType
    hasHoliday?: boolean
    ISODate?: string
}

export const mockValues: mockValuesType[] = [
    { date: "21/12/2022", value: 204.00, status: "paid" },
    { date: "01/11/2024", value: 1233.00, status: "paid" },
    { date: "03/11/2024", value: 1233.00, status: "scheduled" },
    { date: "07/11/2024", value: 1233.00, status: "paid" },
    { date: "10/11/2024", value: 1233.00, status: "paid" },
    { date: "12/11/2024", value: 1233.00, status: "scheduled" },
    { date: "13/11/2024", value: 1233.00, status: "scheduled" },
    { date: "15/11/2024", value: 1233.00, status: "paid", hasHoliday: true },
    { date: "18/11/2024", value: 1233.00, status: "scheduled" },
    { date: "21/11/2024", value: 1233.00, status: "paid" },
    { date: "25/11/2024", value: 1233.00, status: "scheduled" },
    { date: "30/11/2024", value: 1233.00, status: "paid" },
    { date: "29/12/2024", value: 69.00, status: "scheduled"},
    { date: "22/01/2025", value: 65.77, status: "scheduled"}
]