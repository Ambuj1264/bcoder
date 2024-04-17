import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditModal from "./EditModal";
import { Product } from "./Home";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`https://dummyjson.com/products/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setProduct(data);
            setSelectedImage(data.thumbnail); // Initially set the main thumbnail as selected image
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching product:", error);
            setLoading(false);
          });
    }, [id]);

    const handleImageClick = (image: string| null) => {
      setSelectedImage(image);
    };

    const handleEditButtonClick = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!product) {
      return <div>Product not found</div>;
    }

    return (
      <div className="container mx-auto mt-8">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <img src={selectedImage!} alt={product.title} className="w-full h-96 object-contain mb-4" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">${product.price}</span>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleEditButtonClick}>Edit button</button>
              </div>
              <div className="flex">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product ${index + 1}`}
                    className={`w-16 h-16 object-cover mr-2 cursor-pointer ${selectedImage === image ? 'border-2 border-blue-500' : ''}`}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && <EditModal onUpdate={setProduct} onClose={handleCloseModal} product={product} />}
      </div>
    );
};

export default ProductDetails;
