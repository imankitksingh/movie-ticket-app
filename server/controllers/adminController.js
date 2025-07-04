import Booking from "../models/Booking.js"
import Show from "../models/Show.js";
import User from "../models/User.js";

// API to check if user is Admin
export const isAdmin = async (req, res) => {
    res.json({ success: true, isAdmin: true })
}


// API to get dahsboard data
export const getDashboardData = async (req, res) => {
    try {
        const bookings = await Booking.find({ ispaid: true });
        const activeShows = await Show.find({ showDateTime: { $gte: new Date() } }).populate("movie")

        const totalUser = await User.countDocuments();

        const dahsboardData = {
            totalBookings: bookings.length,
            totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
            activeShows,
            totalUser
        }

        res.json({ success: true, dahsboardData })
    } catch (error) {
        console.error(error.message)
        res.json({ success: false, message: error.message })
    }
}

// API to get all shows
export const getAllShows = async (req, res) => {
    try {
        const shows = await Show.find({ showDateTime: { $gte: new Date() } }).populate("movie").sort({ showDateTime: 1 })
        res.json({ success: true, message: shows })

    } catch (error) {
        console.error(error.message)
        res.json({ success: false, message: error.message })
    }
}

// API to get All bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate("user").populate({
            path: "show",
            populate: { path: "movie" }
        }).sort({ createdAt: -1 })
        res.json({ success: true, bookings })
    } catch (error) {
        console.error(error.message)
        res.json({ success: false, message: error.message })
    }
}