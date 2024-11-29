import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  async function fetchList() {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
        console.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  async function removeProduct(id) {
    try {
      const response = await axios.post(
        backendUrl + `/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
        console.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List ({list.length} products)</p>
      {loading ? (
        // Display spinner while loading
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-black border-solid"></div>
        </div>
      ) : list.length === 0 ? (
        // Display message if no products are available
        <p className="text-center text-gray-500 mt-4">No products available.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {/* ------- List Table Title ----------- */}
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className="text-center">Action</b>
          </div>
          {/* ---------- Product List -------- */}
          {list.map((product, idx) => (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
              key={idx}>
              <img className="w-12" src={product.image[0]} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>
                {currency}
                {product.price}
              </p>
              <p
                className="text-right md:text-center cursor-pointer text-lg"
                onClick={() => removeProduct(product._id)}>
                X
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default List;
