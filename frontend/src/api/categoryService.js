import api from "./axiosConfig"



export const createCategory = async (category)=>{
    const response = await api.post('/category/create', category);
    return response.data;
}
export const getAllCategories = async() => {
    const response = await api.get('/category/all-categories');
    console.log(response.data);
    return response.data;
}

export const updateCategory = async(id,category) => {
    const response = await api.put(`/category/update/${id}`,category);
    return response.data;
}
export const deleteCategory = async(id) => {
    const response = await api.delete(`/category/delete/${id}`);
    return response.data;
}