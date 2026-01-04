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

// await connectDB()

// Stripe Webhooks
app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

// middleware
app.use(cors())
app.use(express.json())

// database
app.get("/api/test", async (req, res) => {
    await connectDB();
    res.json({ success: true });
});

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

// app.listen(PORT, () => {
//     console.log(`Server is Running on port: ${PORT}`)
// })

app.get("/", (req, res) => {
    res.send("Server running on Vercel");
});

export default app;