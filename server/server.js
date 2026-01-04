import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import http from "http"
import connectDB from './configs/db.js'
import userRouter from './routes/UserRoutes.js'
import chatRouter from './routes/chatRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import creditRouter from './routes/creditRoutes.js'
import { stripeWebhooks } from './controllers/webhooks.js'

// console.log("NODE_ENV:", process.env.NODE_ENV);
// console.log("PORT:", process.env.PORT);


const app = express()
const server = http.createServer(app)

await connectDB()

// Stripe Webhooks
app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

// middleware
app.use(cors())
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send("Server is Live...")
})

// api's
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)
app.use('/api/credit', creditRouter)

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3000
    server.listen(PORT, () => console.log("Server is running on Port: " + PORT))
}

// export server for vercel to deploy our QuickChat
export default server