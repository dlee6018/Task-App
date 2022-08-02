import React, {useState, useEffect} from 'react'
import { Row, Col,Button, Image , Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {listTaskDetails} from '../actions/taskActions'
import Loader from '../components/Loader'
import { submitTask, completeTask,startTask } from '../actions/taskActions'
import FileUpload from '../components/FileUpload'
import FilesList from '../components/FilesList'
import axios from 'axios'

const TaskDetailsPage = ({match, history}) => {


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

    const taskComplete = useSelector((state) => state.taskComplete)
    const {loading: loadingComplete, success: successComplete, error: errorComplete} = taskComplete
    
    const taskUpload = useSelector((state) => state.taskUpload)
    const {loading: loadingUpload, success: successUpload, error: errorUpload} = taskUpload

    useEffect(() => {
        if(userInfo){
            dispatch(listTaskDetails(match.params.id))
        }else{
            history.push('/login')
        }
    }, [dispatch, successStart, successSubmit, successUpload, successComplete])

    const startTaskHandler = () => {
        dispatch(startTask(match.params.id))
    }

    const submitTaskHandler = () => {
        dispatch(submitTask(match.params.id))
    }

    const completeTaskHandler = () => {
        dispatch(completeTask(match.params.id))
    }

    return (
        <>
        {loading || userInfo == null? <Loader/>: (
            <>
            <Row style = {{borderBottom: "3px solid black", paddingBottom:"5px"}} className = 'd-flex justify-content-between'>
                <Col >
                <h4><span>Name:</span> {task.name}</h4>
                </Col>
                {userInfo?
                <Col style = {{textAlign: "right"}}>
                {task.progressCompleted === false && typeof task.progressUser === 'undefined' ?
                <Button disabled = {task.user._id === userInfo._id} onClick = {startTaskHandler}>Start</Button>: task.progressUser.email === userInfo.email && task.progressCompleted === false? <Button onClick = {submitTaskHandler}>Submit Task</Button>
                :task.progressUser.email === userInfo.email && task.progressCompleted === true? <h4>Congratulations You have submited the task</h4>:<h3>Task In Progress By {task.progressUser.email}</h3>
                } 
                </Col>
                :(<></>) 
                }
            </Row>
            <Row >
                <Col><h4>TimeLimit: {task.timeLimit}hrs</h4></Col>
                <Col><h4>Price: ${task.price}</h4></Col>
                <Col><h4>Category: {task.category}</h4></Col>
                <Col><span style = {{fontWeight: "bold"}}>Completed: </span>{task.isCompleted? <i class="fas fa-check-square"></i> :  (
            <i className='fas fa-times' style={{ color: 'red' }}></i>
        )}</Col>

        <Col>
        {userInfo && task.isCompleted ===false && task.progressCompleted && task.user._id === userInfo._id && <Button onClick = {completeTaskHandler}>Complete</Button>}
        </Col>
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
