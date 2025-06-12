import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Site adı / açıklama */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">BookingWUS</h2>
          <p className="text-sm">
            En sevdiğiniz Tatilere kolayca keşfedin ve rezervasyon yapın.
          </p>
        </div>

        {/* Navigasyon */}
        <div>
          <h3 className="text-lg font-medium text-white mb-2">Menü</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:text-white transition-colors duration-200">Anasayfa</Link>
            </li>
            <li>
              <Link to="/hotels" className="hover:text-white transition-colors duration-200">Hoteller</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors duration-200">Hakkımızda</Link>
            </li>
          </ul>
        </div>

        {/* Sosyal medya */}
        <div>
          <h3 className="text-lg font-medium text-white mb-2">Bizi Takip Et</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors duration-200">Instagram</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Twitter</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Facebook</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BookingWUS. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
