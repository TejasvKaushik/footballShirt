import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy: React.FC = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-6 text-center py-20 bg-gradient-to-b from-blue-50 to-gray-100 text-xs sm:text-sm md:text-base text-gray-700'>

      {/* Easy Exchange Policy */}
      <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105'>
        <img className='w-16 m-auto mb-5' src={assets.exchange_icon} alt="Exchange Icon" />
        <p className='font-semibold text-lg text-yellow-600'>Easy Exchange Policy</p>
        <p className='text-gray-500'>We offer a hassle-free exchange policy.</p>
      </div>

      {/* 7 Days Return Policy */}
      <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105'>
        <img className='w-16 m-auto mb-5' src={assets.quality_icon} alt="Quality Icon" />
        <p className='font-semibold text-lg text-yellow-600'>7 Days Return Policy</p>
        <p className='text-gray-500'>We provide a 7-day free return policy.</p>
      </div>

      {/* Best Customer Support */}
      <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105'>
        <img className='w-16 m-auto mb-5' src={assets.support_icon} alt="Support Icon" />
        <p className='font-semibold text-lg text-yellow-600'>Best Customer Support</p>
        <p className='text-gray-500'>We provide 24/7 customer support.</p>
      </div>

    </div>
  );
};

export default OurPolicy;
