
interface PaymentDetailsBoxItemProps {

    label: string
    value: string | number | number[] | undefined
    isHighlighted?: boolean
}

function PaymentDetailBoxItem({ label, value, isHighlighted }: PaymentDetailsBoxItemProps) {

    const formattedValue = typeof value === 'number' ? value.toFixed(2) : value + ".00"

    return (

        <div 
            className={`flex justify-between w-full items-baseline ${isHighlighted ? 'text-sm font-semibold mt-0.5' : 'text-xs'}`}
        >
            <span 
                className="brightness-75 text-left"
            >
                {label}:
            </span>

            <span className={`${isHighlighted ? 'font-normal' : 'font-thin'}`}>
                <strong>
                    {formattedValue || 0}
                </strong>
            </span>
        </div>
    )
}

export type { PaymentDetailsBoxItemProps }
export default PaymentDetailBoxItem