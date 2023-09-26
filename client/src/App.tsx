import { useEffect, useState } from "react";
import Calculator from "./components/Calculator";
import Sidebar from "./components/Sidebar";
import { complexExpression, simplifyExpression } from "./service/math";
import { getHistory, postHistory } from "./service/api";

function App() {
  const [updated, setUpdated] = useState(false);
  const [results, setResults] = useState<ResultType[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    // Fetch initial data from the backend when the component mounts
    getHistory(10).then((data: ResultType[]) => {
      setResults(data);
    });
  }, []);

  useEffect(() => {
    // Fetch new data from the backend when 'updated' changes
    if (updated) {
      getHistory(10).then((data: ResultType[]) => {
        setResults(data);
      });
    }
  }, [updated]);

  const addResult = (result: string, equation: string) => {
    const newResult: ResultType = {
      result: result,
      equation,
      timestamp: new Date().toISOString(),
    };

    postHistory(newResult);
    setUpdated(true);
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
