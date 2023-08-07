import React, { useState } from "react";

// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// STYLES AND AESSETS
import "./Header.css";

function Header() {
  const [expanded, setExpanded] = useState(false);
  return (
    <header>
      <Navbar
        className="navbarDesign"
        variant="light"
        expand="md"
        expanded={expanded}
      >
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-center">
              <Nav.Link href="#bookingList">Task List</Nav.Link>
              <Nav.Link href="#addTask">Add Task</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;