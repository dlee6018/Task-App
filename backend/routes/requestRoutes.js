const express = require('express')
const {getAllRequests, getRequestById, getAllUserRequests, createRequest, updateRequest, deleteRequest, startTask, submitTask} = require('../controllers/requestController.js')
const {protect} = require('../middleware/authMiddleware.js')

const router = express.Router()

router.route('/').get(getAllRequests).post(protect, createRequest)

router.route('/myrequests').get(protect,getAllUserRequests)
router.route('/:id').get(getRequestById).put(protect, updateRequest).delete(protect, deleteRequest)

router.route('/:id/start').put(protect, startTask)
router.route('/:id/submit').put(protect, submitTask)

module.exports = router