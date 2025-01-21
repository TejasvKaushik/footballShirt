import React, { useContext, useEffect, useState, ChangeEvent } from 'react';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

interface Product {
  _id: string;
  name: string;
  club: string;
  supplier: string;
  price: number;
  image: string[];
}

const Collection: React.FC = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('ShopContext must be used within a ShopProvider');
  }

  const { products, search, showSearch } = context;

  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const [club, setclub] = useState<string[]>([]);
  const [supplier, setsupplier] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>('relavent');

  const toggleclub = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setclub((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const togglesupplier = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setsupplier((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (club.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        club.includes(item.club)
      );
    }

    if (supplier.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        supplier.includes(item.supplier)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [club, supplier, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-12 px-6 sm:px-12 bg-gradient-to-b from-white via-gray-100 to-gray-200">
      {/* Filter Section */}
      <div className="min-w-60 bg-white p-6 rounded-md shadow-md">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="mb-4 text-xl font-medium cursor-pointer text-gray-800"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform ${
              showFilter ? 'rotate-180' : ''
            }`}
            src={assets.navArrowDown}
            alt="Toggle Filters"
          />
        </p>

        <div className={`border border-gray-300 p-5 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium text-gray-700">CLUB</p>
          <div className="flex flex-col gap-3 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-4" value="AC Milan" onChange={toggleclub} type="checkbox" /> AC Milan
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Arsenal" onChange={toggleclub} type="checkbox" /> Arsenal
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Barcelona" onChange={toggleclub} type="checkbox" /> Barcelona
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Bayern Munich" onChange={toggleclub} type="checkbox" /> Bayern Munich
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Chelsea" onChange={toggleclub} type="checkbox" /> Chelsea
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Tottenham" onChange={toggleclub} type="checkbox" /> Tottenham
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Inter Miami" onChange={toggleclub} type="checkbox" /> Inter Miami
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Juventus" onChange={toggleclub} type="checkbox" /> Juventus
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Liverpool" onChange={toggleclub} type="checkbox" /> Liverpool
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Manchester City" onChange={toggleclub} type="checkbox" /> Manchester City
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Real Madrid" onChange={toggleclub} type="checkbox" /> Real Madrid
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="PSG" onChange={toggleclub} type="checkbox" /> PSG
            </p>
          </div>
        </div>

        <div className={`border border-gray-300 p-5 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium text-gray-700">BRAND</p>
          <div className="flex flex-col gap-3 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-4" value="Adidas" onChange={togglesupplier} type="checkbox" /> Adidas
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Nike" onChange={togglesupplier} type="checkbox" /> Nike
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Puma" onChange={togglesupplier} type="checkbox" /> Puma
            </p>
          </div>
        </div>
      </div>

      {/* Collection Section */}
      <div className="flex-1 bg-white p-6 rounded-md shadow-md">
        <div className="flex justify-between text-base sm:text-2xl mb-6 text-gray-800">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-3 py-2 rounded-md"
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
