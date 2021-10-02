const asyncHandler = require('express-async-handler')
const { create, update } = require('../models/requestModel.js')
const Request = require('../models/requestModel.js')


const findRequestAvailableById = (id) => {
  const request = Request.findById(id)
  if(request){
    return request
  }else{
    res.status(404)
    throw new Error('Request not found"')
  }
}

const getAllRequests = asyncHandler(async(req, res) => {
  const requests = await Request.find({})
  
  if(requests){ 
      res.json(requests)
  }else{
      res.status(404)
      throw new Error('Requests not found')
  }
})
const getRequestById = asyncHandler(async (req, res) => {
  let request = await Request.findById(req.params.id).populate('user', 'name email').populate('progressUser', 'name email')
  if (request) {
    res.json(request)
  } else {
    res.status(404)
    throw new Error('task not found')
  }
})

const getAllUserRequests = asyncHandler(async(req, res) => {
  const requests = await Request.find({user: req.user._id})

  if(requests){
    res.json(requests)
  }else{
    res.status(404)
    throw new Error('User has no requests')
  }
})

const createRequest = asyncHandler(async(req, res) => {
  const request = new Request({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    timeLimit: 24,
    isCompleted: false,
    description: 'Sample description',
    category: 'Sample category',
    image: '/images/sample.jpg'
  })

  const createdRequest = await request.save()
  res.status(201).json(createdRequest)
})

const updateRequest = asyncHandler(async(req, res) => {
  const {
    price, timeLimit, isCompleted, name, image, description, category
  } = req.body

  //const request = await Request.findById(req.params.id)
  let request = await findRequestAvailableById(req.params.id)

  if(String(request.user._id) != String(req.user._id)){
    throw new Error('You do not have permission to update this task')
  }
    request.name = name
    request.price = price
    request.timeLimit = timeLimit
    request.isCompleted = isCompleted
    request.image = image
    request.description = description
    request.category = category

    const updatedRequest = await request.save()
    res.json(updatedRequest)
})

const deleteRequest = asyncHandler(async(req, res) => {
  // const request = await Request.findById(req.params.id)

  const request = await findRequestAvailableById(req.params.id)

  if(String(request.user._id) != String(req.user._id)){
    res.status(404)
    throw new Error('You do not have permission to delete this task')
  }

  await request.remove()
  res.json({message: 'Task removed'})
})

const startTask = asyncHandler(async(req, res) => {

  let request = await findRequestAvailableById(req.params.id)
    request.progressUser = req.user._id
    await request.save()
    res.json(request)
})

const submitTask = asyncHandler(async(req, res) => {
  let request = await findRequestAvailableById(req.params.id)

  if(String(req.user._id) != String(request.progressUser._id)){
    throw new Error('You cannot submit for this person')
  }
  request.progressCompleted = true
  await request.save()
  res.json(request)
})

const completeTask = asyncHandler(async(req, res) => {
  let request = await findRequestAvailableById(req.params.id)
  request.isCompleted = true
  await request.save()
  res.json(request)
})

module.exports.getAllRequests = getAllRequests
module.exports.getRequestById = getRequestById
module.exports.getAllUserRequests = getAllUserRequests
module.exports.createRequest = createRequest
module.exports.updateRequest = updateRequest
module.exports.deleteRequest = deleteRequest
module.exports.startTask = startTask
module.exports.submitTask = submitTask
module.exports.completeTask = completeTask