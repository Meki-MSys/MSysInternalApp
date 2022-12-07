import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import { Users } from "react-feather";
import { useQuery } from "react-query";
import axios from "axios";
import ContentHeader from "./ContentHeader";

const Dashboard = () => {
  const EmployeeCountInstance = async () => {
    return await axios.get("api/empdetails/count");
  };
  const { data, loading, error } = useQuery("empcount", EmployeeCountInstance);
  return (
    <section className="container-fluid">
      <ContentHeader title="Dashboard" />
      <Row>
        <Col xl={3} sm={6} className="dash-col">
          <Card>
            <Card.Body>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <span className="text-uppercase fs-12 txt-color">
                    Total Count
                  </span>
                  <h3 className="custom-h-tag">{data ? data.data : 0}</h3>
                </div>
                <Users className="align-self-center icon-dual icon-md" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Dashboard;
