
interface PaymentDetailsBoxItemProps {

    label: string
    value: string | number
}

function PaymentDetailBoxItem( { label, value }:PaymentDetailsBoxItemProps ) { 

    return (

        <div className="flex justify-between w-full items-baseline">
                    <span className="brightness-75 text-xs text-left">
                        {label}:
                    </span>

                    <span className="brightness-100 text-sm font-thin">
                        <strong>
                            { value || "0, 00" }
                        </strong>
                    </span>
                </div>
    )
}

export type { PaymentDetailsBoxItemProps }
export default PaymentDetailBoxItem