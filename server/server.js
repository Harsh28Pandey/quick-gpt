import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import userRouter from './routes/UserRoutes.js'
import chatRouter from './routes/chatRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import creditRouter from './routes/creditRoutes.js'
import { stripeWebhooks } from './controllers/webhooks.js'

const app = express()

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


if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3000

    server.listen(PORT, () => {
        console.log(`Server is Running on port: ${PORT}`)
    })
}

// export server for vercel
export default server