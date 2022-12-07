import React from "react";
import { Col, Row } from "react-bootstrap";

const ContentHeader = ({title}) => {
  return (
    <Row>
      <Col>
        <div className="page-main-title">
          <h4 className="page-title">{title}</h4>
        </div>
      </Col>
    </Row>
  );
};

export default ContentHeader;
