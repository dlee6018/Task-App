import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllTasks } from "../actions/taskActions";
import { Row, Col } from "react-bootstrap";
import Task from "../components/Task";
import Loader from "../components/Loader";

const HomePage = () => {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskList);
  const { tasks, loading, error } = taskList;

  useEffect(() => {
    dispatch(listAllTasks());
  }, [dispatch]);

  return (
    <>
      <h2>Latest Tasks: </h2>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {tasks.map((task) => (
            <Col>
              <Task task={task} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
