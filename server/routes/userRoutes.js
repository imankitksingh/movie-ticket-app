import express from "express"
import { addUpdateFavorite, getFavorites, getUserBookings } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/bookings", getUserBookings)
userRouter.post("/update-favorite", addUpdateFavorite)
userRouter.get("/favorites", getFavorites)

export default userRouter;