import { Button, Modal } from "@mui/material";
import { useFormik } from "formik";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  RiDeleteBin6Line,
} from "../icons/index";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserProfile } from "../services/authService";
import ConfirmDeleteModal from "./ConfirmDeleteModel";

// eslint-disable-next-line react/prop-types
const DeleteAccountModel = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmDelete = () => {
    if (!password) {
      return toast.error("please enter your password");
    }
    setShowConfirmModal(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async () => {
      handleConfirmDelete();
    },
  });

  const { password } = values;

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        className="flex items-center justify-center px-6"
      >
        <div className="w-[33rem] p-8 bg-white shadow-md hover:shadow-xl rounded-md">
          <h2 className="text-xl font-semibold mb-6 flex gap-2 items-center">
            <RiDeleteBin6Line className="w-4 h-4 mt-[1px] text-red-900" />{" "}
            Delete Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 h-[5rem]">
              <label htmlFor="password" className="block mb-1">
                Enter Your Password
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
                  className={" w-full border rounded py-2 px-3 "}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <AiOutlineEye className="w-6 h-6" />
                  ) : (
                    <AiOutlineEyeInvisible className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                size="small"
                type="button"
                variant="contained"
                color="info"
                sx={{ textTransform: "none" }}
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button
                size="small"
                type="submit"
                variant="contained"
                color="error"
                sx={{ textTransform: "none" }}
              >
                Delete
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <ConfirmDeleteModal
        isOpen={showConfirmModal}
        onConfirm={async () => {
          await dispatch(deleteUserProfile({ values, navigate }));
          onClose();
        }}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default DeleteAccountModel;
