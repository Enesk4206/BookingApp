import React from 'react';
import { StarIcon, MapPinIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const rooms = [
  {
    id: 1,
    title: "Deluxe King Oda",
    location: "İstanbul, Türkiye",
    image: "src/assets/images/hotelHero.jpg",
    rating: 4.8,
    price: 1450,
    badge: "En Çok Tercih Edilen",
  },
  {
    id: 2,
    title: "Standart Çift Kişilik",
    location: "Antalya, Türkiye",
    image: "src/assets/images/hotelHero.jpg",
    rating: 4.5,
    price: 990,
    badge: "Fırsat",
  },
  {
    id: 3,
    title: "Aile Süiti",
    location: "Kapadokya, Türkiye",
    image: "src/assets/images/hotelHero.jpg",
    rating: 4.9,
    price: 1890,
    badge: "Süper Popüler",
  },
  {
    id: 4,
    title: "Suit Oda",
    location: "Bodrum, Türkiye",
    image: "src/assets/images/hotelHero.jpg",
    rating: 4.7,
    price: 1650,
    badge: "Tatil Fırsatı",
  },
  {
    id: 4,
    title: "Suit Oda",
    location: "Bodrum, Türkiye",
    image: "src/assets/images/hotelHero.jpg",
    rating: 4.7,
    price: 1650,
    badge: "Tatil Fırsatı",
  },
  {
    id: 4,
    title: "Suit Oda",
    location: "Bodrum, Türkiye",
    image: "src/assets/images/hotelHero.jpg",
    rating: 4.7,
    price: 1650,
    badge: "Tatil Fırsatı",
  },
];

const PopularRoomsSlider = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    slides: {
      perView: 1.1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 2, spacing: 16 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 24 },
      },
    },
  });

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Popüler Otel Odaları</h2>

      <div ref={sliderRef} className="keen-slider">
        {rooms.map((room) => (
          <div key={room.id} className="keen-slider__slide bg-white rounded-xl shadow-md overflow-hidden">
            <img src={room.image} alt={room.title} className="w-full h-48 object-cover" />
            <div className="p-5 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{room.title}</h3>
                <span className="text-sm bg-blue-100 text-blue-600 px-2 py-0.5 rounded">{room.badge}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPinIcon className="w-4 h-4 mr-1" />
                {room.location}
              </div>
              <div className="flex items-center text-yellow-500 text-sm">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(room.rating) ? 'fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-gray-600">{room.rating}</span>
              </div>
              <div className="text-lg font-bold text-gray-900">{room.price}₺ / gece</div>
              <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                İncele
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Okları */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute top-1/2 left-0 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute top-1/2 right-0 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
      >
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>
    </div>
  );
};

export default PopularRoomsSlider;
