import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";

type keyValueOptions = { key: string, value?: string | number };

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  options: string[] | keyValueOptions[];
  isModal?: boolean;
}

export default function Select({ placeholder, options, isModal }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState(placeholder || "Selecione uma opção");

  const dropDownRef = useRef<HTMLDivElement>(null);

  const toggleDropDown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: string | keyValueOptions) => {
    if (typeof option === "string") {
      setSelectedOption(option);
    } else {
      setSelectedOption(option.value ? option.value.toString() : option.key);
    }
    setIsOpen(false);
  };

  return (
    <>
    <div
      className="cursor-pointer w-min relative"  // Added relative positioning here
      role="combobox"
      ref={dropDownRef}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      <button className="border w-full rounded-md py-2 mb-3" onClick={toggleDropDown} aria-label="Select option">
        {selectedOption || placeholder}
      </button>
    </div>

    {isOpen && (
        <ul
          className="grid gap-1 py-5 p-2 border rounded-md absolute top-0 left-0 z-10"
          role="listbox"
          aria-labelledby="select-button"
        >
          {options.map((option, index) => (
            <li
              className="border rounded-md text-center py-2"
              key={index}
              role="option"
              onClick={() => handleOptionClick(option)}
              aria-selected={selectedOption === (typeof option === 'string' ? option : option.key)}
            >
              {typeof option === 'string' ? option : option.key}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
