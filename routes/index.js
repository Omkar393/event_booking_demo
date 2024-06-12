import express from 'express'
import { addUser, bookTickets, createEvent, getEventDetails, login } from '../services/index.js'
import { verify } from '../middleware/index.js'

const route = express.Router()

route.post('/user-registration', addUser)
route.post('/create-event', createEvent)
route.get('/get-event-details', getEventDetails)
route.post('/book-tickets', verify, bookTickets)
route.post('/login', login)

export default route