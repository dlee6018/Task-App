import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { TASK_UPDATE_RESET, TASK_CREATE_RESET } from '../constants/taskConstants'
import { listTaskDetails, updateTask } from '../actions/taskActions'
import axios from 'axios'
const TaskEditPage = ({match,history}) => {

    const taskId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [timeLimit, setTimeLimit] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const taskDetails = useSelector((state) => state.taskDetails)
    const {loading, error, task} = taskDetails

    const taskUpdate = useSelector((state) => state.taskUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = taskUpdate

    const taskCreate = useSelector((state) => state.taskCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate} = taskCreate

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateTask({_id: taskId, name, price, image, timeLimit, isCompleted, category, description}))
    }

    const [uploading, setUploading] = useState(false)

    const uploadFileHandler = async (e) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      setUploading(true)

      try{
          const config = {
              headers:{
                  'Content-Type': 'multipart/form-data'
              }
          }
          const {data} = await axios.post('/api/upload', formData, config)

          setImage(data)
          setUploading(false)
          console.log('working')
      }catch(error){
          console.error(error)
          setUploading(false)
      }
  }

    useEffect(() => {
        if(successCreate){
          setName('Sample name')
          setPrice(0)
          setImage('https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg')
          setCategory('homework')
          setDescription('Sample description')
          setIsCompleted(false)
          setTimeLimit(24)
          dispatch({type: TASK_CREATE_RESET})
        }
        if(successUpdate){
            dispatch({type: TASK_UPDATE_RESET})
            history.push('/profile')
        }else{
            if(!task.name || task._id !== taskId){
                dispatch(listTaskDetails(taskId))
            }else{
                setName(task.name)
                setPrice(task.price)
                setImage(task.image)
                setCategory(task.category)
                setDescription(task.description)
                setIsCompleted(task.isCompleted)
                setTimeLimit(task.timeLimit)
            }
        }
    },[dispatch, history, successUpdate, taskId, task])
    return (
        <>
          <Link to = '/profile' className = 'btn btn-light my-3'>
              Go To Profile
        </Link>  
        <FormContainer>
            <h1>Edit Task</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant = 'danger'>{errorUpdate}</Message>}
            {loading? (
                <Loader/>): error? (
                    <Message variant = 'danger'>{error}</Message>
                ):(
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id = 'image-file'
                label = 'Choose File'
                custom
                onChange = {uploadFileHandler}
                ></Form.File>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Time Limit</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter time limit'
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Completed </Form.Label>
              <Form.Control
                type='boolean'
                placeholder='Status'
                value={isCompleted}
              ></Form.Control>
            </Form.Group>
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Change Status
            </Dropdown.Toggle>

            <Dropdown.Menu >
                <Dropdown.Item  onClick = {() => setIsCompleted(false)}>false</Dropdown.Item>
                <Dropdown.Item onClick = {() => setIsCompleted(true)}>true</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
              
                value={category}
              ></Form.Control>
            </Form.Group>
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Pick a Category
            </Dropdown.Toggle>

            <Dropdown.Menu >
                <Dropdown.Item value = 'homework' onClick = {() => setCategory('homework')}>Homework</Dropdown.Item>
                <Dropdown.Item value = 'test' onClick = {() => setCategory('test')}>Test</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
                )
            }
        </FormContainer>
        </>
    )
}

export default TaskEditPage
