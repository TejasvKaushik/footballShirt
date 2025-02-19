import React from 'react';

const NewsletterBox: React.FC = () => {
  return (
    <div className='text-center bg-gradient-to-b from-yellow-400 to-white py-12'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

      <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="text" placeholder='Enter your email id' required />
        <button className='bg-black text-white text-xs px-10 py-4' type='submit'>SUBSCRIBE</button>
      </form>
    </div>
  );
};

export default NewsletterBox;
