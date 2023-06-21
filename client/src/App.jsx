import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  About,
  Account,
  Contact,
  ForgotPassword,
  Home,
  Login,
  Register,
  ResetPassword,
} from "./pages/ExportPages";
import {
  Header,
  NotFound,
  ProtectRoute,
  PublicRoute,
} from "./components/ExportComponent";


const App = () => {
  return (
    <Router>
      <Header />
      <Toaster />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/forgotpassword"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/resetpassword/:resetToken"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectRoute>
              <About />
            </ProtectRoute>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectRoute>
              <Account />
            </ProtectRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectRoute>
              <Contact />
            </ProtectRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
