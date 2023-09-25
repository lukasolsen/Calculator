import { useState } from "react";
import Calculator from "./components/Calculator";
import Sidebar from "./components/Sidebar";
import { complexExpression, simplifyExpression } from "./service/math";

function App() {
  const [results, setResults] = useState<ResultType[]>([]);
  const [input, setInput] = useState<string>("");

  const addResult = (result: string, equation: string) => {
    setResults((prevResults) => [
      ...prevResults,
      {
        id: prevResults.length,
        result: result,
        equation,
        timestamp: new Date(),
      },
    ]);
  };

  const features: Feature[] = [
    {
      name: "Simplify",
      func: () => {
        setInput(simplifyExpression(input));
      },
    },
    {
      name: "Complex",
      func: () => {
        setInput(complexExpression(input));
      },
    },
    // Add more features as needed
  ];

  return (
    <div className="dark:text-white text-black dark:bg-gray-900">
      <div className="flex flex-row justify-evenly">
        <Sidebar results={results} features={features} />
        <Calculator addResults={addResult} input={input} setInput={setInput} />
      </div>
    </div>
  );
}

export default App;
