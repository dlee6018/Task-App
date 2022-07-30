const express = require('express')
const {getAllRequests, getRequestById, getAllUserRequests, createRequest, updateRequest, deleteRequest, startTask, submitTask, completeTask, updateRequestToPaid} = require('../controllers/requestController.js')
const {protect} = require('../middleware/authMiddleware.js')

const router = express.Router()

router.route('/').get(getAllRequests).post(protect, createRequest)

router.route('/myrequests').get(protect,getAllUserRequests)
router.route('/:id').get(getRequestById).put(protect, updateRequest).delete(protect, deleteRequest)

router.route('/:id/start').put(protect, startTask)
router.route('/:id/submit').put(protect, submitTask)
router.route('/:id/complete').put(protect, completeTask)
router.route('/:id/pay').put(protect, updateRequestToPaid)

module.exports = router