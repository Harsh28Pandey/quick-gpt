import express from "express";
import 'dotenv/config';
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/UserRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import creditRouter from "./routes/creditRoutes.js";
import { stripeWebhooks } from "./controllers/webhooks.js";

const app = express();

app.use(cors());
app.use(express.json());

// Stripe Webhooks
app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// Test DB connection
app.get("/api/test", async (req, res) => {
    try {
        await connectDB();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use('/api/credit', creditRouter);

// Root
app.get('/', (req, res) => res.send("Server is Live..."));

// ✅ Local dev only
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => console.log(`Server running on http://localhost: ${PORT}`));
}

export default app;
