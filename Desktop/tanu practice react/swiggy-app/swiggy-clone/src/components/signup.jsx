import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { signupUser } from "../features/auth/authslice";
import { useNavigate } from "react-router-dom";

function Signup(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const{user,loading,error} = useSelector(state=>state.auth)
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[formError,setFormError] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!email||!password){
            setFormError("please fill out all the fields ")
            return

        }
        if(password.length<6){
            setFormError("password atleast must be 6 digits")
            return
        }
        setFormError("")
        dispatch(signupUser({email,password}))
    }
    useEffect(()=>{
        if(user){
            navigate("/Login")
        }

    },[user,navigate])

    return(
        <div className="min-h-screen flex items-center justify-center bg-orange-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img src="/swiggy-logo.png" alt="Swiggy Logo" className="h-12"/>
                </div>
                <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">Signup for Swiggy</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4"> 
                    <input 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <input 
                        type="password" 
                        placeholder="Enter password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    {formError && (<div className="text-red-500 text-sm">{formError}</div>)}
                    {error && (<div className="text-red-500 text-sm">{error}</div>)}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition-colors disabled:opacity-50"
                    >
                        {loading ? "Signing Up..." : "Signup"}
                    </button>
                </form>
                {user && (
                    <p className="text-green-600 text-center mt-4">Welcome, {user.email}</p>
                )}
            </div>
        </div>
    )
}

export default Signup
