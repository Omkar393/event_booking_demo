import { generateToken } from "../middleware/index.js"
import { eventBookingModel, eventModel, userModel } from "../schemas/index.js"

// User Registration
export const addUser = async (req, res) => {
    const { user_name, user_email } = req.body
    try {
        const checkUser = await userModel.findOne({ user_email })

        if (checkUser)
            return res.status(203).json({ message: "Email is already in use" })

        const userDetails = await new userModel({
            user_name,
            user_email
        })
        userDetails.save()

        return res.status(200).json({ message: "User registration successfully" })

    } catch (error) {
        console.log(error);
    }
}

// Create events
export const createEvent = async (req, res) => {
    const { event_name, event_date, _event_time, event_venue, tickets_number } = req.body

    try {
        const saveEventDetails = await new eventModel({
            event_name,
            event_date,
            _event_time,
            event_venue,
            tickets_number
        })
        saveEventDetails.save()

        return res.status(200).json({ message: `Your ${event_name} Booked Successfully on ${event_date}` })

    } catch (error) {
        console.log(error);
    }
}

// Get event detais
export const getEventDetails = async (req, res) => {
    try {
        const eventDetails = await eventModel.find({})
        return res.status(200).json({ eventDetails })
    } catch (error) {
        console.log(error);
    }
}

// book event tickets
export const bookTickets = async (req, res) => {
    const { event_id, number_of_tickets } = req.body
    const { id } = req.user
    try {
        const foundEvent = await eventModel.findById({ _id: event_id })

        if (foundEvent.tickets_number > 0) {
            const bookingDetails = await new eventBookingModel({
                user_id: id,
                event_id,
                number_of_tickets
            })
            bookingDetails.save()

            const availableTickets = foundEvent.tickets_number - number_of_tickets

            const updateTickets = await eventModel.findByIdAndUpdate(
                { _id: event_id },
                { tickets_number: availableTickets }
            )
            updateTickets.save()

            return res.status(200).json({ message: `Successfully booked ${number_of_tickets} tickets for event ${foundEvent.event_name}` })

        } else {
            return res.status(203).json({ message: `Tickets are not available for event ${foundEvent.event_name}` })
        }

    } catch (error) {
        console.log(error);
    }
}

// simple login to set token in cookies
export const login = async (req, res) => {
    const { email } = req.body

    const checkUser = await userModel.findOne({ user_email: email })
    if (!checkUser)
        return res.status(203).json({ message: "User not found" })

    const token = generateToken(checkUser)
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 100, httpOnly: true })
    return res.status(200).json({ message: "User login successfully" })
}