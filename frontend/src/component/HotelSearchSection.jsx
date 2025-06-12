import React, { useState, useRef } from 'react';
import { MapPinIcon, UsersIcon, ChevronDownIcon } from 'lucide-react';

const HotelSearchSection = () => {
  const [form, setForm] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const [showGuestOptions, setShowGuestOptions] = useState(false);
  const guestRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleGuestOptions = () => setShowGuestOptions(!showGuestOptions);

  const handleSearch = () => {
    console.log('Search Params:', form);
  };

  return (
    <div className="bg-sky-100 rounded-2xl shadow-xl px-4 md:px-6 lg:px-8 py-2 max-w-5xl mx-auto my-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Otel Arayın</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Lokasyon */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Şehir / Ülke</label>
          <div className="relative mt-1">
            <input
              type="text"
              name="location"
              placeholder="İstanbul, Türkiye"
              value={form.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <MapPinIcon className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Giriş Tarihi */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Giriş</label>
          <input
            type="date"
            name="checkIn"
            value={form.checkIn}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* Çıkış Tarihi */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Çıkış</label>
          <input
            type="date"
            name="checkOut"
            value={form.checkOut}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* Konuklar (Yetişkin, Çocuk, Oda) */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Konuklar</label>
          <button
            onClick={toggleGuestOptions}
            className="w-full border border-gray-300 rounded-md py-2 px-3 flex items-center justify-between focus:outline-none"
          >
            <span>{`${form.adults} Yetişkin, ${form.children} Çocuk, ${form.rooms} Oda`}</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          </button>

          {showGuestOptions && (
            <div
              ref={guestRef}
              className="absolute z-20 bg-white shadow-lg border rounded-md w-full mt-2 p-4 space-y-3"
            >
              {[
                { label: 'Yetişkin', name: 'adults', min: 1 },
                { label: 'Çocuk', name: 'children', min: 0 },
                { label: 'Oda', name: 'rooms', min: 1 },
              ].map(({ label, name, min }) => (
                <div key={name} className="flex items-center justify-between">
                  <span>{label}</span>
                  <input
                    type="number"
                    name={name}
                    min={min}
                    value={form[name]}
                    onChange={handleChange}
                    className="w-16 border border-gray-300 rounded-md px-2 py-1"
                  />
                </div>
              ))}
              <button
                onClick={toggleGuestOptions}
                className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition"
              >
                Onayla
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 focus:ring-2 focus:outline-none transition my-2"
        >
          Otelleri Göster
        </button>
      </div>
    </div>
  );
};

export default HotelSearchSection;
