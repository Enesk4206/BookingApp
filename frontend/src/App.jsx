import React from 'react'
import {Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import HotelsPage from './pages/HotelsPage'
import RoomsPage from './pages/RoomsPage'
import AboutPage from './pages/AboutPage'
import SupportPage from './pages/SupportPage'
import Login from './pages/Authentication/Login'
import Register from './pages/Authentication/Register'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminCategory from './pages/Admin/AdminCategory'
import AdminHotel from './pages/Admin/AdminHotel'
import AdminRoom from './pages/Admin/AdminRoom'
import AdminHotelCreate from './pages/Admin/AdminHotelCreate'
import AdminAddOwner from './pages/Admin/AdminAddOwner'

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <main className='flex-grow'>
            <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/hotels' element={<HotelsPage/>}/>
            <Route path='/rooms' element={<RoomsPage/>}/>
            <Route path='/support' element={<SupportPage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            
            <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
            <Route path='/admin/create-owner' element={<AdminAddOwner/>}/>
            <Route path='/admin/hotel/list' element={<AdminHotel/>}/>
            <Route path='/admin/hotel/create' element={<AdminHotelCreate/>}/>
            <Route path='/admin/category' element={<AdminCategory/>}/>
            <Route path='/admin/room' element={<AdminRoom/>}/>
            
          </Routes>
      </main>
 
      <Footer/>
    </div>
  
  )
}

export default App