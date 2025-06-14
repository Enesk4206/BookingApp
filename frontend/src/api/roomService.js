import api from "./axiosConfig"

export const createRoom = async(room)=> {
    const response = await api.post('/room/create',room);
    return response.data;
}

export const getAllRooms = async()=> {
    const response = await api.get('/room/all-rooms');
    return response.data;
}

export const updateRoom = async(id,room) => {
    const response = await api.put(`/room/update/${id}`,room);
    return response.data;
}
export const deleteRoom = async(id) => {
    const response = await api.delete(`/room/delete/${id}`);
    return response.data;
}