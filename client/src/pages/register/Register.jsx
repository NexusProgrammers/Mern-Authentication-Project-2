import { useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  HiArrowRight,
  MdOutlineDriveFileRenameOutline,
  MdOutlineMailOutline,
} from "../../icons/index";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        await dispatch(registerUser({ values, navigate }));
      },
    });

  const { name, email, password, confirm_password } = values;

  return (
    <div className="flex justify-center items-center px-6 h-screen">
      <div className="w-[30rem] p-8 bg-white shadow-md hover:shadow-xl rounded-md h-[36rem]">
        <h4 className="text-xl font-medium mb-4 flex items-center justify-center">
          REGISTER ACCOUNT
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 h-[5rem] relative">
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full border rounded py-2 px-3 ${
                errors.name && touched.name
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
            />
            {errors.name && touched.name && (
              <p className="text-red-500 text-sm h-4">{errors.name}</p>
            )}
            <span className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500">
              <MdOutlineDriveFileRenameOutline className="w-6 h-6" />
            </span>
          </div>
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
              className={`w-full border rounded py-2 px-3 ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm h-4">{errors.email}</p>
            )}
            <span className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500">
              <MdOutlineMailOutline className="w-5 h-5 mt-1" />
            </span>
          </div>
          <div className="mb-4 h-[5rem]">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                onCopy={(e) => {
                  e.preventDefault();
                  toast.error("Cannot copy from password field");
                  return false;
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  toast.error("Cannot paste into password field");
                  return false;
                }}
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
          <div className="mb-4 h-[5rem]">
            <label htmlFor="password" className="block mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                onCopy={(e) => {
                  e.preventDefault();
                  toast.error("Cannot copy from confirm password field");
                  return false;
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  toast.error("Cannot paste into confirm password field");
                  return false;
                }}
                type={showPasswordConfirm ? "text" : "password"}
                id="confirm_password"
                name="confirm_password"
                value={confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded py-2 px-3 ${
                  errors.confirm_password && touched.confirm_password
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              <button
                type="button"
                onClick={handleTogglePasswordConfirmVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showPasswordConfirm ? (
                  <AiOutlineEye className="w-6 h-6" />
                ) : (
                  <AiOutlineEyeInvisible className="w-6 h-6" />
                )}
              </button>
            </div>
            {errors.confirm_password && touched.confirm_password && (
              <p className="text-red-500 text-sm h-4">
                {errors.confirm_password}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-4 flex justify-center items-center gap-2"
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
            to={"/login"}
            className="flex justify-end py-6 hover:underline hover:duration-200 hover:text-indigo-600"
          >
            <p>Already Have An Account ?</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
