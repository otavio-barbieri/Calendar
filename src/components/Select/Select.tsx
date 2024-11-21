import { HTMLAttributes, useEffect, useRef, useState } from "react";

import styles from "./select.module.css";

type keyValueOptions = { key: string; value?: string | number };

interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  placeholder?: string;
  defaultValue?: string;
  onSelectChange: (value: string) => void;
  value?: string;
  options: string[] | keyValueOptions[];
  isModal?: boolean;
  variant?: "default" | "ghost";
  size?: "mini" | "fluid";
  spacing?: "tigh" | "default";
}

export default function Select({
  placeholder,
  options,
  value = "",
  onSelectChange,
  variant = "default",
  size = "fluid",
  spacing = "default",
  ...rest
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectShouldBeUpwards, setSelectMustBeUpwards] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<keyValueOptions>({
    key: value || placeholder || "Selecione uma opção",
    value: value,
  });

  const styleVariants = {
    default: ["bg-gray-500"],
    ghost: ["bg-transparent border-none"],
  };

  const sizeVariants = {
    mini: ["w-fit"],
    fluid: ["w-full", "min-w-fit"],
  };

  const spacingVariants = {
    default: ["py-2 px-4"],
    tigh: ["p-0"],
  };

  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const dropDownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const toggleDropDown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
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

  useEffect(() => {
    if (isOpen) {
      determineDropdownPosition();
    }
  }, [isOpen]);

  const handleOptionClick = (option: string | keyValueOptions) => {
    if (typeof option === "string") {
      setSelectedOption({ key: option, value: option });
    } else {
      setSelectedOption({ ...option });
    }
    setIsOpen(false);
    setFocusedIndex(-1);
    onSelectChange(selectedOption.value?.toString() || "");
  };

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
      className={`cursor-pointer relative ${sizeVariants[size || "fluid"]} ${styles.select}`}
      role="combobox"
      ref={dropDownRef}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      {...rest}
    >
      <button
        className={`border w-full rounded-lg mb-3 ${
          spacingVariants[spacing || "default"]
        } ${styleVariants[variant || "default"]}`}
        onClick={() => {
          toggleDropDown();
          setFocusedIndex(0);
        }}
        aria-label="Select option"
      >
        {selectedOption.key}
      </button>
      {isOpen && (
        <div
          className={`absolute ${
            selectShouldBeUpwards ? "bottom-[100%] mb-2" : "top-[100%] mt-2"
          } left-0 z-10`}
        >
          <ul
            className="grid gap-1 max-h-64 overflow-y-auto w-fit py-5 p-2 border rounded-lg bg-black"
            role="listbox"
            aria-labelledby="select-button"
          >
            {options.map((option, index) => (
              <li
                className="rounded-md capitalize text-center py-2 px-3 hover:bg-gray-700 text-balance break-words isolate"
                key={index}
                tabIndex={0}
                ref={(el) => (optionRefs.current[index] = el)}
                role="option"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleOptionClick(option);
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setFocusedIndex(
                      (prevIndex) => (prevIndex + 1) % options.length
                    );
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setFocusedIndex(
                      (prevIndex) =>
                        (prevIndex - 1 + options.length) % options.length
                    );
                  } else if (e.key === "Escape") {
                    setIsOpen(false);
                    setFocusedIndex(-1);
                  }
                }}
                onClick={() => handleOptionClick(option)}
                aria-selected={
                  selectedOption.key ===
                  (typeof option === "string" ? option : option.key)
                }
              >
                {typeof option === "string" ? option : option.key}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
