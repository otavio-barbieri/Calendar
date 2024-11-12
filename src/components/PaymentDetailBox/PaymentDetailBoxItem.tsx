
interface PaymentDetailsBoxItemProps {

    label: string
    value: string | number | number[] | undefined
    isHighlighted?: boolean
}

function PaymentDetailBoxItem({ label, value, isHighlighted }: PaymentDetailsBoxItemProps) {

    const formattedValue = typeof value === 'number' ? value.toFixed(2) : value + ".00"

    return (

        <div className="flex justify-between w-full items-baseline">
            <span className={`brightness-75 text-xs text-left ${isHighlighted && 'font-semibold'}`}>
                {label}:
            </span>

            <span className="text-xs font-thin">
                <strong>
                    {formattedValue || 0}
                </strong>
            </span>
        </div>
    )
}

export type { PaymentDetailsBoxItemProps }
export default PaymentDetailBoxItem