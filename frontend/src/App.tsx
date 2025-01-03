import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Collections from './pages/collections'
import About from './pages/about'
import Cart from './pages/cart'
import Contact from './pages/contact'
import Login from './pages/login'
import Orders from './pages/orders'
import PlaceOrder from './pages/placeOrder'
import Product from './pages/product'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:[9vw]'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collections' element={<Collections/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/product/:product-id' element={<Product/>} />
      </Routes>
    </div>
  )
}

export default App
