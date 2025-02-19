import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar: React.FC = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("ShopContext must be used within a ShopProvider");
  }

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = context;
  const [visible, setVisible] = useState<boolean>(false);

  const logout = (): void => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  return (
    <div className="flex items-center justify-between py-4 px-6 bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg">
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          className="w-36 hover:scale-105 transition-transform duration-300 rounded-md"
          alt="Logo"
        />
      </Link>

      {/* Menu Links */}
      <ul className="hidden sm:flex gap-8 text-sm font-medium tracking-wide">
        {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item) => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase()}`}
            className="flex flex-col items-center gap-1 text-white hover:text-yellow-300 transition duration-300"
          >
            <p>{item}</p>
            <hr className="w-3/4 h-[2px] bg-yellow-300 scale-x-0 group-hover:scale-x-100 transform transition-transform origin-center" />
          </NavLink>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          onClick={() => {
            setShowSearch(true);
            navigate("/collection");
          }}
          src={assets.searchIcon}
          className="w-6 cursor-pointer hover:scale-110 transition-transform duration-300"
          alt="Search"
        />

        {/* Profile */}
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-6 cursor-pointer hover:scale-110 transition-transform duration-300"
            src={assets.profileIcon}
            alt="Profile"
          />
          {token && (
            <div className="absolute right-0 pt-4 hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-lg">
              <div className="flex flex-col gap-3 w-48 py-4 px-5">
                <p className="cursor-pointer hover:text-green-600">
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-green-600"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-red-600"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cartIcon}
            className="w-6 min-w-6 cursor-pointer hover:scale-110 transition-transform duration-300"
            alt="Cart"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-5 h-5 text-center bg-red-600 text-white text-xs rounded-full">
            {getCartCount()}
          </p>
        </Link>

        {/* Hamburger Menu */}
        <img onClick={()=>setVisible(true)} src={assets.menuIcon} className='w-5 cursor-pointer sm:hidden' alt="" /> 
        </div>

      {/* Sidebar */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.navArrowDown} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
        </div>
    </div>
  );
};

export default Navbar;
