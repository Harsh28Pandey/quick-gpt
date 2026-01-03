import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { assets } from '../assets/assets'
import Message from './Message.jsx'

const ChatBox = () => {

    const [open, setOpen] = useState(false) // for dropdown menu only
    const containerRef = useRef(null)

    const { selectedChat, theme } = useAppContext()
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [mode, setMode] = useState('')
    const [isPublished, setIsPublished] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        if (selectedChat) {
            setMessages(selectedChat.messages)
        }
    }, [selectedChat])

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth"
            })
        }
    }, [messages])

    return (
        <div className='flex-1 flex flex-col justify-between mx-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>

            {/* chat messages */}
            <div ref={containerRef} className='flex-1 overflow-y-auto overscroll-contain'>
                {messages.length === 0 && (
                    <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
                        <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} className='w-full max-w-56 sm:max-w-68' alt="" />
                        <p className='mt-5 text-2xl sm:text-4xl text-center text-gray-500 dark:text-[#e5e7eb]'>Ask me Anything...</p>
                    </div>
                )}

                {messages.map((message, index) => <Message key={index} message={message} />)}

                {/* three dots loading */}
                {
                    loading && <div className='loader flex items-center gap-1.5'>
                        <div className='w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-[#9ca3af] animate-bounce'></div>
                        <div className='w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-[#9ca3af] animate-bounce'></div>
                        <div className='w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-[#9ca3af] animate-bounce'></div>
                    </div>
                }

            </div>

            {mode === 'Image' && (
                <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
                    <p className='text-xs dark:text-[#9ca3af]'>Publish Generated Images to Community</p>
                    <input type="checkbox" className='cursor-pointer' checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
                </label>
            )}

            {/* prompt input box */}
            <form onSubmit={onsubmit} className='bg-primary/20 dark:bg-[#2a2a2a]/30 border border-primary dark:border-[#333333]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'>

                {/* CUSTOM DROPDOWN */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="flex items-center justify-between gap-2 px-4 py-2 text-sm w-28 rounded-full border bg-white text-gray-800 border-gray-300 dark:bg-[#262626] dark:text-[#e5e7eb] dark:border-[#333333]">
                        {mode || "Text"}
                        <span className="text-xs">▾</span>
                    </button>

                    {open && (
                        <div className="absolute bottom-12 left-0 w-28 rounded-xl overflow-hidden z-50 shadow-xl bg-white border border-gray-300 dark:bg-[#2a2a2a] dark:border-[#333333]">
                            <button
                                onClick={() => {
                                    setMode("Text")
                                    setOpen(false)
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 dark:text-[#e5e7eb] dark:hover:bg-[#333333]">
                                Text
                            </button>

                            <button
                                onClick={() => {
                                    setMode("Image")
                                    setOpen(false)
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 dark:text-[#e5e7eb] dark:hover:bg-[#333333]">
                                Image
                            </button>
                        </div>
                    )}
                </div>


                <input onChange={(e) => setPrompt(e.target.value)} value={prompt} type="text" placeholder='Type Your Prompt Here...' className='flex-1 w-full text-sm outline-none dark:bg-transparent dark:text-[#e5e7eb] placeholder:text-gray-400 dark:placeholder:text-[#6b7280]' required />
                <button disabled={loading}>
                    <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8 cursor-pointer' alt="" />
                </button>
            </form>

        </div>
    )
}

export default ChatBox