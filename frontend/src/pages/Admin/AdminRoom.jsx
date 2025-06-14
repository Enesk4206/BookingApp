import React, { useState, useEffect } from "react";
import AdminLayout from "../Admin/AdminLayout";
import {
  getAllRooms,
  createRoom,
  deleteRoom,
  updateRoom,
} from "../../api/roomService"; // Backend API fonksiyonlarını yazmalısın

const AdminRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    roomNumber: "",
    adult: "",
    kid: "",
    price: "",
    discount: "",
  });
  const [editing, setEditing] = useState(null);

  // Odaları yükle
  const loadRooms = async () => {
    try {
      const data = await getAllRooms();
      setRooms(data || []);
    } catch (err) {
      console.error("Odalar yüklenemedi:", err);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  // Form input değişimi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Oda ekle / güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateRoom(editing.id, {
          ...form,
          roomNumber: Number(form.roomNumber),
          adult: Number(form.adult),
          kid: Number(form.kid),
          price: Number(form.price),
          discount: Number(form.discount),
        });
        setEditing(null);
      } else {
        await createRoom({
          roomNumber: Number(form.roomNumber),
          adult: Number(form.adult),
          kid: Number(form.kid),
          price: Number(form.price),
          discount: Number(form.discount),
        });
      }
      setForm({
        roomNumber: "",
        adult: "",
        kid: "",
        price: "",
        discount: "",
      });
      loadRooms();
    } catch (err) {
      console.error("Oda kaydetme hatası:", err);
    }
  };

  // Düzenlemeyi başlat
  const handleEdit = (room) => {
    setEditing(room);
    setForm({
      roomNumber: room.roomNumber,
      adult: room.adult,
      kid: room.kid,
      price: room.price,
      discount: room.discount,
    });
  };

  // Sil
  const handleDelete = async (id) => {
    if (!window.confirm("Bu odayı silmek istiyor musunuz?")) return;
    try {
      await deleteRoom(id);
      loadRooms();
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-6">Oda Yönetimi</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
        <input
          type="number"
          name="roomNumber"
          placeholder="Oda Numarası"
          value={form.roomNumber}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="adult"
          placeholder="Yetişkin Sayısı"
          value={form.adult}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="kid"
          placeholder="Çocuk Sayısı"
          value={form.kid}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Fiyat"
          value={form.price}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          step="0.01"
          name="discount"
          placeholder="İndirim"
          value={form.discount}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {editing ? "Güncelle" : "Ekle"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm({
                roomNumber: "",
                adult: "",
                kid: "",
                price: "",
                discount: "",
              });
            }}
            className="ml-2 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
          >
            Vazgeç
          </button>
        )}
      </form>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Oda No</th>
            <th className="p-2 border">Yetişkin</th>
            <th className="p-2 border">Çocuk</th>
            <th className="p-2 border">Fiyat</th>
            <th className="p-2 border">İndirim</th>
            <th className="p-2 border">Düzenle</th>
            <th className="p-2 border">Sil</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-4 text-center text-gray-500">
                Kayıtlı oda yok
              </td>
            </tr>
          ) : (
            rooms.map((room) => (
              <tr key={room.id} className="border-t hover:bg-gray-50">
                <td className="p-2 border">{room.id}</td>
                <td className="p-2 border">{room.roomNumber}</td>
                <td className="p-2 border">{room.adult}</td>
                <td className="p-2 border">{room.kid}</td>
                <td className="p-2 border">{room.price.toFixed(2)}</td>
                <td className="p-2 border">{room.discount.toFixed(2)}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleEdit(room)}
                    className="text-blue-600 hover:underline"
                  >
                    Düzenle
                  </button>
               
                </td>
                <td className="border text-center">
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="text-red-600 hover:underline"
                    >
                      Sil
                    </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default AdminRoom;
