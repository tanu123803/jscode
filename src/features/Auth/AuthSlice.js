import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import{createUserWithEmailAndPassword ,
     signInWithEmailAndPassword} 
     from "firebase/auth";
import { auth } from "../../utilis/firebase";
//for signuppage

export const SignupUser=createAsyncThunk(
    "auth/SignupUser",

    async({email,password},{rejectWithvalue})=>{
    try {
        const userCredentials= await createUserWithEmailAndPassword(
             auth,
             email,
             password)
             return userCredentials.user
             
        
    } catch (error) {
        return rejectWithvalue(error.message)
        
    }
}
)

//for login 

export const LoginUser=createAsyncThunk(
    "auth/loginUser",

    async({email,password},{rejectWithvalue})=>{
    try {
        const userCredentials= await signInWithEmailAndPassword(
             auth,
             email,
             password)
             return userCredentials.user
             
        
    } catch (error) {
        return rejectWithvalue(error.message)
        
    }
}
)

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null,
    },
    reducers:{
        logout:(state)=>{
            state.user=null;
        }

    },
    extraReducers:(builder)=>{
        builder
        //signup
        .addCase(SignupUser.pending,(state)=>{
            state.loading=true;
        })
        .addCase(SignupUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        })
        .addCase(SignupUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        //login
        .addCase(LoginUser.pending,(state)=>{
            state.loading=true;
        })
        .addCase(LoginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        })
        .addCase(LoginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })


    },

});

export const {logout}=authSlice.actions;
export default authSlice.reducer;
