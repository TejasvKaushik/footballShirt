import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
  sizes: string[];
  club: string;
  supplier: string;
}

const Product: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("ShopContext must be used within a ShopContextProvider");
  }

  const { products, currency, addToCart } = context;
  const [productData, setProductData] = useState<Product | null>(null);
  const [size, setSize] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const fetchProductData = async () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="pt-14 border-t-2 border-gray-200 transition-opacity ease-in duration-500 opacity-100 px-6 sm:px-12 py-10">
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-16">
        {/* Left Side Images */}
    <div className="flex-1 flex flex-col-reverse sm:flex-row gap-6 sm:gap-8 ">
      <div className="flex sm:flex-col justify-between sm:w-[18.7%] w-full">
        {productData.image.map((item: string, index: number) => (
          <div
            key={index}
            className="w-[24%] sm:w-full sm:mb-4 flex-shrink-0 cursor-pointer rounded-lg shadow-md overflow-hidden border bg-white"
            onClick={() => setImage(item)}
          >
            <img
              className="w-full h-auto rounded-lg"
              src={item}
              alt={`Product thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="w-full sm:w-[80%]">
        <img className="w-full h-auto rounded-lg shadow-md" src={image} alt="Selected product" />
      </div>
    </div>


        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-4">{productData.name}</h1>
          <div className="flex items-center gap-2 mt-3">
            <img className="w-4" src={assets.star_icon} alt="" />
            <img className="w-4" src={assets.star_icon} alt="" />
            <img className="w-4" src={assets.star_icon} alt="" />
            <img className="w-4" src={assets.star_icon} alt="" />
            <img className="w-4" src={assets.star_dull_icon} alt="" />
            <p className="pl-2 text-sm">(122)</p>
          </div>
          <p className="mt-6 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-6 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-10">
            <p className="font-semibold">Select Size</p>
            <div className="flex gap-3">
              {productData.sizes.map((item: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-5 bg-gray-100 rounded-md transition-all duration-300 hover:bg-gray-200 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white text-sm px-10 py-3 rounded-md active:bg-gray-700 transition-all duration-300"
          >
            ADD TO CART
          </button>

          <hr className="mt-10 sm:w-4/5 border-gray-300" />

          <div className="text-sm text-gray-500 mt-6 flex flex-col gap-2">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex border-b">
          <b className="border px-6 py-4 text-sm">Description</b>
        </div>
        <div className="flex flex-col gap-6 border px-8 py-8 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      <RelatedProducts
        club={productData.club}
        supplier={productData.supplier}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
