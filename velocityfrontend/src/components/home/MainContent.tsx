import React from "react";
import { Row, Col } from "react-bootstrap";

const MainContent: React.FC<any> = ({ children }) => {
  return (
    <Row>
      <Col>{children}</Col>
    </Row>
  );
};

export default MainContent;
