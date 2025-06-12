import React from 'react'
import HeroSection from '../component/HeroSection'
import TrustIndicators from '../component/TrustIndicators'
import HotelSearchSection from '../component/HotelSearchSection'
import PopularRooms from '../component/PopularRooms'

const HomePage = () => {
  return (
    <div className='min-h-screen '>
      <HeroSection/>
      <HotelSearchSection/>
      <TrustIndicators/>
      <PopularRooms/>
    </div>
  )
}

export default HomePage