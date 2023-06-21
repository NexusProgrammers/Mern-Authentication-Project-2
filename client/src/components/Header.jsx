import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, logoutUser } from "../services/authService";
import {
  Avatar,
  BiLogInCircle,
  BiLogOutCircle,
  CloseRoundedIcon,
  GoInfo,
  HowToRegRoundedIcon,
  MenuOpenRoundedIcon,
  RiAccountPinCircleLine,
  RiMessage2Line,
  TiHomeOutline,
} from "../icons/index";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const cookieValue = Cookie.get("token");

  useEffect(() => {
    const fetchData = async () => {
      if (cookieValue) {
        await dispatch(getUserProfile());
      }
    };
    fetchData();
  }, [dispatch, cookieValue]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const modalRef = useRef(null);

  const handleUserMenuClick = () => {
    setAnchorEl(!anchorEl);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCloseNav = () => {
    setIsMenuOpen(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    dispatch(logoutUser({ navigate }));
    handleUserMenuClose();
  };

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleUserMenuClose();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <nav className="bg-gray-800 sticky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {cookieValue && (
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-base font-normal text-white hover:bg-gray-700 flex items-center justify-center gap-2"
            >
              <TiHomeOutline className="w-4 h-4" /> Home
            </Link>
          )}

          <div className="flex items-center gap-4 w-full justify-end">
            <div className="hidden sm:flex gap-6">
              {cookieValue && (
                <>
                  <Link
                    to="/contact"
                    className="px-3 py-2 rounded-md text-base font-normal text-white hover:bg-gray-700 flex items-center justify-center gap-2"
                  >
                    <RiMessage2Line className="w-4 h-4 mt-[1px]" /> Contact
                  </Link>
                  <Link
                    to="/about"
                    className="px-3 py-2 rounded-md text-base font-normal text-white hover:bg-gray-700 flex items-center justify-center gap-2"
                  >
                    <GoInfo className="w-4 h-4" /> About
                  </Link>
                </>
              )}

              {!cookieValue && (
                <>
                  <Link
                    to="/register"
                    className="px-3 py-2 rounded-md text-base font-normal text-white hover:bg-gray-700 flex items-center justify-center gap-1"
                  >
                    <HowToRegRoundedIcon fontSize="small" /> Register
                  </Link>
                  <Link
                    to="/login"
                    className="px-3 py-2 rounded-md text-base font-normal text-white hover:bg-gray-700 flex items-center justify-center gap-1"
                  >
                    <BiLogInCircle className="w-5 h-5 mt-[1px]" /> Login
                  </Link>
                </>
              )}
            </div>
            {cookieValue && (
              <>
                <div className="relative px-5">
                  <Avatar
                    src={user && user.photo}
                    alt="avatar"
                    className="cursor-pointer"
                    onClick={handleUserMenuClick}
                  />
                  {anchorEl && (
                    <div
                      ref={modalRef}
                      className="absolute -left-2 py-2  w-24 bg-white rounded-md shadow-2xl z-10 flex flex-col"
                    >
                      <Link
                        to="/account"
                        className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 flex gap-1 items-center justify-start"
                        onClick={handleUserMenuClose}
                      >
                        <RiAccountPinCircleLine className="w-5 h-5" /> Account
                      </Link>
                      <button
                        onClick={logout}
                        className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 flex gap-1 items-center justify-start"
                      >
                        <BiLogOutCircle className="w-5 h-5" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="flex sm:hidden items-center">
              <button
                className="text-white p-2 hover:bg-gray-700 focus:outline-none hover:rounded-lg"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <CloseRoundedIcon /> : <MenuOpenRoundedIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="flex flex-col px-2 pb-4">
            {cookieValue && (
              <>
                <Link
                  onClick={handleCloseNav}
                  to="/contact"
                  className="px-5 py-2 rounded-md text-base font-normal text-white hover:bg-gray-700 flex items-center gap-2"
                >
                  <RiMessage2Line className="w-4 h-4 mt-[1px]" /> Contact
                </Link>
                <Link
                  onClick={handleCloseNav}
                  to="/about"
                  className="px-5 py-2 rounded-md text-base font-normal text-white hover:bg-gray-700 flex items-center gap-2"
                >
                  <GoInfo className="w-5 h-5" /> About
                </Link>
              </>
            )}

            {!cookieValue && (
              <>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-base font-normal text-white hover:bg-gray-700 flex items-center gap-1"
                >
                  <HowToRegRoundedIcon /> Register
                </Link>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-base font-normal text-white hover:bg-gray-700 flex items-center gap-1"
                >
                  <BiLogInCircle className="w-5 h-5 mt-[1px]" /> Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
