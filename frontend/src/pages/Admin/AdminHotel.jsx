import React, { useEffect, useState } from 'react';
import AdminLayout from '../Admin/AdminLayout';
import { getAllHotels, deleteHotel } from '../../api/hotelService';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminHotel = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const loadHotels = async () => {
    try {
      const data = await getAllHotels();
      setHotels(data || []);
    } catch (error) {
      toast.error('Oteller yüklenemedi');
      console.error(error);
    }
  };

  useEffect(() => {
    loadHotels();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Bu oteli silmek istediğinize emin misiniz?')) return;
    try {
      await deleteHotel(id);
      toast.success('Otel silindi');
      loadHotels();
    } catch (error) {
      toast.error('Silme işlemi başarısız');
      console.error(error);
    }
  };

  const handleDetail = (id) => {
    navigate(`/admin/hotels/${id}`); // varsayım: detay sayfası bu route ile
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Oteller</h2>

        {hotels.length === 0 ? (
          <p className="text-gray-500">Hiç otel bulunamadı.</p>
        ) : (
          <table className="w-full table-auto bg-white shadow rounded overflow-hidden text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Ad</th>
                <th className="px-4 py-2">Puan</th>
                <th className="px-4 py-2">Kategori</th>
                <th className="px-4 py-2 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{hotel.id}</td>
                  <td className="px-4 py-2">{hotel.hotelName}</td>
                  <td className="px-4 py-2">{hotel.rate}</td>
                  <td className="px-4 py-2">{hotel.category?.name || '-'}</td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button
                      onClick={() => handleDetail(hotel.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Detay
                    </button>
                    <button
                      onClick={() => handleDelete(hotel.id)}
                      className="text-red-600 hover:underline"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminHotel;
