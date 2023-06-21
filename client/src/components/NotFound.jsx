import { Link } from "react-router-dom";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

const NotFound = () => {
  return (
    <div className="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
      <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
        <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">
          404
        </p>
        <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
          Page Not Found
        </p>
        <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">
          Sorry, the page you are looking for could not be found.
        </p>
        <Link
          to={"/"}
          className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
          title="Go back"
        >
          <ReplyRoundedIcon />
          <span>Go Back</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
