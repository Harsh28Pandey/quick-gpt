import axios from "axios"
import Chat from "../models/Chat.js"
import User from "../models/User.js"
import imagekit from "../configs/imageKit.js"
import openai from "../configs/openai.js"

// text message controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        // credit check
        if (req.user.credits < 1) {
            return res.status(403).json({
                success: false,
                message: "You don't have enough credits"
            });
        }

        const { chatId, prompt } = req.body;
        const chat = await Chat.findOne({ userId, _id: chatId })
        chat.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImage: false })

        const { choices } = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant."
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const reply = { ...choices[0].message, timestamp: Date.now(), isImage: false }

        res.json({
            success: true,
            reply
        })

        chat.messages.push(reply)
        await chat.save()

        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

// image message controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id

        if (req.user.credits < 2) {
            return res.status(403).json({
                success: false,
                message: "Not enough credits for image generation"
            })
        }

        const { prompt, chatId, isPublished } = req.body
        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required"
            })
        }

        const chat = await Chat.findOne({ _id: chatId, userId })
        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            })
        }

        // save user prompt
        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        })

        const encodedPrompt = encodeURIComponent(prompt)

        const generatedImageUrl =
            `${process.env.IMAGEKIT_URL_ENDPOINT}` +
            `/ik-genimg-prompt-${encodedPrompt}` +
            `/quickgpt/${Date.now()}.png?tr=w-800,h-800`

        const aiImageResponse = await axios.get(
            generatedImageUrl,
            { responseType: "arraybuffer" }
        )

        const base64Image =
            `data:image/png;base64,${Buffer.from(
                aiImageResponse.data
            ).toString("base64")}`

        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "quickgpt"
        })

        const reply = {
            role: "assistant",
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImage: true,
            isPublished
        }

        chat.messages.push(reply)
        await chat.save()

        await User.updateOne(
            { _id: userId },
            { $inc: { credits: -2 } }
        )

        return res.status(200).json({
            success: true,
            reply
        })

    } catch (error) {
        console.error("IMAGE AI ERROR:", error)
        return res.status(500).json({
            success: false,
            message: "Image generation failed"
        })
    }
}

// api to get published images
export const getPublishedImages = async (req, res) => {
    try {
        const publishedImageMessages = await Chat.aggregate([
            { $unwind: "$messages" },
            {
                $match: {
                    "messages.isImage": true,
                    "messages.isPublished": true
                }
            },
            {
                $project: {
                    _id: 0,
                    imageUrl: "$messages.content",
                    userName: "$userName"
                }
            }
        ])

        res.json({
            success: true,
            images: publishedImageMessages.reverse()
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}