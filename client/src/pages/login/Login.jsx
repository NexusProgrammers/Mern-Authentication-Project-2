/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/authService";
import { loginSchema } from "../../schemas";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  HiArrowRight,
  MdOutlineDriveFileRenameOutline,
} from "../../icons/index";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        await dispatch(loginUser({ values, navigate }));
      },
    });

  const { email, password } = values;

  return (
    <div className="flex justify-center items-center h-screen px-6">
      <div className="w-[30rem] p-8 bg-white shadow-md hover:shadow-xl rounded-md h-[26rem]">
        <h4 className="text-xl font-medium mb-8 flex items-center justify-center">
          WELCOME BACK
        </h4>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4 h-[4rem] relative">
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
              className={`w-full border rounded py-2 px-3 ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
            />
            <span className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500">
              <MdOutlineDriveFileRenameOutline className="w-6 h-6" />
            </span>
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm h-4">{errors.email}</p>
            )}
          </div>
          <Link
            to={"/forgotpassword"}
            className="flex mt-2 justify-end hover:underline hover:duration-200 hover:text-indigo-600"
          >
            <span>Forgot Password ?</span>
          </Link>
          <div className="mb-4 h-[4rem]">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded py-2 px-3 ${
                  errors.password && touched.password
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              <button
                type="button"
                onClick={handleTogglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <AiOutlineEye className="w-6 h-6" />
                ) : (
                  <AiOutlineEyeInvisible className="w-6 h-6" />
                )}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm h-4">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-7 flex justify-center items-center gap-2"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin dark:border-white"></div>
            ) : (
              <>
                Submit <HiArrowRight />
              </>
            )}
          </button>
          <Link
            to={"/register"}
            className="flex justify-end py-5 hover:underline hover:duration-200 hover:text-indigo-600"
          >
            <p>Don't Have An Account ?</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
