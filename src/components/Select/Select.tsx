import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";

type keyValueOptions = { key: string, value?: string | number }

interface SelectProps extends HTMLAttributes<HTMLSelectElement>{

    placeholder?: string
    options: string[] | keyValueOptions[]
}

export default function Select( { placeholder, options }:SelectProps ) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState(placeholder || options[0] || "Selecione uma opção")

    const dropDownRef = useRef<HTMLDivElement>(null)

    const toggleDropDown = () => setIsOpen(!isOpen)

    useEffect(() => {

        const handleClickOutside = (event: Event) => {

            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {

                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleOptionClick = (option: string) => {

        setSelectedOption(option)
        setIsOpen(false)

        
    }

    return (

        <div role="combobox" ref={dropDownRef} aria-haspopup="listbox" aria-expanded={isOpen}>
            <button>
                {selectedOption as ReactNode}
            </button>

            <ul role="listbox">
                <li>
                    Option 1
                </li>

                <li>
                    Option 2
                </li>
            </ul>
        </div>
    )
}