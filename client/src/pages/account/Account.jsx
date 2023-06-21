import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../../services/authService";
import {
  ChangePasswordModal,
  DeleteAccountModel,
  GlobalSpinner,
} from "../../components/ExportComponent";
import {
  HiOutlineArrowUp,
  MdDelete,
  MdOutlineDriveFileRenameOutline,
  MdOutlineImage,
  MdOutlineMailOutline,
  TbArrowsExchange,
} from "../../icons/index";
import { Button } from "@mui/material";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState("");
  const [changePasswordModel, setChangePasswordModel] = useState(false);

  const [deletePasswordModel, setDeletePasswordModel] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
  });

  const { name, email, photo } = formData;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserProfile());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const { name, email, photo } = user;
      setFormData({
        name,
        email,
        photo,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setProfileImage(selectedImage);

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prevState) => ({
        ...prevState,
        photoPreview: event.target.result,
      }));
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", profileImage);
    formData.append("upload_preset", "Mern-Authentication");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/jawadullah/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    const imageURL = data.secure_url;

    const updatedUser = {
      name,
      email,
      photo: imageURL,
    };

    await dispatch(updateUserProfile({ updatedUser, navigate }));
  };

  if (loading) {
    return <GlobalSpinner />;
  }

  return (
    <div className="flex items-center justify-center px-6 h-screen mt-6 mb-6 ml-4">
      <form
        className="w-[33rem] p-8 bg-white shadow-md hover:shadow-xl rounded-md h-[40rem]"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center mb-4">
          {formData.photoPreview ? (
            <img
              src={formData.photoPreview}
              alt="Selected Img"
              className="w-44 h-44 rounded-full object-cover"
            />
          ) : (
            <img
              src={photo}
              alt="Default Img"
              className="w-44 h-44 rounded-full object-cover"
            />
          )}
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-semibold text-gray-800"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            value={name}
            onChange={handleChange}
          />
          <span className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500">
            <MdOutlineDriveFileRenameOutline className="w-6 h-6" />
          </span>
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-semibold text-gray-800"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            value={email}
            onChange={handleChange}
          />
          <span className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500">
            <MdOutlineMailOutline className="w-5 h-5 mt-1" />
          </span>
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="photo"
            className="block mb-2 text-sm font-semibold text-gray-800"
          >
            Photo
          </label>
          <input
            id="photo"
            type="file"
            name="photo"
            className="w-full py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:border-black cursor-pointer"
            onChange={handleImageChange}
          />
          <span className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-500">
            <MdOutlineImage className="w-5 h-5 mt-2" />
          </span>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full mt-4 flex justify-center items-center gap-2"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin dark:border-white"></div>
            ) : (
              <>
                Update <HiOutlineArrowUp />
              </>
            )}
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="border-b w-1/5 md:w-1/4"></span>
          <a className="text-xs text-gray-500">OR</a>
          <span className="border-b w-1/5 md:w-1/4"></span>
        </div>
        <div className="flex justify-center gap-4 py-4">
          <Button
            size="small"
            variant="contained"
            color="info"
            sx={{ textTransform: "none" }}
            endIcon={<MdDelete className="w-4 h-4 text-red-900" />}
            onClick={() => setDeletePasswordModel(true)}
          >
            Delete Account
          </Button>
          <Button
            size="small"
            variant="contained"
            color="info"
            sx={{ textTransform: "none" }}
            endIcon={<TbArrowsExchange className="w-5 h-5" />}
            onClick={() => setChangePasswordModel(true)}
          >
            Change Password
          </Button>
        </div>
      </form>
      <ChangePasswordModal
        isOpen={changePasswordModel}
        onClose={() => setChangePasswordModel(false)}
      />
      <DeleteAccountModel
        isOpen={deletePasswordModel}
        onClose={() => setDeletePasswordModel(false)}
      />
    </div>
  );
};

export default Account;
