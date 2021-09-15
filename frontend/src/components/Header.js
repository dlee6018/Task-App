import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Navbar,Button,NavDropdown,Nav, Container } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userActions'
import {createTask} from '../actions/taskActions'
import { useHistory } from 'react-router-dom'

const Header = () => {

  
    let history = useHistory()
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo, loading, error} = userLogin

    const taskCreate = useSelector((state) => state.taskCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, task: createdTask} = taskCreate

    const logoutHandler = () => {
        dispatch(logout())
        history.push('/login')
      }
    
    const createTaskHandler = () => {
      dispatch(createTask())
    }

    useEffect(() => {
      if(successCreate){
        history.push(`/task/${createdTask._id}/edit`)
      }
    }, [dispatch, history, successCreate])

    return (
        <Navbar bg="light" expand="lg" className = 'justify-content-around'>
            <Container>
                <LinkContainer to = '/' >
                <Navbar.Brand ><i class="fab fa-ioxhost"></i>TASKS</Navbar.Brand>
                </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className ="justify-content-end">
          <Nav className="ml-auto">
          {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick = {createTaskHandler}>
                    Create Task
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                  <LinkContainer to = '/settings'>
                    <NavDropdown.Item>Settings</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/taskList'>
                    <NavDropdown.Item>Tasks</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              </Nav>
        </Navbar.Collapse>
            </Container>
      </Navbar>
    )
}

export default Header
