import { HTMLAttributes, useEffect, useRef, useState } from "react";

type keyValueOptions = { key: string, value?: string | number };

interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  value?: string;
  options: string[] | keyValueOptions[];
  isModal?: boolean;
}

export default function Select({
  placeholder,
  options,
  value = "",
  ...rest
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<keyValueOptions>({
    key: value || placeholder || "Selecione uma opção",
    value: value,
  });
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const dropDownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const toggleDropDown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const handleOptionClick = (option: string | keyValueOptions) => {

    if (typeof option === "string") {
      setSelectedOption({ key: option, value: option });

    } else {
      
      setSelectedOption({ ...option });
    }
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  return (
    <div
      className="cursor-pointer w-full relative"
      role="combobox"
      ref={dropDownRef}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      {...rest}
    >
      <button
        className="border w-full rounded-md py-2 px-4 mb-3 bg-gray-500"
        onClick={() => {
          toggleDropDown();
          setFocusedIndex(0);
        }}
        aria-label="Select option"
      >
        {selectedOption.key}
      </button>
      {isOpen && (
        <ul
          className="grid gap-1 w-full py-5 p-2 border rounded-md absolute top-[100%] left-0 z-10 bg-black"
          role="listbox"
          aria-labelledby="select-button"
        >
          {options.map((option, index) => (
            <li
              className="rounded-md text-center py-2 hover:bg-gray-700"
              key={index}
              tabIndex={0}
              ref={(el) => (optionRefs.current[index] = el)}
              role="option"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleOptionClick(option);
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setFocusedIndex((prevIndex) => (prevIndex + 1) % options.length);
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setFocusedIndex((prevIndex) =>
                    (prevIndex - 1 + options.length) % options.length
                  );
                } else if (e.key === "Escape") {
                  setIsOpen(false);
                  setFocusedIndex(-1);
                }
              }}
              onClick={() => handleOptionClick(option)}
              aria-selected={
                selectedOption.key === (typeof option === "string" ? option : option.key)
              }
            >
              {typeof option === "string" ? option : option.key}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
