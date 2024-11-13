import { HTMLAttributes } from "react"

import type { PaymentDetailsBoxItemProps } from "./PaymentDetailBoxItem"

import PaymentDetailBoxItem from "./PaymentDetailBoxItem"

interface PaymentDetailBoxProps extends HTMLAttributes<HTMLDivElement> {

    date: string
    keyAndValues: PaymentDetailsBoxItemProps[]
}

export default function PaymentDetailBox({ date, keyAndValues, ...rest }: PaymentDetailBoxProps) {

    return (

        <aside className="border w-full md:max-w-60 flex self-start flex-row md:flex-col items-baseline md:items-stretch rounded-md px-6 py-4 gap-4 md:gap-6" {...rest}>
            <header className="text-start">
                <small className="brightness-90 font-light text-wrap">
                    Detalhes de pagamento
                </small>

                <h4 className="font-semibold text-sm">
                    { date || "15/01/2024" }
                </h4>
            </header>

            <div role="separator" className="w-[1px] md:w-0 rounded-lg self-stretch bg-white"></div>

            <div className="grid gap-1 flex-1">
                {keyAndValues.map((item, idx) => (

                    <PaymentDetailBoxItem
                        key={item.label + idx}
                        label={item.label}
                        value={item.value}
                        isHighlighted={item.isHighlighted}
                    />
                ))}
            </div>
        </aside>
    )
}