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
          </Routes>
      </main>
 
      <Footer/>
    </div>
  
  )
}

export default App