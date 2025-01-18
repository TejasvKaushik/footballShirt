import React from 'react';
import { assets } from '../assets/assets';

const Footer: React.FC = () => {
  return (
    <div className='py-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm px-4 sm:px-12'>

        <div>
          <img className='mb-5 w-32' src={assets.logo} alt="Football T-shirts Logo" />
          <p className='w-full md:w-2/3 text-gray-700'>
            We offer premium football T-shirts designed for the game, crafted with top quality and comfort. Explore our wide range of collections.
          </p>
        </div>

        <div>
          <p className='text-xl font-semibold mb-5 text-gray-800'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-700'>
            <li className='hover:text-yellow-600 cursor-pointer'>Home</li>
            <li className='hover:text-yellow-600 cursor-pointer'>About Us</li>
            <li className='hover:text-yellow-600 cursor-pointer'>Delivery</li>
            <li className='hover:text-yellow-600 cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-semibold mb-5 text-gray-800'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-700'>
            <li className='hover:text-yellow-600 cursor-pointer'>+1-212-456-7890</li>
            <li className='hover:text-yellow-600 cursor-pointer'>Contact@foreveryou.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr className='border-gray-300' />
        <p className='py-5 text-sm text-center text-gray-600'>
          Copyright 2024@ forever.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
