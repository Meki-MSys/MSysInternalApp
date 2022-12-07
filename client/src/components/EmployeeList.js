import React, { useMemo } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { useQuery } from "react-query";
import axios from "axios";
import ContentHeader from "./ContentHeader";
import Table from "./Table";

const EmployeeList = () => {
  const COLUMNS = [
    {
      Header: "EmpID",
      accessor: "empId",
      sort: true,
    },
    {
      Header: "Name",
      accessor: "name",
      sort: true,
    },
    {
      Header: "Email",
      accessor: "email",
      sort: true,
    },
    {
      Header: "Project Name",
      accessor: "projectname",
      sort: true,
    },
    {
      Header: "Total Experience",
      accessor: "totalexp",
      sort: true,
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const EmployeeInstance = async () => {
    return await axios.get("api/empdetails/all");
  };
  const { data, loading, error } = useQuery({
    queryKey: "employee",
    queryFn: EmployeeInstance,
    refetchOnReconnect:true
    // retry: true,
    // refetchOnWindowFocus: true,
  });

  return (
    <section className="container-fluid">
      <ContentHeader title="Employee Detail List" />
      <Row>
        <Col>
          <Card className="mx-3">
            <Card.Body>
              {data && <Table columns={columns} data={data.data} />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default EmployeeList;
