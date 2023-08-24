import NavigationBar from "./navbar";
import Sidebar from "./sidebar";
import { Row, Col } from "react-bootstrap";
const MainLayout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <Row>
        <Col className="col-md-3">
          <Sidebar />
        </Col>
        <Col className="col-md-9">{children}</Col>
      </Row>
    </>
  );
};

export default MainLayout;
