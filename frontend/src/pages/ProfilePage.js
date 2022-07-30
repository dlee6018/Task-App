import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasksByUser } from "../actions/taskActions";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import Loader from "../components/Loader";
import { deleteTask } from "../actions/taskActions";

const ProfilePage = ({ history }) => {
  const dispatch = useDispatch();

  const [tableMode, setTableMode] = useState(false);
  const myTasks = useSelector((state) => state.myTasks);
  const { loading, tasks, error } = myTasks;

  const taskDelete = useSelector((state) => state.taskDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskDelete;
  useEffect(() => {
    dispatch(getAllTasksByUser());
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    dispatch(deleteTask(id));
  };

  const showStartedTask = (tasks) => {
    const filteredTasks = tasks.filter((task) => task.progressUser !== "")
    return filteredTasks
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>MY TASKS:</h1>
          <div style = {{display:"flex", justifyContent:"space-around", marginBottom:"1rem"}}>
            <Button onClick={() => setTableMode(true)}>Table View </Button>
            <Button onClick={() => setTableMode(false)}>Image View </Button>
            {/* <Button onClick = {() => showStartedTask()}>Started Tasks</Button> */}
          </div>
          {tableMode ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Time Limit</th>
                  <th>Completed</th>
                  <th></th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr>
                    <td>{task.name}</td>
                    <td>{task.category}</td>
                    <td>{task.timeLimit} hours</td>
                    <td>
                      {task.isCompleted ? (
                        <i class="fas fa-check-square"></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/task/${task._id}`}>
                        <Button>Details</Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        disabled={task.user !== userInfo._id}
                        onClick={() => history.push(`/task/${task._id}/edit`)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                    </td>
                    <td>
                      <Button
                        disabled={task.user !== userInfo._id}
                        onClick={() => deleteHandler(task._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Row>
              {tasks.map((task) => (
                <Col>
                  <Task
                    task={task}
                    profile={true}
                    edit={userInfo._id === task.user}
                  />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default ProfilePage;
