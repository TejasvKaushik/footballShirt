import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Collection from './pages/Collection';
import About from './pages/about';
import Cart from './pages/cart';
import Contact from './pages/contact';
import Login from './pages/login';
import Orders from './pages/orders';
import PlaceOrder from './pages/placeOrder';
import Product from './pages/product';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
// import NotFound from './pages/NotFound'; // A fallback page

const App: React.FC = () => {
  return (
    <div>
      <ToastContainer />
      {/* <NavBar /> */}
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/verify' element={<Verify />} />
        {/* <Route path='*' element={<NotFound />} /> Fallback route for unrecognized paths */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
