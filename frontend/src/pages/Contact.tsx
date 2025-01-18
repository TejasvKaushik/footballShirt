import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-white via-gray-100 to-gray-200">
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-12 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px] rounded-lg shadow-md" src={assets.contact_img} alt="Contact Us" />
        <div className="flex flex-col justify-center items-start gap-6 text-gray-700">
          <p className="font-semibold text-xl">Our Store</p>
          <p className="text-gray-500">
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (415) 555-0132 <br /> Email: greatstackdev@gmail.com
          </p>
          <p className="font-semibold text-xl">Careers at Forever</p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>
          <button className="border border-black px-8 py-4 text-sm text-gray-800 hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
}

export default Contact;
