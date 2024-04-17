import { useState } from "react";
import { Product } from "./Home";

const EditModal = ({ onClose, product, onUpdate }:{onClose: () => void, product: Product, onUpdate: (product: Product) => void }) => {
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`https://dummyjson.com/products/${product.id}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData
        })
      })
      .then(async(data) => {
        onUpdate(await data.json());
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      })
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={onClose}>
          X &nbsp; 
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>handleChange(e)} rows={3} className="mt-1 p-2 w-full border border-gray-300 rounded-md"></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
