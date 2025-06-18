import { useState, useEffect } from "react";
import { createOwner } from "../../api/authService";
import { getAllHotels } from "../../api/hotelService";
import AdminLayout from "../Admin/AdminLayout";

const AdminAddOwner = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "", hotelId: "" });
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Otelleri çek
    const getHotels = async () => {
      try {
        const response = await getAllHotels();
        setHotels(response);
      } catch (error) {
        alert("Oteller yüklenirken hata oluştu");
      }
    };

    getHotels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.hotelId) {
      alert("Lütfen bir otel seçin");
      return;
    }

    try {
      const payload = { ...form, role: "OWNER" };
      const response = await createOwner(payload);
      alert("Owner başarıyla oluşturuldu: " + response.username);
      setForm({ username: "", email: "", password: "", hotelId: "" });
    } catch (err) {
      alert("Hata: " + err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Yeni Owner Ekle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="owner123"
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              E-posta
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="example@domain.com"
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Şifre</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="******"
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Otel seçimi */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Otel Seçiniz</label>
            <select
              value={form.hotelId}
              onChange={(e) => setForm({ ...form, hotelId: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Otel Seçin --</option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
          >
            Owner Oluştur
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminAddOwner;
