import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    //shrink: elemanın küçülmesini engeller
    //transition: bir öğenin stil değişikliğini anisyonla geçiş yapmasını sağlar
  return (
    <nav className='bg-white shadow-lg mb-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
                {/**Logo */}
                <div className='flex shrink-0'>
                    <Link to={'/'} className='text-2xl font-bold text-blue-600'>
                        BookigWUS
                    </Link>
                </div>
                {/**Menu */}
                <div className='hidden md:flex space-x-6'> 
                    <Link to={'/'} className='text-gray-700 hover:text-blue-600 transition'>
                        Anasayfa
                    </Link>
                    <Link to={'/hotels'} className='text-gray-700 hover:text-blue-600 transition'>
                        Hoteller
                    </Link>
                    <Link to={'/rooms'} className='text-gray-700 hover:text-blue-600 transition'>
                        Odalar
                    </Link>
                    <Link to={'/support'} className='text-gray-700 hover:text-blue-600 transition'>
                        Destek
                    </Link>     
                    <Link to={'/about'} className='text-gray-700 hover:text-blue-600 transition'>
                        Hakkımızda
                    </Link>     
                </div>

                <div className='hidden md:flex space-x-4 pl-10'>
                    <Link to={'/register'} 
                        className='text-white border-2 px-2 py-1 rounded bg-blue-500 border-blue-500 
                        hover:bg-blue-600 transition-colors duration-200'
                    >
                        Kayıt
                    </Link>
                    <Link to={'/login'}  
                        className='text-white border-2 px-2 py-1 rounded bg-blue-500 border-blue-500 
                        hover:bg-blue-600 transition-colors duration-200'
                        >
                        Giriş
                    </Link>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar