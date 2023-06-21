/* eslint-disable react/no-unescaped-entities */
import { useFormik } from "formik";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { HiArrowRight } from "../../icons/index";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      await dispatch(forgotPassword({ values, navigate }));
    },
  });

  const { email } = values;

  return (
    <div className="flex justify-center items-center h-screen px-6">
      <div className="w-[30rem] p-8 bg-white shadow-md hover:shadow-xl rounded-md h-[20rem]">
        <h4 className="text-xl font-medium mb-8 flex items-center justify-center">
          Enter Your Email Address
        </h4>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4 h-[5rem] relative">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={"w-full border rounded py-2 px-3"}
            />
            <span className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500">
              <MdOutlineDriveFileRenameOutline className="w-6 h-6" />
            </span>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-4 flex justify-center items-center gap-2"
          >
            Send <HiArrowRight />
          </button>
          <Link
            to={"/login"}
            className="flex justify-start py-5 hover:underline hover:duration-200 hover:text-indigo-600"
          >
            <p>Back To Login</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
