import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type ButtonGridProps = {
  features: Feature[];
};

const ButtonGrid: React.FC<ButtonGridProps> = ({ features }) => {
  const buttonsPerPage = 12; // Number of buttons per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of buttons to display on the current page
  const startIndex = (currentPage - 1) * buttonsPerPage;
  const endIndex = currentPage * buttonsPerPage;

  // Create an array of button elements for the current page
  const currentButtons = features
    .slice(startIndex, endIndex)
    .map((feature, index) => (
      <button
        key={index}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        onClick={feature.func}
      >
        {feature.name}
      </button>
    ));

  // Function to handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:grid-cols-1">
        {currentButtons}
      </div>
      <div className="flex justify-between mt-4">
        {/* Previous Page Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <FaArrowLeft size={16} />
        </button>

        {/* Page Numbers */}
        {Array.from(
          { length: Math.ceil(features.length / buttonsPerPage) },
          (_, index) => (
            <button
              key={index}
              className={`${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-500 text-black"
              } py-2 px-3 rounded-lg hover:bg-blue-600`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}

        {/* Next Page Button */}
        <button
          disabled={currentPage === Math.ceil(features.length / buttonsPerPage)}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <FaArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ButtonGrid;
