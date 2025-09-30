import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utilis/firebase";

//signup
export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async({email,password},{rejectWithValue})=>{
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
            return userCredentials.user
            
        } catch (error) {
            return rejectWithValue(error.message)
            
        }
    }
)

//login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async({email,password},{rejectWithValue})=>{
        try {
            const userCredentials = await signInWithEmailAndPassword(auth,email,password)
            return userCredentials.user
            
        } catch (error) {
            return rejectWithValue(error.message)
            
        }
    }
)

//AuthSlice
const AuthSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null,
    },
    reducers:{
        logout:(state)=>{
            state.user = null
        },

    },
    extraReducers:(builder)=>{
        builder
        //signup
        .addCase(signupUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(signupUser.fulfilled,(state,action)=>{
            state.loading = false 
            state.user = action.payload
         
        })
        .addCase(signupUser.rejected,(state,action)=>{
            state.loading = false 
            state.error = action.payload

        })
        //login
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false 
            state.user = action.payload
         
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false 
            state.error = action.payload

        })
    }
})

export const {logout} = AuthSlice.actions
export default AuthSlice.reducer