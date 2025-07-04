import 'dotenv/config'

import express, { application, json } from "express"
import cors from "cors"
import connectDB from "./configs/db.js";
import { clerkMiddleware, requireAuth } from '@clerk/express';
import { serve } from "inngest/express"
import { functions, inngest } from "./injest/indes.js";
import showRouter from "./routes/showRoute.js";
import bookingRouter from './routes/bookingRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';
import { stripeWebhooks } from './controllers/stripeWebhook.js';


const app = express();
const port = 3000;

await connectDB()

//stripe webhooks Route
app.use('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// Middleware 
app.use(express.json()) //all the request will be passed in json method
app.use(cors())
app.use(clerkMiddleware()); // attaches req.auth

// API routes
app.get("/", (req, res) => res.send("Server is Live"))
app.use('/api/inngest', serve({ client: inngest, functions }))
app.use("/api/show", showRouter)
app.use("/api/booking/", bookingRouter)
app.use("/api/admin/", adminRouter)
app.use("/api/user/", userRouter)


app.listen(port, () => console.log(`server listening at http://localhost:${port}`));