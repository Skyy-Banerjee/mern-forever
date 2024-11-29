import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function BestSeller() {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestSellerProducts = products.filter((product) => product.bestseller);
    setBestSeller(bestSellerProducts.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our best-sellers: top-rated pieces loved for their premium
          quality and unique designs.
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4">
        {bestSeller.map((product, idx) => {
          return (
            <ProductItem
              key={idx}
              id={product._id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BestSeller;
