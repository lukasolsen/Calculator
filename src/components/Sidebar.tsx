import { useState } from "react";
import {
  IoIosArrowDropdown,
  IoIosSettings,
  IoIosInformationCircle,
} from "react-icons/io";
import ButtonGrid from "./Sidebar/ButtonGrid";

type SidebarProps = {
  results: ResultType[];
  features: Feature[];
};

function Sidebar({ results, features }: SidebarProps) {
  const [isShowingHistory, setIsShowingHistory] = useState<boolean>(false);

  return (
    <div className="h-screen overflow-hidden w-1/5 p-4 bg-gray-800 text-white">
      <div className="flex flex-col h-full justify-between">
        {/* Top Section */}
        <div>
          {/* Example Feature: User Information */}
          <div className="flex items-center mb-4">
            <IoIosInformationCircle className="text-xl mr-2" />
            <span className="text-sm">
              Welcome back, <strong>John Doe</strong>
            </span>
          </div>

          {/* Recent calculations */}
          <div
            className="flex items-center cursor-pointer flex-row select-none justify-evenly"
            onClick={() => setIsShowingHistory(!isShowingHistory)}
          >
            <span className="text-base">Show History</span>
            {isShowingHistory ? (
              <IoIosArrowDropdown
                className="text-base ml-2 transition-transform transform rotate-180"
                size={18}
              />
            ) : (
              <IoIosArrowDropdown
                className="text-base ml-2 transition-transform"
                size={18}
              />
            )}
          </div>

          {isShowingHistory && (
            <div className="text-base mt-4 select-none">
              <div className="border-t border-gray-500 my-2"></div>

              <div className="flex flex-col gap-2">
                {!results.length && (
                  <h1 className="text-center">No history was found</h1>
                )}
                {results.length > 0 &&
                  results.map((result) => {
                    return (
                      <div
                        key={result.id}
                        className="flex flex-row justify-between"
                      >
                        <div>
                          <span className="text-gray-500 dark:text-gray-100">
                            {result.equation} ={" "}
                          </span>
                          <span className="text-green-600">
                            {result.result}
                          </span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-100">
                          {result.timestamp.toLocaleTimeString()}{" "}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* Middle Section */}
        <div className="flex flex-col items-center justify-center">
          {/* Additional Features (Buttons for simplify, complex and more, should be in a 4 by 4 grid with pagination) */}
          <ButtonGrid features={features} />
        </div>

        {/* Bottom Section */}
        <div>
          {/* Action buttons */}
          <div className="flex justify-between mt-4">
            {/* Example Feature: Export and Import */}
            <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
              <IoIosSettings />
            </button>
            <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
              <IoIosSettings />
            </button>
            {/* Example Feature: Calculate */}
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
              Calculate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
