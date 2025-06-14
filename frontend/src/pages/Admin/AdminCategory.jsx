import React, { useEffect, useState } from "react";
import AdminLayout from "../Admin/AdminLayout";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../api/categoryService";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      setCategories(data || []);
    } catch (err) {
      console.error("Kategoriler yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createCategory({ name });
      setName("");
      loadCategories();
    } catch (err) {
      console.error("Kategori ekleme hatası:", err);
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await updateCategory(editing.id, { name });
      setEditing(null);
      setName("");
      loadCategories();
    } catch (err) {
      console.error("Kategori güncelleme hatası:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu kategoriyi silmek istiyor musunuz?")) return;
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Kategori Yönetimi</h2>

        {/* Ekleme Formu */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Yeni kategori adı"
            className="border border-gray-300 rounded px-4 py-2 flex-1"
            disabled={!!editing}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            disabled={!!editing}
          >
            Ekle
          </button>
        </form>

        {/* Kategori Tablosu */}
        <div className="bg-white rounded shadow overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left w-1/6">#</th>
                <th className="px-4 py-2 text-left">Kategori Adı</th>
                <th className="px-4 py-2 text-right w-1/4">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    Yükleniyor...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    Hiç kategori bulunamadı.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50 border-b">
                    <td className="px-4 py-2">{cat.id}</td>
                    <td className="px-4 py-2">{cat.name}</td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditing(cat);
                          setName(cat.name);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
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
        </div>

        {/* Güncelleme Formu */}
        {editing && (
          <form onSubmit={handleEditSave} className="bg-gray-50 p-4 rounded shadow space-y-4">
            <h3 className="text-lg font-semibold">Kategori Güncelle</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Kaydet
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setName("");
                }}
                className="text-gray-500 underline"
              >
                Vazgeç
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCategory;
  