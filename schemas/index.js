import mongoose from "mongoose";

const Schema = mongoose.Schema

const eventSchema = new Schema({
    event_name: { type: String, required: true },
    event_date: { type: Date, required: true },
    event_time: { type: Date, required: true },
    event_venue: { type: String, required: true },
    tickets_number: { type: Number, require: true }
})

export const eventModel = mongoose.model("eventlist", eventSchema, "eventlist")

const userSchema = new Schema({
    user_name: { type: String, required: true },
    user_email: { type: String, required: true }
})

export const userModel = mongoose.model("users", userSchema, "users")

const eventBookingSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'eventlist' },
    number_of_tickets: { type: Number, required: true }
})

export const eventBookingModel = mongoose.model("bookingDetails", eventBookingSchema, "bookingDetails")

