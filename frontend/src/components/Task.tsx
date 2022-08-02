import React from "react";
import { Row, Col, Button, Image, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

type TaskProps = {
  price: number,
  timeLimit: number,
  isCompleted: boolean,
  progressCompleted: boolean,
  isPaid: boolean,
  _id: number,
  name: string,
  image: string,
  description: string,
  category: string,
  user: user
}

type user = {
  _id : string,
  name: string,
  email: string
}
const Task = ({ task, profile, edit }: {task: TaskProps, profile:boolean, edit: boolean }): JSX.Element => {
  const history = useHistory();


  return (
    <Card
      style={{ width: "18rem" }}
      className="shadow-lg p-3 mb-5 bg-white rounded"
    >
      <span style={{ textAlign: "center", fontStyle: "italic" }}>
        {task.category.toUpperCase()} ({task.timeLimit} hours left)
      </span>
      <Row className="d-flex justify-content-between">
        <Col>
          <span style={{ fontWeight: "bold" }}>Status: </span>
          {task.isCompleted ? (
            <i className="fas fa-check-square"></i>
          ) : (
            <i className="fas fa-times" style={{ color: "red" }}></i>
          )}
        </Col>
        <Col style={{ textAlign: "right" }}>
          Reward: <span style={{ fontWeight: "bold" }}>${task.price}</span>
        </Col>
      </Row>
      <Card.Img variant="top" src={task.image} style={{ maxHeight: "11rem" }} />
      <Card.Body>
        <Card.Title>{task.name}</Card.Title>
        <Card.Text>
          <p>{task.description}</p>
        </Card.Text>
        <Row>
          <Col>
            <Link to={`/task/${task._id}`}>
              <Button variant="primary">Details</Button>
            </Link>
          </Col>
          <Col></Col>
          <Col>
            {profile && edit && (
              <>
                <Link to={`/task/${task._id}/edit`}>
                  <Button variant="secondary">Edit</Button>
                </Link>
                <Button
                  onClick={() => history.push(`/task/${task._id}/pay`)}
                  variant="success"
                >
                  Pay
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Task;
