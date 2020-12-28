import React from 'react'
import {Container, Nav, Navbar} from "react-bootstrap";

const Header = () => {
    return <header>
        <Navbar Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">A2Z Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/cart">
                            <i className='fas fa-shopping-cart'/>
                            Cart
                        </Nav.Link>
                        <Nav.Link href="/login">
                            <i className='fas fa-user'/>
                            Sign In
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
};

export default Header;
