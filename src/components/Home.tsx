import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto mt-8">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {currentProducts.map((product: Product, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-md sm:mx-4 ">
                <Link to={`/products/${product?.id}`}>
                  <img src={product?.images[0]} alt={product?.title} className="w-full h-48 object-contain mb-4" />
                  <h2 className="text-lg font-semibold mb-2">{product?.title}</h2>
                  <p className="text-gray-600">{product?.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-gray-700">${product?.price}</span>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Details</button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
              <button key={i} onClick={() => paginate(i + 1)} className={`px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 ${currentPage === i + 1 ? "bg-gray-400" : ""}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
