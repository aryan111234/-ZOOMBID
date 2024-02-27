import { axiosInstance } from "./axiosInstance";

// register user
export const RegisterUser = async (payload) => {
    try{
        const response = await axiosInstance.post("/apiUsers/register",payload);
        return response.data;
    }catch(error){
        return error.message
    }
}

// login user
export const LoginUser = async (payload) => {
    try{
        const response = await axiosInstance.post("/apiUsers/login",payload);
        return response.data;
    }catch(error){
        return error.message
    }
}

