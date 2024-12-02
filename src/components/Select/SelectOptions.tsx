/* 



export default function SelectOption() {

    return (

        <li
            className="rounded-md text-center py-2 hover:bg-gray-700 text-balance break-words"
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
    )
} */