import { Navbar, Container, Nav, Image } from "react-bootstrap";
import "../navbar/index.css";
import defaultuser from "../../assets/user/default-user.png";
import { CartFill } from "react-bootstrap-icons";
const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-item-center">
            <Image src={defaultuser} roundedCircle className="profil-image" />
            <CartFill />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
