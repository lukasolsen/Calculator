import { useEffect, useState } from "react";
import Calculator from "./components/Calculator";
import Sidebar from "./components/Sidebar";
import { complexExpression, simplifyExpression } from "./service/math";
import Cookie from "./components/Cookie";
import { useCookies } from "react-cookie";

const COOKIE_NAMES = {
  USER_COOKIE_CONSENT: "user_cookie_consent",
  RESULT: "result",
};

function App() {
  const [results, setResults] = useState<ResultType[]>([]);
  const [input, setInput] = useState<string>("");
  const [cookies, setCookie] = useCookies([
    COOKIE_NAMES.USER_COOKIE_CONSENT,
    COOKIE_NAMES.RESULT,
  ]);

  useEffect(() => {
    if (cookies[COOKIE_NAMES.USER_COOKIE_CONSENT] === undefined) {
      setCookie(COOKIE_NAMES.USER_COOKIE_CONSENT, false, { path: "/" });
    }

    if (cookies[COOKIE_NAMES.RESULT] !== undefined) {
      try {
        console.log("Parsing result cookie", cookies[COOKIE_NAMES.RESULT]);
        const resultCookieData = cookies[COOKIE_NAMES.RESULT];
        setResults(resultCookieData);
      } catch (error) {
        console.error("Error parsing result cookie:", error);
      }
    }
  }, [cookies, setCookie]);

  const handleClick = (toggle: boolean) => {
    setCookie(COOKIE_NAMES.USER_COOKIE_CONSENT, toggle, { path: "/" });
  };
  const addResult = (result: string, equation: string) => {
    const newResult = {
      id: results.length,
      result: result,
      equation,
      timestamp: new Date(),
    };

    setResults((prevResults) => [...prevResults, newResult]);

    // Convert the results array to a JSON string before storing it in the cookie
    if (cookies[COOKIE_NAMES.USER_COOKIE_CONSENT] === true) {
      try {
        const updatedResultCookieData = JSON.stringify([...results, newResult]);
        setCookie(COOKIE_NAMES.RESULT, updatedResultCookieData, { path: "/" });
      } catch (error) {
        console.error("Error storing result cookie:", error);
      }
    }
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

  const showCookieConsentBanner =
    cookies[COOKIE_NAMES.USER_COOKIE_CONSENT] !== true;

  return (
    <div className="dark:text-white text-black dark:bg-gray-900">
      <div className="flex flex-row justify-evenly">
        <Sidebar results={results} features={features} />
        <Calculator addResults={addResult} input={input} setInput={setInput} />
        {showCookieConsentBanner && <Cookie handleClick={handleClick} />}
      </div>
    </div>
  );
}

export default App;
