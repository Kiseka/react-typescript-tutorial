import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { APP_STATUS, baseUrl } from "../../helpers/constants"
import axios from "axios"

type Usertype={
    id: Number,
    email:String,
    first_name:String,
    last_name:String
}
type AuthInitialStateType ={
    user?:Usertype,
    accessToken:String,
    refreshtoken: String
    login_status:String
    logout_status:String
}



const authInitialState:AuthInitialStateType ={
    user:undefined,
    accessToken:"",
    refreshtoken:"",
    login_status:"idle",
    logout_status:"idle",
}

type responseType ={
    user:Usertype,
    accessToken:String,
    refreshtoken:String,
}

export const loginUser = createAsyncThunk("auth/loginUser", async(data,{rejectWithValue})=>{
    try {
        const response = await axios({
            method: 'post',
            url: baseUrl+"/api/login/",
            data:data
        })
        return response.data.data
    } catch (error) {
        return rejectWithValue("Login Failed");
    }
});

const authSlice = createSlice({
   name:"auth",
   initialState:authInitialState,
   reducers:{
    deleteTokens(state,actions){

    }
   },
   extraReducers:(builder)=>{
    builder.addCase(loginUser.pending,(state,action)=>{
        state.login_status =APP_STATUS.PENDING
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
        state.login_status =APP_STATUS.SUCCESS
        state.user= action.payload['user'];
        state.accessToken= action.payload['access'];
        state.refreshtoken= action.payload['refresh'];
    })
   }
});
