import api from "./axiosConfig"

export const createHotel = async(hotel) => {
    const response = await api.post('/hotel/create',hotel);
    return response.data;
}
export const getAllHotels = async() => {
    const response = await api.get('/hotel/all-hotels');
    return response.data;
}
export const updateHotel = async(id,hotel) => {
    const response = await api.put(`/hotel/update/${id}`,hotel);
    return response.data;
}
export const deleteHotel = async(id) => {
    const response = await api.delete(`/hotel/delete/${id}`);
    return response.data;
}