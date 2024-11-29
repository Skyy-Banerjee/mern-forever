import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  //console.log(productId);
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [productSize, setProductSize] = useState("");

  async function fetchProductData() {
    products.map((product) => {
      if (product._id === productId) {
        setProductData(product);
        //console.log(product);
        setImage(product.image[0]);
        return null;
      }
    });
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 bt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* ------- PRODUCT DATA -------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* PRODUCT IMAGES */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={productData.name}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(img)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="product-img" className="w-full h-auto" />
          </div>
        </div>
        {/* ------ PRODUCT INFO: ------ */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img className="w-3.5" src={assets.star_icon} alt="star-icon" />
            <img className="w-3.5" src={assets.star_icon} alt="star-icon" />
            <img className="w-3.5" src={assets.star_icon} alt="star-icon" />
            <img className="w-3.5" src={assets.star_icon} alt="star-icon" />
            <img
              className="w-3.5"
              src={assets.star_dull_icon}
              alt="star_dull-icon"
            />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((size, index) => (
                <button
                  onClick={() => setProductSize(size)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 ${
                    size === productSize ? "border-orange-500" : ""
                  }`}>
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, productSize)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash On Delivery (COD) is available on this product.</p>
            <p>Easy return & exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/*  ------- Description & Review Section ------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            {" "}
            Elevate your style with this exceptional product, designed for
            durability and versatility. Whether for casual outings or formal
            events, its sophisticated design and superior quality promise to
            make it a staple in your collection.
          </p>
          <p>
            This product offers the perfect balance of comfort and elegance.
            Thoughtfully crafted with attention to detail, it delivers unmatched
            performance and style, making it an ideal choice for those seeking
            functionality without compromising on aesthetic appeal.
          </p>
        </div>
      </div>
      {/* ------- DISPLAY RELATED PRODUCTS ------- */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
