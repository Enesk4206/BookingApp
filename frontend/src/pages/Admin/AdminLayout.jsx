import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [hotelMenuOpen, setHotelMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", to: "/admin/dashboard" },
    { label: "Category", to: "/admin/category" },
    { label: "Room", to: "/admin/room" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex h-screen">
      {/* yan bar kısmı */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col border-t rounded-2xl">
        <div className="p-6 text-2xl font-bold border-b bg-gray-600 rounded-2xl shadow-md">
          Admin Paneli
        </div>
        <nav className="flex-1 p-4 space-y-2">

          {/* Standart menüler */}
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-3 py-2 rounded-md transition-all 
                ${location.pathname.startsWith(item.to)
                  ? "bg-gray-700 text-white font-semibold"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Hotels drop-down */}
          <div>
            <button
              onClick={() => setHotelMenuOpen(!hotelMenuOpen)}
              className={`w-full text-left px-3 py-2 rounded-md transition-all 
                ${location.pathname.startsWith("/admin/hotel")
                  ? "bg-gray-700 text-white font-semibold"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              Hotels {hotelMenuOpen ? "▲" : "▼"}
            </button>

            {hotelMenuOpen && (
              <div className="pl-4 mt-1 space-y-1">
                <Link
                  to="/admin/hotel/list"
                  className="block px-3 py-1 text-sm rounded hover:bg-gray-700"
                >
                  Listele
                </Link>
                <Link
                  to="/admin/hotel/create"
                  className="block px-3 py-1 text-sm rounded hover:bg-gray-700"
                >
                  Ekle
                </Link>
                <Link
                  to="/admin/hotel/update"
                  className="block px-3 py-1 text-sm rounded hover:bg-gray-700"
                >
                  Güncelle/Kaldır
                </Link>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* İçerik kısmı */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6 rounded-md">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
