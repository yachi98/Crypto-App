import { useState, useEffect, useRef, ChangeEvent } from "react";
import CloseIcon from "@/public/CloseIcon.svg";

const PortfolioModal = () => {
  const currencyInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const dueDateInputRef = useRef<HTMLInputElement>(null);
  const [closeModal, setCloseModal] = useState(false);
  const [value, setValue] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleInputFocus = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.style.border = "1px solid #fdba74";
    }
  };

  const handleInputBlur = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.style.border = "none";
    }
  };

  useEffect(() => {
    console.log("After toggle:", closeModal);
  }, [closeModal]);

  const handleClose = () => {
    setCloseModal(true);
  };

  const handleDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  return (
    <div className="w-[800px] h-[400px] dark:bg-gradient-to-r from-black to-gray-900 bg-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-3xl">
      <div className="absolute right-0 p-3">
        <button onClick={handleClose}>
          <CloseIcon />
        </button>
      </div>
      <h3 className="text-xl">Select coin</h3>
      <div className="p-5 grid grid-cols-2 gap-2">
        <h3>Select currency</h3>
        <input
          ref={currencyInputRef}
          onFocus={() => handleInputFocus(currencyInputRef)}
          onBlur={() => handleInputBlur(currencyInputRef)}
          className="dark:bg-gray-900 bg-light-theme outline-none rounded-xl p-2 w-[300px]"
        />
        <h3>Enter amount you purchased</h3>
        <input
          ref={amountInputRef}
          onFocus={() => handleInputFocus(amountInputRef)}
          onBlur={() => handleInputBlur(amountInputRef)}
          className="dark:bg-gray-900 bg-light-theme outline-none rounded-xl p-2 w-[300px]"
        />
        <h3>Select the date you purchased</h3>
        <input
          ref={dueDateInputRef}
          className="dark:bg-gray-900 bg-light-theme outline-none rounded-xl p-2 w-[300px]"
          type="date"
          value={dueDate}
          onChange={handleDueDateChange}
          onFocus={() => handleInputFocus(dueDateInputRef)}
          onBlur={() => handleInputBlur(dueDateInputRef)}
        />
      </div>
      <div className="flex justify-center gap-5 mt-11">
        <button className="p-2 dark:bg-gray-900 bg-light-theme  rounded-xl  w-[100px]">
          Cancel
        </button>
        <button className="p-2 dark:bg-gray-800 bg-light-theme rounded-xl w-[100px]">
          Save
        </button>
      </div>
    </div>
  );
};
export default PortfolioModal;
