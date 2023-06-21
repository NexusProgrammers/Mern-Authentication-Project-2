import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("please enter a valid email")
    .required("please enter a email"),

  password: Yup.string().required("please enter a password"),
});

export const registerSchema = Yup.object({
  name: Yup.string().min(2).max(20).required("please enter a name"),

  email: Yup.string()
    .email("please enter a valid email")
    .required("please enter a email"),

  password: Yup.string().min(6).required("please enter a password"),

  confirm_password: Yup.string()
    .required("please enter confirm password")
    .oneOf([Yup.ref("password"), null], "passwords must be match"),
});

export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("please enter a old password"),

  newPassword: Yup.string().min(6).required("please enter a new password"),

  confirmNewPassword: Yup.string()
    .required("please enter confirm new password")
    .oneOf([Yup.ref("newPassword"), null], "passwords must be match"),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string().min(6).required("please enter password"),

  confirmPassword: Yup.string()
    .required("please enter confirm password")
    .oneOf([Yup.ref("password"), null], "passwords must be match"),
});
