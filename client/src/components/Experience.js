import React, { Fragment, useState, useReducer, useEffect } from "react";
import { Button, Modal, Row, Col, FormControl } from "react-bootstrap";
import { ExpYears, Months, LastUsed } from "./common";

const Experience = ({ exprowdata, rowcreate, singlerow, edit }) => {
  const localtheme = window.localStorage.getItem("theme");
  const [showModal, setModal] = useState(false);
  const initalState = {
    id: 0,
    skill: "",
    version: "",
    lastused: "",
    month: "",
    year: "",
    experience: "",
  };
  const SKILL = "SKILL";
  const VERSION = "VERSION";
  const LASTUSED = "LASTUSED";
  const YEAR = "YEAR";
  const MONTH = "MONTH";
  const INITALIZE = "INITALIZE";
  const UPDATE = "UPDATE";
  const dialogReducer = (state = initalState, action) => {
    const { type, payload } = action;
    switch (type) {
      case SKILL:
        return {
          ...state,
          skill: payload,
        };
      case VERSION:
        return {
          ...state,
          version: payload,
        };
      case LASTUSED:
        return {
          ...state,
          lastused: payload,
        };
      case YEAR:
        return {
          ...state,
          year: payload,
        };
      case MONTH:
        return {
          ...state,
          month: payload,
        };
      case UPDATE:
        return {
          ...state,
          id: singlerow.id,
          skill: singlerow.skill,
          version: singlerow.version,
          lastused: singlerow.lastused,
          month: singlerow.month,
          year: singlerow.year,
          experience: singlerow.experience,
        };
      case INITALIZE:
        return initalState;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(dialogReducer, initalState);
  let { id, skill, version, lastused, year, month, experience } = state;
  const addExpClick = (e) => {
    e.preventDefault();
    setModal(true);
  };

  useEffect(() => {
    // const localtheme = window.localStorage.getItem("theme");
    // setTheme(localtheme);
    if (edit) {
      dispatch({ type: UPDATE, payload: singlerow });
      setModal(true);
    }
  }, [singlerow, edit]);

  const onExpSaveProcess = () => {
    if (edit) {
      experience = year + " " + month;
      let currentRow = exprowdata.find((row) => row.id === singlerow.id);
      currentRow.id = id;
      currentRow.skill = skill;
      currentRow.version = version;
      currentRow.lastused = lastused;
      currentRow.year = year;
      currentRow.month = month;
      currentRow.experience = experience;
      rowcreate(exprowdata);
      dispatch({ type: INITALIZE });
      setModal(false);
    } else {
      let len = exprowdata.length;
      state.id = len + 1;
      state.experience = state.year + " " + state.month;
      let arr = exprowdata;
      arr = [...arr, state];
      rowcreate(arr);
      dispatch({ type: INITALIZE });
      setModal(false);
    }
  };
  const onCancelModal = () => {
    dispatch({ type: INITALIZE });
    setModal(false);
  };
  return (
    <Fragment>
      <div className="mt-3">
        <Button
          className="btn btn-sm btn-primary"
          onClick={(e) => addExpClick(e)}
        >
          Add Experience +
        </Button>
        <Modal centered show={showModal} className={localtheme}>
          <Modal.Header onHide={() => setModal(false)} closeButton>
            <Modal.Title as="h5">Add Experience</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mb-2">
            <Col lg={12}>
              <Row>
                <Col lg={12}>
                  <label className="mb-1 mt-2 label-clr">
                    Skill<span className="mx-1 text-danger">*</span>
                  </label>
                  <FormControl
                    className="custom-input"
                    type="text"
                    placeholder="Skill"
                    value={skill}
                    onChange={(e) =>
                      dispatch({ type: SKILL, payload: e.target.value })
                    }
                  />
                </Col>
                <Col lg={6}>
                  <label className="mb-1 mt-2 label-clr">
                    Version<span className="mx-1 text-danger">*</span>
                  </label>
                  <FormControl
                    className="custom-input"
                    type="text"
                    placeholder="Version"
                    value={version}
                    onChange={(e) =>
                      dispatch({ type: VERSION, payload: e.target.value })
                    }
                  />
                </Col>
                <Col lg={6}>
                  <label className="mb-1 mt-2 label-clr">Last Used</label>
                  <select
                    className="form-select custom-select"
                    value={lastused}
                    onChange={(e) =>
                      dispatch({ type: LASTUSED, payload: e.target.value })
                    }
                  >
                    <option value="DEFAULT">Select the Last Used...</option>
                    {LastUsed.map(({ label, value }) => {
                      return (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </Col>
                <Col lg={6}>
                  <label className="mb-1 mt-2 label-clr">Years</label>
                  <select
                    className="form-select custom-select"
                    value={year}
                    onChange={(e) =>
                      dispatch({ type: YEAR, payload: e.target.value })
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
                </Col>
                <Col lg={6}>
                  <label className="mb-1 mt-2 label-clr">Months</label>
                  <select
                    className="form-select custom-select"
                    value={month}
                    onChange={(e) =>
                      dispatch({ type: MONTH, payload: e.target.value })
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
                </Col>
                <Col lg={12} className="d-flex justify-content-end mt-3">
                  <Button
                    className="btn btn-sm btn-primary mx-2"
                    onClick={() => onExpSaveProcess()}
                  >
                    Save
                  </Button>
                  <Button
                    className="btn btn-sm btn-secondary"
                    onClick={() => onCancelModal()}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Col>
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

export default Experience;
