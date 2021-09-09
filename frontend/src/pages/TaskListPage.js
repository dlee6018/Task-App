import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { listAllTasks } from '../actions/taskActions'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'

const TaskListPage = ({history}) => {

    const dispatch = useDispatch()

    const taskList = useSelector((state) => state.taskList)

    const {loading, error, tasks} = taskList

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listAllTasks())
        }else{
            history.push('/login')
        }
    }, [dispatch, history, userInfo, ])
    return (
        <>
        <Row>
            <Col>
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task._id}</td>
                  <td>{task.name}</td>
                  <td>${task.price}</td>
                  <td>{task.category}</td>
                  <td>{task.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/task/${task._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        </Row>
        </>
    )
}

export default TaskListPage
