import React,  {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../components/Loader'
import {PayPalButton} from 'react-paypal-button-v2'
import {ListGroup, Image} from 'react-bootstrap'
import { listTaskDetails, payTask } from '../actions/taskActions'
import FormContainer from '../components/FormContainer'
import { TASK_PAY_RESET } from '../constants/taskConstants'
import axios from 'axios'
import Message from '../components/Message'

const PaymentScreen = ({match}) => {

  const dispatch = useDispatch()
  const taskDetails = useSelector((state) => state.taskDetails)
  
    const {task} = taskDetails

    const [sdkReady, setSdkReady] = useState(false)
    

    const taskPay = useSelector((state) => state.taskPay)
    const {loading: loadingPay, success: successPay} = taskPay

    const successPaymentHandler = (paymentResult) => {
    dispatch(payTask(match.params.id, paymentResult))
      } 


      useEffect(() => {
        const addPayPalScript = async () => {
        const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
              setSdkReady(true)
            }
            document.body.appendChild(script)
          }
          if (!task|| successPay ||task._id !== match.params.id) {
            dispatch({ type: TASK_PAY_RESET })
            dispatch(listTaskDetails(match.params.id))
          } else if (!task.isPaid) {
            if (!window.paypal) {
              addPayPalScript()
            } else {
              setSdkReady(true)
            }
          }

    }, [dispatch, successPay, task])

    return(
        <>
        <h1>Payment method</h1>
        <ListGroup>
        <ListGroup.Item>Name: {task.name}</ListGroup.Item>
        <ListGroup.Item>Price: ${task.price}</ListGroup.Item>
        <ListGroup.Item>Category: {task.category}</ListGroup.Item>
        <ListGroup.Item>
            <Image src = {task.image} style = {{maxHeight:"10rem"}}/>
        </ListGroup.Item>
        {task.isPaid ? (
                <Message variant='success'>Paid on {task.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
        {!task.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={task.price}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
      </ListGroup>
        </>
    )
}

export default PaymentScreen