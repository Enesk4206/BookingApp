import api from "./axiosConfig";

export const registerUser = async(userData) =>{
    const response = await api.post('/auth/register',userData);
    if(response.data.token){
        localStorage.setItem('token',response.data.token);
    }
    return response.data;
};

export const loginUser = async(loginData) =>{
    const response = await api.post('/auth/login',loginData);
    if(response.data.token){
        localStorage.setItem('token',response.data.token);
    }
    return response.data;
}
export const createOwner = async(ownerData) =>{
    const response = await api.post('/auth/create-owner',ownerData);
    
    return response.data;
}
export const logoutUser = ()=>{
    localStorage.removeItem('token');
}

