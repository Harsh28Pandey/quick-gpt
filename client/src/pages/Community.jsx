import React, { useEffect, useState } from 'react'
import { dummyPublishedImages } from '../assets/assets'
import Loading from './Loading'

const Community = () => {

    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchImages = async () => {
        setImages(dummyPublishedImages)
        setLoading(false)
    }

    useEffect(() => {
        fetchImages()
    })

    if (loading)
        return <Loading />

    return (
        <div className='p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll'>
            <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-semibold text-gray-700 dark:text-purple-500 mb-5">

                {/* Text Content */}
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-2 pt-2 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-800 dark:text-white flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3">
                        Community Images 📸
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed">
                        Explore amazing images shared by our community. Get inspired, share your own creations, and see what others are generating with AI tools.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-2 text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">🌟 <span className="font-medium">Community driven</span></span>
                        <span className="flex items-center gap-1">🖼️ <span className="font-medium">High quality images</span></span>
                        <span className="flex items-center gap-1">💡 <span className="font-medium">Share & get inspired</span></span>
                    </div>
                </div>


            </h2>

            {
                images.length > 0 ? (
                    <div className='flex flex-wrap max-sm:justify-center gap-5'>
                        {images.map((item, index) => (
                            <a key={index} href={item.imageUrl} target='_blank' className='relative group block rounded-lg overflow-hidden border border-gray-200 dark:bg-purple-700 shadow-sm hover:shadow-md transition-shadow duration-300'>
                                <img src={item.imageUrl} className='w-full h-40 md:h-50 2xl:h-62 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out' alt="" />
                                <p className='absolute bottom-0 right-0 text-xs bg-black/50 backdrop-blur text-white px-4 py-1 rounded-tl-xl opacity-0 group-hover:opacity-100 transition duration-300'>Created By : {item.userName}</p>
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className='text-center text-gray-600 dark:text-purple-200 mt-10'>No Images are Available.</p>
                )
            }
        </div>
    )
}

export default Community