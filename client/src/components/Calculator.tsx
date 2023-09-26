import { useState } from "react";
import { calculate } from "../service/math";

type CalculatorProps = {
  addResults: (result: string, equation: string) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

function Calculator({ addResults, input, setInput }: CalculatorProps) {
  const [result, setResult] = useState<string>("");

  const operatorRegex = new RegExp("[+\\-*/]");

  /**
   * Resets the input and result state (aka clears the calculator)
   */
  const reset = (): void => {
    setInput("");
    setResult("");
  };

  const calculateExpression = () => {
    const result = calculate(input);
    if (result === "") return;
    setResult(result.toString());
    addResults(result.toString(), input);
    setInput("");
  };

  /**
   * Handles the button click and updates the input state
   * @param value The value of the button that was clicked
   */
  const handleButtonClick = (value: string) => {
    if (value === "=") {
      calculateExpression();
    } else if (value === "C") {
      reset();
    } else {
      // set the input state as either including the previous value, or simply just replace the previous value
      setInput((prevInput) => {
        if (
          operatorRegex.test(prevInput[prevInput.length - 1]) &&
          operatorRegex.test(value)
        ) {
          // if the previous value is an operator and the current value is also an operator, replace the previous value with the current value
          return prevInput.slice(0, prevInput.length - 1) + value;
        } else {
          // else, just add the current value to the previous value
          return prevInput + value;
        }
      });
    }
  };

  return (
    <div className="w-1/3 mx-auto mt-8 p-4 border rounded-lg shadow-lg bg-gray-100 dark:bg-gray-900 flex flex-col justify-evenly">
      <div className="mb-4">
        <input
          type="text"
          value={input === "" ? result : input}
          className="w-full p-3 border rounded-lg text-2xl text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        <button
          className="col-span-2 p-4 rounded-lg text-2xl text-white bg-blue-500 hover:bg-blue-600"
          onClick={() => handleButtonClick("C")}
        >
          Clear
        </button>
        <button
          className="col-span-2 p-4 rounded-lg text-2xl text-white bg-red-500 hover:bg-red-600"
          onClick={() => handleButtonClick("=")}
        >
          =
        </button>
        {["7", "8", "9", "+"].map((button) => (
          <button
            key={button}
            className="p-4 rounded-lg text-2xl text-white bg-gray-600 hover:bg-gray-700"
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </button>
        ))}
        {["4", "5", "6", "-"].map((button) => (
          <button
            key={button}
            className="p-4 rounded-lg text-2xl text-white bg-gray-600 hover:bg-gray-700"
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </button>
        ))}
        {["1", "2", "3", "*"].map((button) => (
          <button
            key={button}
            className="p-4 rounded-lg text-2xl text-white bg-gray-600 hover:bg-gray-700"
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </button>
        ))}
        <button
          className="col-span-2 p-4 rounded-lg text-2xl text-white bg-gray-600 hover:bg-gray-700"
          onClick={() => handleButtonClick("0")}
        >
          0
        </button>
        <button
          className="p-4 rounded-lg text-2xl text-white bg-gray-600 hover:bg-gray-700"
          onClick={() => handleButtonClick(".")}
        >
          .
        </button>
        <button
          className="p-4 rounded-lg text-2xl text-white bg-gray-600 hover:bg-gray-700"
          onClick={() => handleButtonClick("/")}
        >
          /
        </button>
      </div>
    </div>
  );
}

export default Calculator;
