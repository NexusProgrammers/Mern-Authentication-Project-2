import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  const oneDayMilliseconds = 24 * 60 * 60 * 1000;

  res.cookie("token", token, {
    path: "/",
    httpOnly: false,
    secure: false,
    sameSite: "strict",
    maxAge: oneDayMilliseconds,
  });
};

export default generateToken;
