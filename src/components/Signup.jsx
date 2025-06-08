import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { SignupUser } from "../features/Auth/AuthSlice";
import { SWIGGY_LOGO } from "../utilis/Constant";

function SignUp(){
    const dispatch=useDispatch();
    const {user,loading,error}=useSelector(state=>state.auth);
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[formError,setformError]=useState("");

    const handleSubmit=(e)=>{
       e.preventDefault();
       if(!email||!password){
        setformError("please fill out all the fields")
        return
       }
       if(password.length<6){
        setformError("please enter password atleast 6 digit")
        return
       }
       setformError("");
       dispatch(SignupUser({email,password}))
    };
    return(
        <div className="max-w-md mx-auto p-6 bg-yellow-300 shadow-md rounded-lg">
        <div className="flex-justify-center mb-4">
            {/* {swiggy logo} */}
            <img  className="w-24 h-auto "src={SWIGGY_LOGO} alt="swiggy_logo" />
        </div>
        <h2 className="font-2xl font-semibold mb-4 text-center">SignUp for swiggy</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" 
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className=" w-full p-2 mb-4 border border-grey-300 rounded"
            />
            <input type="password" 
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
             className=" w-full p-2 mb-4 border border-grey-300 rounded"
            />

            {/* {form validation error} */}
            {formError&&(<div className="text-red-500 text-sm mb-2">{formError}</div>)}

            {/* {backend error handling} */}
            {error&&(<div className="text-red-500 text-sm mb-2">{error}</div>)}

            <button type="submit" disabled={loading} className="w-full p-2 bg-orange-500 text-white">{loading ?"signing up....":"signup"}</button>

        </form>
        </div>
    )

}

export default SignUp