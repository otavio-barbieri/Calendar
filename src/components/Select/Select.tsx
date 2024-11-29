import { HTMLAttributes, useEffect, useRef, useState } from "react";
import styles from "./select.module.css";

export type keyValueOptions = { label: string; value: string | number };

interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  placeholder?: string;
  defaultValue?: keyValueOptions;
  onSelectChange: (value: string | number) => void;
  useLabelAsValue?: boolean;
  value?: keyValueOptions;
  options: keyValueOptions[];
  isModal?: boolean;
  variant?: "default" | "ghost";
  size?: "mini" | "fluid" | "maxContent";
  spacing?: "tight" | "default";
}

export default function Select({
  placeholder,
  defaultValue,
  options,
  value,
  onSelectChange,
  useLabelAsValue = false,
  variant = "default",
  size = "fluid",
  spacing = "default",
  ...rest
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectShouldBeUpwards, setSelectMustBeUpwards] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<keyValueOptions>(
    value
    ||
    defaultValue 
    || 
    { label: placeholder || "Selecione uma opção", value: value || "" }
  );

  const styleVariants = {
    default: ["bg-gray-500"],
    ghost: ["bg-transparent border-none"],
  };

  const sizeVariants = {
    mini: ["w-fit text-sm"],
    fluid: ["w-full min-w-fit"],
    maxContent: ["w-max"]
  };

  const spacingVariants = {
    default: ["py-2 px-4"],
    tight: ["p-0"],
  };

  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Toggle dropdown visibility
  const toggleDropDown = () => setIsOpen((prev) => !prev);

  // Close dropdown when clicked outside
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

  // Focus on the option when `focusedIndex` changes
  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  // Handle position of the dropdown
  useEffect(() => {
    if (isOpen) {
      determineDropdownPosition();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedOption(value || defaultValue || { label: placeholder || "Selecione uma opção", value: "" });
  }, [value, defaultValue, placeholder]);

  // Handle option click
  const handleOptionClick = (option: keyValueOptions) => {
    setSelectedOption({
      label: option.label,
      value: option.value,
    });

    setIsOpen(false);
    setFocusedIndex(-1);
    onSelectChange(option.value.toString());
  };

  // Determine if dropdown should appear upwards
  const determineDropdownPosition = () => {
    if (dropDownRef.current) {
      const rect = dropDownRef.current.getBoundingClientRect();
      const dropdownHeight = dropDownRef.current.scrollHeight;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      setSelectMustBeUpwards(spaceBelow < dropdownHeight && spaceAbove > dropdownHeight);
    }
  };

  return (
    <div
      className={`cursor-pointer w-max text-lg relative ${sizeVariants[size || "fluid"]} ${styles.select}`}
      role="combobox"
      ref={dropDownRef}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      {...rest}
    >
      <button
        className={`border w-full rounded-lg mb-3 capitalize ${spacingVariants[spacing || "default"]} ${styleVariants[variant || "default"]}`}
        onClick={() => {
          toggleDropDown();
          setFocusedIndex(0);
        }}
        aria-label="Select option"
      >
        {selectedOption.label}
      </button>
      {isOpen && (
        <div
          className={`absolute ${selectShouldBeUpwards ? "bottom-[100%] mb-2" : "top-[100%] mt-2"} left-0 z-10`}
        >
          <ul
            className="grid gap-1 max-h-64 overflow-y-auto w-fit py-5 p-2 border rounded-lg bg-black"
            role="listbox"
          >
            {options.map((option, index) => (
              <li
                className="rounded-md capitalize text-center py-2 px-3 hover:bg-gray-700 text-balance break-words isolate"
                key={option.value || option.label} // Use `value` as key to avoid duplication
                value={option.value || option.label}
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
                    setFocusedIndex((prevIndex) => (prevIndex - 1 + options.length) % options.length);
                  } else if (e.key === "Escape") {
                    setIsOpen(false);
                    setFocusedIndex(-1);
                  }
                }}
                onClick={() => handleOptionClick(option)}
                aria-selected={selectedOption.value === option.value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
