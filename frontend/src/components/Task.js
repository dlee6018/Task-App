import React from 'react'
import { Row, Col, Button, Image, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Task = ({task, profile}) => {
    return (
        <Card style={{ width: '18rem' }} className = "shadow-lg p-3 mb-5 bg-white rounded">
        <span style = {{textAlign: "center", fontStyle: "italic"}}>{task.category.toUpperCase()} ({task.timeLimit} hours left)</span> 
        <Row className = 'd-flex justify-content-between'>
        <Col>
        <span style = {{fontWeight: "bold"}}>Status: </span>{task.isCompleted? <i class="fas fa-check-square"></i> :  (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
        )}
        </Col>   
        <Col style = {{textAlign: "right"}}>
        Reward: <span style = {{fontWeight: "bold"}}>${task.price}</span>
        </Col>
        </Row>
        <Card.Img variant="top" src={task.image} />
        <Card.Body>
            <Card.Title>{task.name}</Card.Title>
            <Card.Text>
            <p>{task.description}</p>
            </Card.Text>
            <Row>
                <Col>
                <Link to = {`/task/${task._id}`}>
                    <Button variant = 'primary'>
                        Details
                    </Button>
                </Link>
                </Col>
                <Col>
                {profile && 
                <Link to = {`/task/${task._id}/edit`}>
                    <Button variant = 'secondary'>
                        Edit
                    </Button>
                </Link>}
                </Col>
            </Row>
        </Card.Body>
        </Card>
    )
}

export default Task
