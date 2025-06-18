import React, { useEffect, useState } from "react";
import AdminLayout from "../Admin/AdminLayout";
import { createHotel } from "../../api/hotelService";
import { getAllCategories } from "../../api/categoryService";
import { getAllRooms } from "../../api/roomService";
import { toast } from "react-hot-toast";

const AdminHotelCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [rate, setRate] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [roomIds, setRoomIds] = useState([]);

  const [categories, setCategories] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await getAllCategories();
        const rms = await getAllRooms();
        setCategories(cats);
        setRooms(rms);
      } catch (error) {
        toast.error("Veriler yüklenemedi.");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hotelData = {
        name,
        description,
        imagePath,
        rate,
        categoryId,
        roomIds,
      };
      await createHotel(hotelData);
      toast.success("Otel başarıyla eklendi!");
      // Temizle
      setName("");
      setDescription("");
      setImagePath("");
      setRate(0);
      setCategoryId("");
      setRoomIds([]);
    } catch (error) {
      toast.error("Otel eklenirken hata oluştu.");
    }
  };

  const handleRoomSelect = (roomId) => {
    setRoomIds((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId]
    );
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Yeni Otel Ekle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Otel Adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <textarea
            placeholder="Açıklama"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Görsel URL (imagePath)"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Puan (Rate)"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full border px-4 py-2 rounded"
          />

          {/* Kategori seçimi */}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          >
            <option value="">Kategori Seç</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Oda seçimi */}
          <div>
            <p className="font-medium mb-2">Odalar:</p>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {rooms.map((room) => (
                <label key={room.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={room.id}
                    checked={roomIds.includes(room.id)}
                    onChange={() => handleRoomSelect(room.id)}
                  />
                  Oda #{room.roomNumber} - {room.adult} Yetişkin, {room.kid} Çocuk
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Otel Ekle
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminHotelCreate;
