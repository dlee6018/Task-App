import React, {useState, useEffect} from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../actions/userActions'
import Loader from '../components/Loader'
const SettingsPage = () => {
    

    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.userLogin.userInfo)

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    
    const {loading, success, error} = userUpdateProfile
    
    const [name, setName] = useState(userInfo.name)
    const [email, setEmail] = useState(userInfo.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateUserProfile({
        name, email, password, confirmPassword
      }))

    }


    return (
      <>
      {loading? (<Loader/>) : (
        <Row className = 'justify-content-center'>
            <h1 style = {{textAlign: "center"}}>Update User Profile</h1>
            <Col md = {6}>
            <Form onSubmit = {submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
            </Form>
            </Col>
        </Row>
      )}
        </>
    )
}

export default SettingsPage
