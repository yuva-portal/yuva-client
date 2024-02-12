import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// My components
import UserNavbar from "./components/user/Navbar";
import AdminNavbar from "./components/admin/Navbar";
// import Footer from "./components/common/Footer";

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
import UserProfile from "./components/user/UserProfile";
import PrivacyPolicy from "./routes/user/PrivacyPolicy";

// Admin Pages
import AdminLogin from "./routes/admin/LoginPage";
import AdminServices from "./routes/admin/ServicesPage";
import AdminVerticals from "./routes/admin/VerticalsPage";
import AdminCourses from "./routes/admin/CoursesPage.jsx";
import AdminUnits from "./routes/admin/UnitsPage";
import AdminAddUnit from "./routes/admin/AddUnitPage";

import AdminUsers from "./routes/admin/AdminUsers.jsx";

// Common Pages
import NotFound from "./routes/common/NotFound";
import UserAboutPage from "./routes/user/AboutPage";
import Footer from "./routes/user/Footer";

import "./App.css";
import ScrollToTop from "./components/user/ScrollToTop";
import AdminUserPage from "./routes/admin/AdminUserPage.jsx";

function App() {
    return (
        <Router>
            <ScrollToTop />
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
                        path="/about"
                        element={
                            <>
                                <UserNavbar />
                                <UserAboutPage />
                            </>
                        }
                    />
                    <Route
                        exact
                        path="/privacy-policy"
                        element={
                            <>
                                <UserNavbar />
                                <PrivacyPolicy />
                            </>
                        }
                    />
                    <Route
                        exact
                        path="/user/profile"
                        element={
                            <>
                                <UserNavbar />
                                <UserProfile />
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
                                <AdminServices />
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
                        path="/admin/users/all"
                        element={
                            <>
                                <AdminNavbar />
                                <AdminUsers />
                            </>
                        }
                    />
                    <Route
                        path="/admin/users/:userId"
                        element={
                            <>
                                <AdminNavbar />
                                <AdminUserPage />
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
                        path="/admin/resource-not-found"
                        element={
                            <>
                                <AdminNavbar />
                                <NotFound />
                            </>
                        }
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>

            <Footer />

            <Toaster
                toastOptions={{
                    duration: 3000,
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
