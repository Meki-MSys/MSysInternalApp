import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const AuthLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col xl={12}>
          <Row className="justify-content-center">
            {/*<Col xl={6}  className="">
                <div className="auth-page-sidebar">
                </div>
              </Col>*/}
            <Col xl={6} className="text-center form-c-login">
              {children}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthLayout;
