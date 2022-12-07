import React, {
  Fragment,
  useState,
  useReducer,
  useRef,
  useEffect,
} from "react";
import { connect } from "react-redux";
import ContentHeader from "./ContentHeader";
import { Row, Col, Card, Form, FormControl, Button } from "react-bootstrap";
import Experience from "./Experience";
import Table from "./Table";
import { ExpYears, Months } from "./common";
import { FormAction } from "./action/formAction";
import { Spinner } from "react-bootstrap";
import classNames from "classnames";
import axios from "axios";
import { store } from "./common/store";

const EMPID = "EMPID";
const NAME = "NAME";
const EMAIL = "EMAIL";
const PROJECTNAME = "PROJECTNAME";
const YEAR = "YEAR";
const MONTH = "MONTH";
const SKILL = "SKILL";
const SKILLEXP = "SKILLEXP";
const INITALIZE = "INITALIZE";
const EDITED_VALUE = "EDITED_VALUE";
const SKILLDELETE = "SKILLDELETE";

const FormPage = ({ FormAction }) => {
  let getStoredData = store.getState();
  let getempdata = getStoredData.empdata;
  let Email = getempdata.email;
  const [skillvalue, setSkillvalue] = useState("");
  const [valid, setVaild] = useState({
    nameerr: false,
    emailerr: false,
    projectnameerr: false,
    yearerr: false,
    montherr: false,
    skillserr: false,
    empIderr: false,
  });
  const nameref = useRef(null);
  const empref = useRef(null);
  const emailref = useRef(null);
  const projectnameref = useRef(null);
  const [error, setError] = useState("");
  const [formspinner, setFormSpinner] = useState(false);
  const [singlerow, setSingleRow] = useState(null);
  const [editrow, setEditRow] = useState(false);
  const {
    nameerr,
    emailerr,
    projectnameerr,
    yearerr,
    montherr,
    skillserr,
    empIderr,
  } = valid;
  const initalState = {
    empId: "",
    name: "",
    email: Email,
    projectname: "",
    year: "",
    month: "",
    totalexp: "",
    skills: [],
    skillexp: [],
  };
  const Empformreducer = (state = initalState, action) => {
    setError("");
    const { type, payload } = action;
    switch (type) {
      case EMPID:
        setVaild({ empIderr: false });
        return {
          ...state,
          empId: payload,
        };
      case NAME:
        setVaild({ nameerr: false });
        return {
          ...state,
          name: payload,
        };
      case EMAIL:
        setVaild({ emailerr: false });
        return {
          ...state,
          email: payload,
        };
      case PROJECTNAME:
        setVaild({ projectnameerr: false });
        return {
          ...state,
          projectname: payload,
        };
      case YEAR:
        setVaild({ yearerr: false });
        return {
          ...state,
          year: payload,
        };
      case MONTH:
        setVaild({ montherr: false });
        return {
          ...state,
          month: payload,
        };

      case SKILL:
        setVaild({ skillserr: false });
        return {
          ...state,
          skills: [...state.skills, payload],
        };
      case SKILLDELETE: {
        return {
          ...state,
          skills: payload,
        };
      }
      case SKILLEXP:
        return {
          ...state,
          skillexp: payload,
        };
      case EDITED_VALUE:
        return {
          ...state,
          empId: payload.empId,
          name: payload.name,
          email: payload.email,
          projectname: payload.projectname,
          year: payload.year,
          month: payload.month,
          totalexp: payload.totalexp,
          skills: payload.skills,
          skillexp: payload.skillexp,
        };
      case INITALIZE:
        setVaild({
          nameerr: false,
          emailerr: false,
          projectnameerr: false,
          yearerr: false,
          montherr: false,
          skillserr: false,
          empIderr: false,
        });
        return initalState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(Empformreducer, initalState);
  const {
    empId,
    name,
    email,
    projectname,
    year,
    month,
    totalexp,
    skills,
    skillexp,
  } = state;

  useEffect(() => {
    if (Email) {
      setFormSpinner(true);
      axios.get(`api/empdetails/${Email}`).then((res) => {
        if (res.data) {
          const call = res.data.msg
            ? ""
            : dispatch({ type: EDITED_VALUE, payload: res.data });
        }
        setFormSpinner(false);
      });
    }
  }, []);

  const COLUMNS = [
    {
      Header: "ID",
      accessor: "id",
      sort: true,
    },
    {
      Header: "Skill",
      accessor: "skill",
      sort: true,
    },
    {
      Header: "Version",
      accessor: "version",
      sort: true,
    },
    {
      Header: "Last Used",
      accessor: "lastused",
      sort: true,
    },
    {
      Header: "Total Experience",
      accessor: "experience",
      sort: true,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!empId) {
      empref.current.focus();
      setError("Enter the Employee ID");
      setVaild({ empIderr: true });
      return false;
    }
    if (!name) {
      nameref.current.focus();
      setError("Enter the Name");
      setVaild({ nameerr: true });
      return false;
    } else if (!email) {
      emailref.current.focus();
      setError("Enter the Email");
      setVaild({ emailerr: true });
      return false;
    } else if (!projectname) {
      projectnameref.current.focus();
      setError("Enter the Project Name");
      setVaild({ projectnameerr: true });
      return false;
    } else if (!year) {
      setError("Select the Year");
      setVaild({ yearerr: true });
      return false;
    } else if (!month) {
      setError("Select the Month");
      setVaild({ montherr: true });
      return false;
    } else if (skills.length === 0) {
      setError("Enter the Skills");
      setVaild({ skillserr: true });
      return false;
    }
    setFormSpinner(true);

    let totalexperience = `${year} - ${month}`;
    state.totalexp = totalexperience;
    FormAction(state);
    setTimeout(() => {
      setFormSpinner(false);
      dispatch({ type: INITALIZE });
    }, 500);
  };
  const onExpRowCreate = (data) => {
    dispatch({ type: "SKILLEXP", payload: data });
    setEditRow(false);
  };
  const onResetClick = () => {
    setSkillvalue("");
    dispatch({ type: "INITALIZE" });
  };
  const onRowEdit = (row, value) => {
    if (!value) {
      setSingleRow(row);
      setEditRow(true);
    } else {
      const getId = row.id;
      const filterRow = skillexp.filter((row) => row.id !== getId);
      for (let i = 0; i < filterRow.length; i++) {
        filterRow[i].id = i + 1;
      }
      dispatch({ type: "SKILLEXP", payload: filterRow });
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setSkillvalue(value);
  };
  const handleKeyDown = (e) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();

      var val = skillvalue.trim();

      if (val) {
        dispatch({ type: "SKILL", payload: val });
      }
      setSkillvalue("");
    }
  };
  const handleDelete = (item) => {
    let filter = skills.filter((skill) => skill !== item);
    dispatch({ type: "SKILLDELETE", payload: filter });
  };

  return (
    <Fragment>
      <section className="container-fluid">
        <ContentHeader title="Form Page" />
        <Row>
          {formspinner ? (
            <Spinner animation="border" className="frm-spinner" />
          ) : null}
          <Col lg={12}>
            <Card
              className={classNames("mx-3", { frm_back: formspinner === true })}
            >
              <Card.Body>
                <Form noValidate onSubmit={(e) => handleSubmit(e)}>
                  <Row>
                    <Col lg={2}>
                      <label className="mb-1 label-clr">
                        Emp ID<span className="mx-1 text-danger">*</span>
                      </label>
                      <FormControl
                        className="custom-input"
                        type="text"
                        placeholder="Emp ID"
                        ref={empref}
                        value={empId}
                        onChange={(e) =>
                          dispatch({ type: EMPID, payload: e.target.value })
                        }
                      />
                      {empIderr ? (
                        <div className="mt-1 err-txt">{error}</div>
                      ) : null}
                    </Col>
                    <Col lg={4}>
                      <label className="mb-1 label-clr">
                        Name<span className="mx-1 text-danger">*</span>
                      </label>
                      <FormControl
                        className="custom-input"
                        type="text"
                        placeholder="Name"
                        ref={nameref}
                        value={name}
                        onChange={(e) =>
                          dispatch({ type: NAME, payload: e.target.value })
                        }
                      />
                      {nameerr ? (
                        <div className="mt-1 err-txt">{error}</div>
                      ) : null}
                    </Col>
                    <Col lg={6}>
                      <label className="mb-1 label-clr">
                        Email<span className="mx-1 text-danger">*</span>
                      </label>
                      <FormControl
                        className="custom-input disable-control"
                        type="text"
                        placeholder="Email"
                        ref={emailref}
                        disabled
                        value={email}
                        onChange={(e) =>
                          dispatch({ type: EMAIL, payload: e.target.value })
                        }
                      />
                      {emailerr ? (
                        <div className="mt-1 err-txt">{error}</div>
                      ) : null}
                    </Col>
                    <Col lg={6}>
                      <label className="mb-1 mt-2 label-clr">
                        Project Name<span className="mx-1 text-danger">*</span>
                      </label>
                      <FormControl
                        className="custom-input"
                        type="text"
                        placeholder="Project Name"
                        ref={projectnameref}
                        value={projectname}
                        onChange={(e) =>
                          dispatch({
                            type: PROJECTNAME,
                            payload: e.target.value,
                          })
                        }
                      />
                      {projectnameerr ? (
                        <div className="mt-1 err-txt">{error}</div>
                      ) : null}
                    </Col>
                    <Col lg={3}>
                      <label className="mb-1 mt-2 label-clr">
                        Total Experience
                        <span className="mx-1 text-danger">*</span>
                      </label>
                      <select
                        className="form-select custom-select"
                        value={year}
                        onChange={(e) =>
                          dispatch({
                            type: YEAR,
                            payload: e.target.value,
                          })
                        }
                      >
                        <option value="DEFAULT">Select the Year...</option>
                        {ExpYears.map(({ label, value }) => {
                          return (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                      {yearerr ? (
                        <div className="mt-1 err-txt">{error}</div>
                      ) : null}
                    </Col>
                    <Col lg={3}>
                      <label className="mb-1 mt-2 label-clr">&nbsp;</label>
                      <select
                        className="form-select custom-select"
                        value={month}
                        onChange={(e) =>
                          dispatch({
                            type: MONTH,
                            payload: e.target.value,
                          })
                        }
                      >
                        <option value="DEFAULT">Select the Month...</option>
                        {Months.map(({ label, value }) => {
                          return (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                      {montherr ? (
                        <div className="mt-1 err-txt">{error}</div>
                      ) : null}
                    </Col>
                    <Col lg={12}>
                      <React.Fragment>
                        <label className="mt-2 label-clr">
                          Skills<span className="mx-1 text-danger">*</span>
                        </label>
                        <div className="tag-container">
                          {skills.length !== 0
                            ? skills.map((item) => (
                                <div className="tag-item" key={item}>
                                  <span className="span-item">{item}</span>
                                  <Button
                                    type="button"
                                    className="btn btn-danger btn-sm btn-custom-x"
                                    onClick={() => handleDelete(item)}
                                  >
                                    &times;
                                  </Button>
                                </div>
                              ))
                            : null}
                        </div>
                        <FormControl
                          className="custom-input"
                          value={skillvalue}
                          placeholder="Type your skills and press `Enter`..."
                          onKeyDown={(e) => handleKeyDown(e)}
                          onChange={(e) => handleChange(e)}
                        />
                        {skillserr ? (
                          <div className="mt-1 err-txt">{error}</div>
                        ) : null}
                      </React.Fragment>
                    </Col>
                    <Col lg={12}>
                      <Experience
                        exprowdata={skillexp}
                        rowcreate={onExpRowCreate}
                        singlerow={singlerow}
                        edit={editrow}
                      />
                    </Col>
                    <Col lg={12} className="mt-2">
                      <Table
                        columns={COLUMNS}
                        data={skillexp}
                        pagination={skillexp.length > 5 ? true : false}
                        pagesize={5}
                        action={true}
                        ongeteditrow={onRowEdit}
                      />
                    </Col>
                    <Col lg={12} className="mt-4">
                      <hr />
                      <Button
                        className="btn btn-md btn-primary mx-2"
                        type="submit"
                      >
                        Save
                      </Button>
                      <Button
                        className="btn btn-md btn-danger"
                        onClick={() => onResetClick()}
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Fragment>
  );
};

export default connect(null, { FormAction })(FormPage);
