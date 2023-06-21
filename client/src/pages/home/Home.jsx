import { useEffect } from "react";
import { getUserProfile } from "../../services/authService";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";

const Home = () => {
  const dispatch = useDispatch();
  const cookieValue = Cookie.get("token");

  useEffect(() => {
    const fetchData = async () => {
      if (cookieValue) {
        await dispatch(getUserProfile());
      }
    };
    fetchData();
  }, [dispatch, cookieValue]);

  return (
    <div>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
    </div>
  );
};

export default Home;
