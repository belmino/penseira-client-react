import React from 'react'
import {Navbar, NavbarBrand, Nav, Container} from 'react-bootstrap'

const Navigation = () => {

    return (
        <Navbar bg="dark" expand="lg" variant="dark" className="p-3">
            <Container>
                <NavbarBrand href="/" >
                <i className="material-icons">
                        </i> Tag-Block
                </NavbarBrand>
                <Navbar.Toggle aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" ></Navbar.Toggle>
                <Navbar.Collapse id="navbarNav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">
                            Lista
                        </Nav.Link>
                        <Nav.Link href="/cad">
                            Cadastro
                        </Nav.Link>
                        <Nav.Link href="/contexts">
                            Contextos
                        </Nav.Link>
                        <Nav.Link href="/filter">
                            Filtro
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation