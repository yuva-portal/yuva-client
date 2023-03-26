import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// My components
import UserNavbar from "./components/user/Navbar";
import AdminNavbar from "./components/admin/Navbar";
import Footer from "./components/common/Footer";

// User Pages
import UserHome from "./routes/user/HomePage";
import UserLogin from "./routes/user/LoginPage";
import UserVerticals from "./routes/user/VerticalsPage";
import UserCourses from "./routes/user/CoursesPage";
import UserUnits from "./routes/user/UnitsPage";
import UserSingleUnit from "./routes/user/SingleUnitPage";
import UserResetPass from "./routes/user/ResetPassPage";
import UserRegis from "./routes/user/RegisPage";
import UserQuiz from "./routes/user/QuizPage";
import CertPage from "./routes/user/CertPage";
import UserDashBoard from "./routes/user/Dashboard";

// Admin Pages
import AdminLogin from "./routes/admin/LoginPage";
import AdminHome from "./routes/admin/HomePage";
import AdminVerticals from "./routes/admin/VerticalsPage";
import AdminCourses from "./routes/admin/CoursesPage.jsx";
import AdminUnits from "./routes/admin/UnitsPage";
import AdminAddUnit from "./routes/admin/AddUnitPage";

// Common Pages
import NotFound from "./routes/common/NotFound";
import About from "./routes/common/AboutPage.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-outer-div">
        <Routes>
          <Route
            exact
            path="/user/login"
            element={
              <>
                <UserNavbar />
                <UserLogin />
              </>
            }
          />
          <Route
            exact
            path="/"
            element={
              <>
                <UserNavbar />
                <UserHome />
              </>
            }
          />
          <Route
            exact
            path="/user/verticals/all"
            element={
              <>
                <UserNavbar />
                <UserVerticals />
              </>
            }
          />
          <Route
            exact
            path="/user/verticals/:verticalId/courses/all"
            element={
              <>
                <UserNavbar />
                <UserCourses />
              </>
            }
          />
          <Route
            exact
            path="/user/verticals/:verticalId/courses/:courseId/units/all"
            element={
              <>
                <UserNavbar />
                <UserUnits />
              </>
            }
          />
          <Route
            exact
            path="/user/verticals/:verticalId/courses/:courseId/units/:unitId"
            element={
              <>
                <UserNavbar />
                <UserSingleUnit />
              </>
            }
          />
          <Route
            exact
            path="/user/verticals/:verticalId/courses/:courseId/units/:unitId/quiz"
            element={
              <>
                <UserNavbar />
                <UserQuiz />
              </>
            }
          />
          <Route
            exact
            path="/user/reset-password"
            element={
              <>
                <UserNavbar />
                <UserResetPass />
              </>
            }
          />
          <Route
            exact
            path="/user/register"
            element={
              <>
                <UserNavbar />
                <UserRegis />
              </>
            }
          />
          <Route
            exact
            path="/user/certificate/:certId"
            element={
              <>
                <UserNavbar />
                <CertPage />
              </>
            }
          />
          <Route
            exact
            path="/user/dashboard"
            element={
              <>
                <UserNavbar />
                <UserDashBoard />
              </>
            }
          />
          <Route
            path="/admin/services"
            element={
              <>
                <AdminNavbar />
                <AdminHome />
              </>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <>
                <AdminCourses />
                <AdminNavbar />
              </>
            }
          />
          <Route
            path="/admin/login"
            element={
              <>
                <AdminNavbar />
                <AdminLogin />
              </>
            }
          />
          <Route
            path="/admin/verticals/all"
            element={
              <>
                <AdminNavbar />
                <AdminVerticals />
              </>
            }
          />
          <Route
            path="/admin/verticals/:verticalId/courses/all"
            element={
              <>
                <AdminNavbar />
                <AdminCourses />
              </>
            }
          />
          <Route
            path="/admin/verticals/:verticalId/courses/:courseId/units/all"
            element={
              <>
                <AdminNavbar />
                <AdminUnits />
              </>
            }
          />
          <Route
            path="/admin/verticals/:verticalId/courses/:courseId/units/add"
            element={
              <>
                <AdminNavbar />
                <AdminAddUnit />
              </>
            }
          />
          <Route
            exact
            path="/user/resource-not-found"
            element={
              <>
                <UserNavbar />
                <NotFound />
              </>
            }
          />
          <Route
            exact
            path="/about"
            element={
              <>
                <UserNavbar />
                <About />
              </>
            }
          />
          <Route
            exact
            path="/admin/resource-not-found"
            element={
              <>
                <AdminNavbar />
                <NotFound />
              </>
            }
          />
        </Routes>
      </div>

      <Footer />

      <Toaster
        toastOptions={{
          duration: 2500,
          style: {
            fontFamily: "var(--font-family-2)",
            marginTop: "2rem",
          },
        }}
      />
    </Router>
  );
}

export default App;