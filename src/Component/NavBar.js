import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";
import AddDepartmentModal from "./Admin/AddDepartment";
import AddPositionModal from "./Admin/AddPosition"; // Import this
import AddLocationModal from "./Admin/AddLocation"; // Import this
import AddTimeInterval from "./Admin/AddTimeInterval";
import AddHoliday from "./Admin/AddHoliday";

function NavBar({ buttonLabel, page, attendance }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Navigating to add company page");
    console.log(page);
    navigate(page);
  };

  // Modal states
  const [deptModalOpen, setDeptModalOpen] = useState(false);
  const [positionModalOpen, setPositionModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [timeShift, setTimeShift] = useState(false)
  const [holiday,setHoliday]= useState(false)

  return (
    <Navbar style={{ backgroundColor: "#e0ffff" }} className="p-2">
      {/* All modals */}
      <AddDepartmentModal
        isOpen={deptModalOpen}
        toggle={() => setDeptModalOpen(!deptModalOpen)}
      />
      <AddPositionModal
        isOpen={positionModalOpen}
        toggle={() => setPositionModalOpen(!positionModalOpen)}
      />
      <AddLocationModal
        isOpen={locationModalOpen}
        toggle={() => setLocationModalOpen(!locationModalOpen)}
      />

<AddTimeInterval
        isOpen={timeShift}
        toggle={() => setTimeShift(!timeShift)}
      />



      <AddHoliday  
      
      isOpen={holiday}
      toggle={()=>setHoliday(!holiday)}
        />

      <NavbarBrand className="text-dark fw-bold">HRM System</NavbarBrand>
      <Nav className="ms-auto d-flex align-items-center">

        {buttonLabel === "Employee" && (
          <>
            <NavItem>
              <Button
                color="primary"
                className="me-2"
                onClick={() => navigate(attendance)}
              >
                Attendance
              </Button>
            </NavItem>

            <NavItem>
              <Button
                color="primary"
                className="me-2"
                onClick={() => setDeptModalOpen(true)}
              >
                + Department
              </Button>
            </NavItem>

            <NavItem>
              <Button
                color="primary"
                className="me-2"
                onClick={() => setPositionModalOpen(true)}
              >
                + Position
              </Button>
            </NavItem>

            <NavItem>
              <Button
                color="primary"
                className="me-2"
                onClick={() => setLocationModalOpen(true)}
              >
                + Location
              </Button>
            </NavItem>
            <NavItem>
              <Button
                color="primary"
                className="me-2"
                onClick={() => setTimeShift(true)}
              >
                + Shift Time
              </Button>
            </NavItem>

            <NavItem>
              <Button
                color="primary"
                className="me-2"
                onClick={() => setHoliday(true)}
              >
                + Holiday
              </Button>
            </NavItem>
          </>
        )}

        <NavItem>
          <Button color="primary" className="me-2" onClick={handleClick}>
            + {buttonLabel}
          </Button>
        </NavItem>

        <NavItem>
          <Button
            color="danger"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
