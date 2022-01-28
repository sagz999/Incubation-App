import React from 'react'
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'


const Header = () => {

    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userInfo'))
    const count = localStorage.getItem('count')

    if (userData) {
        if (userData.isAdmin) {
            return (
                <Navbar bg="primary" expand="lg" variant="dark">
                    <Container>
                        <Navbar.Brand>
                            <Link style={{
                                textDecoration: "none",
                                color: "#fff",
                                fontWeight: "bold"
                            }} to='/adminHome'>
                                ADMIN-PANEL
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav>
                                <Nav.Link>
                                    <Link style={{
                                        textDecoration: "none",
                                        color: "#fff"
                                    }} to='/adminHome'>
                                        Home<Badge bg="danger">{count}</Badge>
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{
                                        textDecoration: "none",
                                        color: "#fff"
                                    }} to='/requestStatus'>
                                        All-Requests
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{
                                        textDecoration: "none",
                                        color: "#fff"
                                    }} to='/viewSlots'>
                                        Manage-Slots
                                    </Link>
                                </Nav.Link>
                                <NavDropdown title="Profile" id="basic-nav-dropdown">

                                    <NavDropdown.Item onClick={() => {
                                        localStorage.removeItem("userInfo");
                                        localStorage.removeItem("count");
                                        navigate('/');
                                    }}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )
        } else {
            return (
                <Navbar bg="primary" expand="lg" variant="dark">

                    <Container>

                        <Navbar.Brand>
                            <Link style={{
                                textDecoration: "none",
                                color: "#fff",
                                fontWeight: "bold"
                            }} to='/'>
                                INCUBATOR
                            </Link>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">

                            <Nav>

                                <Nav.Link>
                                    <Link style={{
                                        textDecoration: "none",
                                        color: "#fff"
                                    }} to='/bookings'>
                                        My bookings
                                    </Link>
                                </Nav.Link>

                                <NavDropdown title="Profile" id="basic-nav-dropdown">

                                    <NavDropdown.Item onClick={() => {
                                        localStorage.removeItem("userInfo");
                                        navigate('/');
                                    }}>Logout</NavDropdown.Item>

                                </NavDropdown>

                            </Nav>

                        </Navbar.Collapse>

                    </Container>

                </Navbar>
            )
        }
    } else {
        return (
            <Navbar bg="primary" expand="lg" variant="dark">

                <Container>

                    <Navbar.Brand>

                        <Link style={{
                            textDecoration: "none",
                            color: "#fff",
                            fontWeight: "bold"
                        }} to='/'>
                            INCUBATOR
                        </Link>

                    </Navbar.Brand>

                </Container>

            </Navbar>
        )
    }


}

export default Header
