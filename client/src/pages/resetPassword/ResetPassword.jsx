/* eslint-disable react/no-unescaped-entities */
import { useFormik } from "formik";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  HiArrowRight,
} from "../../icons/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { resetPasswordSchema } from "../../schemas";
import { resetPassword } from "../../services/authService";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowCofirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowCofirmPassword(!showConfirmPassword);
  };

  const { values, handleBlur, errors, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validationSchema: resetPasswordSchema,
      onSubmit: async (values) => {
        await dispatch(resetPassword({ values, resetToken, navigate }));
      },
    });

  const { password, confirmPassword } = values;

  return (
    <div className="flex justify-center items-center h-screen px-6">
      <div className="w-[30rem] p-8 bg-white shadow-md hover:shadow-xl rounded-md h-[24rem]">
        <h4 className="text-xl font-medium mb-8 flex items-center justify-center">
          Reset Your Password
        </h4>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4 h-[5rem]">
            <label htmlFor="password" className="block mb-1">
              Reset Password
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
              Reset Cofirm Password
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
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded py-2 px-3 ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              <button
                type="button"
                onClick={handleToggleConfirmPasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <AiOutlineEye className="w-6 h-6" />
                ) : (
                  <AiOutlineEyeInvisible className="w-6 h-6" />
                )}
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-500 text-sm h-4">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-4 flex justify-center items-center gap-2"
          >
            Submit <HiArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
