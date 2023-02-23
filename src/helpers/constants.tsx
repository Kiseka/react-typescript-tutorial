export enum APP_STATUS {
    IDLE= "idle",
    PENDING= "pending",
    ERROR= "error",
    SUCCESS= "success",
}

export type statusTypes ="idle" | "pending" | "error" | "success";

export const baseUrl = "http://127.0.0.1:8000";


export type todoType= {
    id:Number,
    user_id:Number,
    title:String,
    description:String,
    status:String,
    created_at:String,
    updated_at:String
}