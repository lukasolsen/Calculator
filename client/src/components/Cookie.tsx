type CookieProps = {
  handleClick: (toggle: boolean) => void;
};

const Cookie: React.FC<CookieProps> = ({ handleClick }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-between items-center w-11/12 md:w-10/12 lg:w-9/12">
        <p className="text-gray-600 text-sm md:text-base lg:text-lg">
          We use cookies to ensure you get the best experience on our website.{" "}
          <a href="#" className="text-blue-600">
            Learn more
          </a>
        </p>
        <button
          onClick={() => handleClick(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm md:text-base lg:text-lg"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default Cookie;
