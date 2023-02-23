import { EntityState, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { APP_STATUS, baseUrl, statusTypes, todoType } from "../../helpers/constants";
import { selectAccessToken } from "../auth/authSlice";
import { RootState } from "../../app/store";
import axios from "axios";

interface todoState extends EntityState<todoType>{
    status:{
        fetch:statusTypes,
        save: statusTypes,
        update: statusTypes,
        delete: statusTypes,
    },
}

const todoAdapter = createEntityAdapter<todoType>();
const todoInitialState:todoState = todoAdapter.getInitialState({
    status:{
        fetch:"idle",
        save: "idle",
        update: "idle",
        delete: "idle",
    },
})

// Thunk functions
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_,{getState}) => {
    const auth_token = selectAccessToken(getState() as RootState);
    const response = await axios.get(baseUrl+"/api/todos/",{
        headers: {
            Authorization: 'Bearer '+auth_token,
        }
    })
    return response.data.data
})

const todosSlice = createSlice({
    name:"todos",
    initialState:todoInitialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchTodos.pending,(state,action)=>{
            state.status.fetch = APP_STATUS.PENDING
        })
        .addCase(fetchTodos.fulfilled,(state,action)=>{
            state.status.fetch = APP_STATUS.SUCCESS
            todoAdapter.setAll(state,action.payload)
        })
    }
});
export default todosSlice.reducer
export const {
    selectAll: selectTodos,
    selectById: selectTodoById,
  } = todoAdapter.getSelectors((state:RootState) => state.todos)