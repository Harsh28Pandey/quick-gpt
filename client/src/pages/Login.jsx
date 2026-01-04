import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';

const Login = () => {

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { axios, setToken } = useAppContext()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url =
            state === "login"
                ? "https://quickgpt-server-sm1p.onrender.com/api/user/login"
                : "https://quickgpt-server-sm1p.onrender.com/api/user/register";

        try {
            const payload =
                state === "login"
                    ? { email, password }
                    : { name, email, password };

            const { data } = await axios.post(url, payload);

            if (data.success) {
                setToken(data.token);
                localStorage.setItem("token", data.token);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        }
    };


    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-88 text-gray-500 rounded-xl shadow-xl border border-gray-200 bg-purple/60 backdrop-blur-xl">
            <p className="text-2xl font-medium m-auto">
                <span className="text-purple-700">QuickGPT</span> {state === "login" ? "🚀 Login" : "🤖 Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter Your Name..." className="border border-gray-200 rounded-2xl w-full p-2 mt-1 outline-purple-700" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Your Email..." className="border border-gray-200 rounded-2xl w-full p-2 mt-1 outline-purple-700" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter Your Password..." className="border border-gray-200 rounded-2xl w-full p-2 mt-1 outline-purple-700" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have an Account? <span onClick={() => setState("login")} className="text-purple-700 cursor-pointer">Click here</span>
                </p>
            ) : (
                <p>
                    Create an Account? <span onClick={() => setState("register")} className="text-purple-700 cursor-pointer">Click here</span>
                </p>
            )}
            <button type='submit' className="bg-purple-700 hover:bg-purple-900 transition-all text-white w-full py-2 rounded-3xl cursor-pointer">
                {state === "register" ? "Create Account ➕" : "Login 🔐"}
            </button>
        </form>
    )
}

export default Login