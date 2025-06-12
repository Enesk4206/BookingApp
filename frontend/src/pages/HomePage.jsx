import React from 'react'
import HeroSection from '../component/HeroSection'
import TrustIndicators from '../component/TrustIndicators'
import HotelSearchSection from '../component/HotelSearchSection'

const HomePage = () => {
  return (
    <div className='min-h-screen '>
      <HeroSection/>
      <HotelSearchSection/>
      <TrustIndicators/>
    </div>
  )
}

export default HomePage