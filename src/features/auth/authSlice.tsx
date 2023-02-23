import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { APP_STATUS, baseUrl } from "../../helpers/constants"
import axios from "axios"
import Cookies from 'js-cookie'
import { RootState } from "../../app/store"

type Usertype={
    id: Number,
    email:String,
    first_name:String,
    last_name:String
}
type AuthInitialStateType ={
    user?:Usertype,
    accessToken:String,
    refreshtoken: String,
    isSigningUp:String,
    isLogingOut:String,
    profileLoadingStatus:String,
    authenticated:boolean | undefined
}

type loginBodyType ={
    email:String,
    password:String
}

const authInitialState:AuthInitialStateType ={
    user:undefined,
    accessToken: Cookies.get('access_token') || '',
    refreshtoken: Cookies.get('refresh_token') || '',
    isSigningUp:"idle",
    isLogingOut:"idle",
    profileLoadingStatus:"idle",
    authenticated:undefined
}


export const loginUser = createAsyncThunk("auth/loginUser", async(data:loginBodyType,{rejectWithValue})=>{
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

export const getUserProfile = createAsyncThunk("auth/getUserProfile", async(_,{getState})=>{
    const auth_token = selectAccessToken(getState() as RootState);
    const response = await axios.get(baseUrl+"/api/users/profile/",{
        headers: {
            Authorization: 'Bearer '+auth_token,
        }
    })
    return response.data.data
})

const authSlice = createSlice({
   name:"auth",
   initialState:authInitialState,
   reducers:{
    deleteAuthTokens(state,actions){

    }
   },
   extraReducers:(builder)=>{
    builder.addCase(loginUser.pending,(state,action)=>{
        state.isSigningUp =APP_STATUS.PENDING
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
        state.authenticated =true
        state.isSigningUp =APP_STATUS.SUCCESS
        state.user= action.payload['user'];
        state.accessToken= action.payload['access'];
        state.refreshtoken= action.payload['refresh'];
        // Set the access and refresh tokens as cookies
        Cookies.set('access_token', action.payload['access']);
        Cookies.set('refresh_token', action.payload['refresh']);
    })
    .addCase(loginUser.rejected,(state,action)=>{
        state.isSigningUp = APP_STATUS.ERROR
    })
    .addCase(getUserProfile.pending,(state,action)=>{
        state.profileLoadingStatus = APP_STATUS.PENDING
    })
    .addCase(getUserProfile.rejected,(state,action)=>{
        state.profileLoadingStatus = APP_STATUS.ERROR
        state.authenticated =false
    })
    .addCase(getUserProfile.fulfilled,(state,action)=>{
        state.authenticated =true
        state.profileLoadingStatus = APP_STATUS.SUCCESS
        state.user= action.payload;
    })
   }
});

export const {
    deleteAuthTokens
}= authSlice.actions
export default authSlice.reducer

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const selectAuthentication = (state:RootState)=> state.auth.authenticated

export const selectprofileLoadingStatus = (state:RootState)=> state.auth.profileLoadingStatus