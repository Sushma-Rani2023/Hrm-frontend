import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";

function NavBar({ buttonLabel, page, attendance }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Navigating to add company page");
    console.log(page);
    navigate(page);
  };

  return (
    <Navbar style={{ backgroundColor: "#e0ffff" }} className="p-2">
      <NavbarBrand className="text-dark fw-bold">HRM System</NavbarBrand>
      <Nav className="ms-auto d-flex align-items-center">
        {buttonLabel === "Employee" && (
          <NavItem>
            <Button
              color="primary"
              className="me-2"
              onClick={() => navigate(attendance)}
            >
              Attendance
            </Button>
          </NavItem>
        )}
        <NavItem>
          <Button color="primary" className="me-2" onClick={handleClick}>
            Add {buttonLabel}
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