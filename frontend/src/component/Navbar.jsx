import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const isAdmin = role === 'SUPERADMIN' || role === 'OWNER';

  return (
    <nav className='bg-white shadow-lg mb-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>

          {/* Logo */}
          <div className='flex shrink-0'>
            <Link to='/' className='text-2xl font-bold text-blue-600'>
              BookingWUS
            </Link>
          </div>

          {/* Menü */}
          <div className='hidden md:flex space-x-6'>
            <Link to='/' className='text-gray-700 hover:text-blue-600 transition'>
              Anasayfa
            </Link>
            <Link to='/hotels' className='text-gray-700 hover:text-blue-600 transition'>
              Hoteller
            </Link>
            <Link to='/rooms' className='text-gray-700 hover:text-blue-600 transition'>
              Odalar
            </Link>
            <Link to='/support' className='text-gray-700 hover:text-blue-600 transition'>
              Destek
            </Link>
            <Link to='/about' className='text-gray-700 hover:text-blue-600 transition'>
              Hakkımızda
            </Link>

            {/* Admin Panel Linkleri */}
            {isAdmin && (
              <Link to='/admin/dashboard' className='text-red-600 font-semibold hover:text-red-800 transition'>
                Admin Panel
              </Link>
            )}
          </div>

          {/* Sağ bölüm */}
          <div className='hidden md:flex space-x-4 pl-10'>
            {!token ? (
              <>
                <Link
                  to='/register'
                  className='text-white border-2 px-3 py-1 rounded bg-blue-500 border-blue-500 hover:bg-blue-600 transition-colors duration-200'
                >
                  Kayıt
                </Link>
                <Link
                  to='/login'
                  className='text-white border-2 px-3 py-1 rounded bg-blue-500 border-blue-500 hover:bg-blue-600 transition-colors duration-200'
                >
                  Giriş
                </Link>
              </>
            ) : (
              <>
                <span className='text-gray-700 self-center font-semibold'>
                  Merhaba, {username}
                </span>
                <button
                  onClick={handleLogout}
                  className='text-white border-2 px-3 py-1 rounded bg-red-500 border-red-500 hover:bg-red-600 transition-colors duration-200'
                >
                  Çıkış Yap
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
