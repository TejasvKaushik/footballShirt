import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import {ShopContext} from '../context/ShopContext';

const Hero: React.FC = () => {
    const context = useContext(ShopContext);
    
      if (!context) {
        throw new Error('ShopContext must be used within a ShopProvider');
      }
    
      const { navigate } = context;
  return (
    <div className="flex flex-col sm:flex-row border border-gray-200 bg-gradient-to-r from-green-500 to-blue-600 text-white">
      {/* Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-start px-6 sm:px-12 py-10 sm:py-0">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <p className="w-10 h-[2px] bg-yellow-300"></p>
            <p className="font-medium text-sm md:text-base">BESTSELLERS</p>
          </div>
          <h1 className="text-3xl sm:py-3 lg:text-5xl font-bold tracking-wider">
            LATEST ARRIVALS
          </h1>
          <p className="text-lg mt-2">
            Discover the hottest football T-shirts and gear now!
          </p>
        </div>
        <button onClick={() => {
            navigate('/collection');
          }} className="bg-yellow-300 text-black font-semibold py-2 px-4 rounded-md shadow-md hover:bg-yellow-400 transition">
          SHOP NOW
        </button>
      </div>

      {/* Right Side */}
      <img
        className="w-full sm:w-1/2 object-cover"
        src={assets.hero_img}
        alt="Hero"
      />
    </div>
  );
};

export default Hero;
