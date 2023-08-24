import {
  Navbar,
  Container,
  Nav,
  Image,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import "../navbar/index.css";
import defaultuser from "../../assets/user/default-user.png";
import { Cart } from "react-bootstrap-icons";
const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Row className="align-items-center">
              <Col className="col-md-12 col-lg-6">
                <Cart className="cart-icon" color="white" fontSize={23} />
              </Col>
              <Col className="col-md-12 col-lg-6">
                <Image
                  src={defaultuser}
                  roundedCircle
                  className="profil-image"
                />
              </Col>
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
