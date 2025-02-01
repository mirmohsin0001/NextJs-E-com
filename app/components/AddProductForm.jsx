'use client'; // Mark as a Client Component

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit = async (data) => {
    if (!imageFile) {
      alert('Please upload an image');
      return;
    }

    setIsUploading(true);

    try {
      // Upload the image to Cloudinary
      const formData = new FormData();
      formData.append('file', imageFile);

      const uploadResponse = await axios.post('/api/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!uploadResponse.data.success) {
        throw new Error('Failed to upload image');
      }

      const imageUrl = uploadResponse.data.url;

      // Send the form data to the API route
      const res = await axios.post('/api/admin/products', {
        ...data,
        image: imageUrl,
      });

      console.log(res.data);
      alert('Product added successfully!');
      reset(); // Clear the form after submission
      setImageFile(null); // Clear the image file
    } catch (error) {
      console.error(error);
      alert('Failed to add product: ' + error.response?.data?.error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <>
      <h2 className="sm:text-5xl text-3xl sm:font-semibold font-semi-bold text-center mb-4 mt-8 ">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            {...register('category', { required: 'Category is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            {...register('price', {
              required: 'Price is required',
              min: { value: 0, message: 'Price must be a positive number' },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isUploading}
          className="bg-black text-white px-5 py-3 rounded border-black border-2 hover:bg-white hover:text-black hover:border-2"
        >
          {isUploading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </>
  );
}