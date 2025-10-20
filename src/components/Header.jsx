import { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Navbar principal */}
      <Navbar
        expand="lg"
        variant="dark"
        className="py-3"
        style={{
          background: 'linear-gradient(90deg, #98FF98 0%, #6ff86fff 100%)',
        }}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold text-white fs-4"
            style={{ letterSpacing: '1px' }}
          >
            MeliSync
          </Navbar.Brand>

          {/* Botón hamburguesa para móvil */}
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={() => setShow(true)}
          />
          <Navbar.Collapse className="d-none d-lg-flex justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="/" className="text-white fw-semibold">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/analytics" className="text-white fw-semibold">
                Analíticas
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-white fw-semibold">
                Contacto
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="text-white fw-semibold">
                Iniciar Sesión
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-white fw-semibold">
                Registrarse
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Menú lateral (Offcanvas) */}
      <Offcanvas
        id="offcanvasNavbar"
        show={show}
        onHide={() => setShow(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>MeliSync</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={() => setShow(false)}>
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/analytics" onClick={() => setShow(false)}>
              Analíticas
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setShow(false)}>
              Contacto
            </Nav.Link>
            <Nav.Link as={Link} to="/login" onClick={() => setShow(false)}>
              Iniciar Sesión
            </Nav.Link>
            <Nav.Link as={Link} to="/register" onClick={() => setShow(false)}>
              Registrarse
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
