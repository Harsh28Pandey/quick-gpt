import React, { useEffect, useState } from 'react'
import { dummyPlans } from '../assets/assets'
import Loading from './Loading'

const Credits = () => {

    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchPlans = async () => {
        setPlans(dummyPlans)
        setLoading(false)
    }

    useEffect(() => {
        fetchPlans()
    }, [])

    if (loading)
        return <Loading />

    return (
        <div className='max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className="text-center mb-8">
                <h2 className='text-3xl sm:text-4xl font-semibold mb-3 text-gray-800 dark:text-white flex justify-center items-center gap-2'>
                    Credit Plans 🏦
                </h2>

                <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6'>
                    Buy credits and use them anytime for AI tools, image generation, and premium features. Flexible, no subscription required, and credits never expire.
                </p>

                {/* trust points */}
                <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span>✔ No subscription</span>
                    <span>✔ Pay only for what you use</span>
                    <span>✔ Credits never expire</span>
                    <span>✔ Instant access after purchase</span>
                </div>
            </div>


            {/* Plans */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center'>
                {plans.map((plan) => (
                    <div
                        key={plan._id}
                        className={`
                          group relative w-full max-w-sm
                          border border-gray-200 dark:border-purple-700
                          rounded-2xl p-6
                          shadow-md hover:shadow-xl
                          transition-all duration-300
                          hover:-translate-y-1
                          flex flex-col overflow-hidden
                          ${plan._id === "pro"
                                ? "bg-purple-50 dark:bg-purple-900 ring-2 ring-purple-400"
                                : "bg-white dark:bg-transparent"
                            }
                        `}
                    >

                        {/* hover overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 pointer-events-none"></div>

                        {/* Badge */}
                        {plan._id === "pro" && (
                            <div className="absolute top-0 left-0 right-0">
                                <div className="mx-auto w-fit text-xs font-semibold bg-purple-600 text-white px-4 py-1 rounded-b-xl shadow">
                                    ⭐ Most Popular
                                </div>
                            </div>
                        )}


                        <div className='flex-1 relative'>
                            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                                {plan.name}
                            </h3>

                            <p className='text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1'>
                                ${plan.price}
                            </p>

                            <p className='text-sm text-gray-600 dark:text-purple-200 mb-4'>
                                {plan.credits} credits included
                            </p>

                            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                                What you get
                            </p>

                            <ul className='text-sm text-gray-700 dark:text-purple-200 space-y-2'>
                                {plan.features.map((feature, index) => (
                                    <li key={index} className='text-gray-700 dark:text-gray-300'>
                                        <span className='text-green-500 text-lg'>✔️</span> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button className='mt-6 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 active:scale-95 text-white font-medium py-2.5 rounded-full transition-all duration-200 cursor-pointer'>
                            Buy Now 🛒
                        </button>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Credits