import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'

const Message = ({ message }) => {

    useEffect(() => {
        Prism.highlightAll()
    }, [message.content])

    return (
        <div>
            {message.role === "user" ? (
                <div className='flex items-start justify-end my-4 gap-2'>
                    <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#2a2a2a]/30 border border-[#333333]/30 rounded-2xl max-w-2xl'>
                        <p className='text-sm dark:text-[#e5e7eb]'>{message.content}</p>
                        <span className='text-xs text-gray-500 dark:text-[#9ca3af]'>{moment(message.timestamp).fromNow()}</span>
                    </div>

                    <img src={assets.user_icon} className='w-8 rounded-full' alt="" />

                </div>
            ) : (
                <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 dark:bg-[#262626] border border-[#333333]/30 rounded-2xl my-4'>
                    {message.isImage ? (
                        <img src={message.content} className='w-full max-w-md mt-2 rounded-2xl' alt="" />
                    ) : (
                        <div className='text-sm dark:text-[#e5e7eb] reset-tw'>
                            <Markdown>{message.content}</Markdown>
                        </div>
                    )}
                    <span className='text-xs text-gray-500 dark:text-[#e5e7eb]'>{moment(message.timestamp).fromNow()}</span>
                </div>
            )
            }
        </div>
    )
}

export default Message