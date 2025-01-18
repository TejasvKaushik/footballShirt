import React, { useContext, useEffect, useState, ChangeEvent } from 'react';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

interface Product {
  _id: string;
  name: string;
  category: string;
  subCategory: string;
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
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>('relavent');

  const toggleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubCategory((prev) =>
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

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
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
  }, [category, subCategory, search, showSearch, products]);

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
          <p className="mb-3 text-sm font-medium text-gray-700">CATEGORIES</p>
          <div className="flex flex-col gap-3 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-4" value="Men" onChange={toggleCategory} type="checkbox" /> Men
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Women" onChange={toggleCategory} type="checkbox" /> Women
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Kids" onChange={toggleCategory} type="checkbox" /> Kids
            </p>
          </div>
        </div>

        <div className={`border border-gray-300 p-5 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium text-gray-700">TYPE</p>
          <div className="flex flex-col gap-3 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-4" value="Topwear" onChange={toggleSubCategory} type="checkbox" /> Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Bottomwear" onChange={toggleSubCategory} type="checkbox" /> Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-4" value="Winterwear" onChange={toggleSubCategory} type="checkbox" /> Winterwear
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
