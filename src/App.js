import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./Component/SignIn";
import RegisterUser from "./Component/RegisterCompany";
import Dashboard from "./pages/dashboard/SuperAdmin";
import { useEffect, useState } from "react";
import RegisterCompany from "./Component/RegisterCompany";
import EmployeeForm from "./Component/RegisterEmployee";
import System from "./pages/dashboard/SystemAdmin";
import EmployeeDashboard from "./pages/dashboard/Employee";
import EmployerAttendanceDashboard from "./pages/dashboard/EmployerDashboard";
import EmployeeLeaveApplication from "./pages/Apply_leave";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const parsedUser = JSON.parse(userString);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/employee" element={<EmployeeForm />} />
        <Route
          path="/admin/dashboard"
          element={
            user?.role === "superAdmin" ? <Dashboard /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/addCompany"
          element={
            user?.role === "superAdmin" ? (
              <RegisterCompany />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/company/dashboard"
          element={
            user?.role === "systemAdmin" ? <System /> : <Navigate to="/" />
          }
        />

        <Route
          path="/company/Employee"
          element={
            user?.role === "systemAdmin" ? (
              <EmployeeForm />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/company/Employee"
          element={
            user?.role === "systemAdmin" ? (
              <EmployeeForm />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/Employee/Dashboard"
          element={
            user?.role === "employee" ? (
              <EmployeeDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/company/attendence"
          element={
            user?.role === "systemAdmin" ? (
              <EmployerAttendanceDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
          <Route
          path="/Employee/leave"
          element={
            user?.role === "employee" ? (
              <EmployeeLeaveApplication/>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* <Route
          path="/company/Employee"
          element={
            user?.role === "system admin" ? </> : <Navigate to="/" />
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
