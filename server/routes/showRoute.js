import express from "express"
import { addShow, getShows, getShow, getNowPlayingMovies } from "../controllers/showController.js";
import { protectAdmin } from "../middleware/Auth.js";

const showRouter = express.Router();

showRouter.get("/now-playing", protectAdmin, getNowPlayingMovies)
showRouter.post("/add", protectAdmin, addShow)
showRouter.get("/all", getShows)
showRouter.get("/:movieId", getShow)



export default showRouter;