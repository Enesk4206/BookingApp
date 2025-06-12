import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
   <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
        <div className='grid grid-cols-1 md:grid-cols-2 bg-sky-100 rounded-2xl shadow-lg overflow-hidden'>
            {/**sol kısım */}
            <div className='relative h-80 md:h-auto'>
                <img src="src/assets/images/hotelHero.jpg" alt="deneme" className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent'/>
            </div>
            {/* sağ kısım */}
            <div className='flex flex-col justify-center px-8 md:px-12 py-10 text-gray-800 space-y-6'>
                <h1 className='text-4xl md:text-5xl font-bold leading-tight'>Binlerce Hotel BookingWUS da! </h1>
                <p className='text-lg text-gray-600'>
                    Hayalinizid deki tatil çoook da uzağınız da değil! Gelin birlikte yüzlerce Hotel ve Odaların bulunduğu Sitemizde yardımcı olalım
                </p>
                <Link 
                    to={'/hotels'}
                    className='inline-block bg-blue-500 text-white px-6 py-3 text-center rounded-lg shadow-md hover:bg-blue-600 transition'
                >
                    Şimdi Keşfet!
                </Link>
            </div>
        </div>
   </div>
  
  )
}

export default HeroSection