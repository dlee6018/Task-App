import React, {useState, useEffect} from 'react'
import { Row, Col,Button, Image , Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {listTaskDetails} from '../actions/taskActions'
import Loader from '../components/Loader'
import { startTask } from '../actions/taskActions'
import { submitTask } from '../actions/taskActions'
import FileUpload from '../components/FileUpload'
import FilesList from '../components/FilesList'
import axios from 'axios'

const TaskDetailsPage = ({match}) => {


    const dispatch = useDispatch()

    
    const [uploading, setUploading] = useState(false)

    const [file, setFile] = useState('')
    const taskDetails = useSelector((state) => state.taskDetails)
    const {task, loading, error} = taskDetails

    const taskStart = useSelector((state) => state.taskStart)
    const {loading:loadingStart, success:successStart, error:errorStart} = taskStart

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const taskSubmit = useSelector((state) => state.taskSubmit)
    const {loading: loadingSubmit, success: successSubmit, error: errorSubmit} = taskSubmit

    const taskUpload = useSelector((state) => state.taskUpload)
    const {loading: loadingUpload, success: successUpload, error: errorUpload} = taskUpload

    useEffect(() => {
        dispatch(listTaskDetails(match.params.id))
    }, [dispatch, successStart, successSubmit, successUpload])

    const startTaskHandler = () => {
        dispatch(startTask(match.params.id))
    }

    const submitTaskHandler = () => {
        dispatch(submitTask(match.params.id))
    }

    return (
        <>
        {loading? <Loader/>: (
            <>
            <Row style = {{borderBottom: "3px solid black"}} className = 'd-flex justify-content-between'>
                <Col>
                <h1>{task.name}</h1>
                </Col>
                <Col style = {{textAlign: "right"}}>

                {task.progressCompleted === false && typeof task.progressUser === 'undefined' ?
                <Button onClick = {startTaskHandler}>Start</Button>: task.progressUser.email == userInfo.email && task.progressCompleted == false? <Button onClick = {submitTaskHandler}>Submit Task</Button>
                :task.progressUser.email == userInfo.email && task.progressCompleted == true? <h4>Congratulations You have submited the task</h4>:<h3>Task In Progress By {task.progressUser.email}</h3>
                } 
                </Col>
            </Row>
            <Row >
                <Col><h4>TimeLimit: {task.timeLimit}hrs</h4></Col>
                <Col><h4>Price: ${task.price}</h4></Col>
                <Col><h4>Category: {task.category}</h4></Col>
                <Col><span style = {{fontWeight: "bold"}}>Completed: </span>{task.isCompleted? <i class="fas fa-check-square"></i> :  (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
        )}</Col>
            </Row>
            <h4>Posted By: {task.user.name} | {task.user.email}</h4>
            <Image src = {task.image} style = {{width:"35rem"}}/>
            <Row>
                <Col>
                <h3>Task Description: </h3>
                <p style = {{fontSize: "1.5rem"}}>{task.description}</p>
                </Col>
            </Row>
            {typeof task.progressUser !== 'undefined' && (task.progressUser.email === userInfo.email || task.user.email === userInfo.email) && 
            <Row>
            <Col>
            <FilesList/>
            </Col>
            <Col>
            <FileUpload/>
            </Col>
        </Row>
            }
            </>
        )}
        </>
    )
}

export default TaskDetailsPage
