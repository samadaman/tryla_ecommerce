'use client';

import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ 
    title: '', 
    description: '', 
    price: '', 
    stock: '', 
    categoryId: '',
    images: [],
    sizes: [],
    features: []
  });
  const [editProduct, setEditProduct] = useState(null);

  const API_URL = 'http://localhost:4000/products';
  const CAT_URL = 'http://localhost:4000/categories';

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const result = await res.json();
      setProducts(Array.isArray(result?.data) ? result.data : []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(CAT_URL);
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      
      if (!response.ok) throw new Error('Failed to add product');
      
      setNewProduct({ 
        title: '', 
        description: '', 
        price: '', 
        stock: '', 
        categoryId: '',
        images: [],
        sizes: [],
        features: []
      });
      fetchProducts();
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product');
    }
  };

  // Update product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editProduct) return;
    
    try {
      const response = await fetch(`${API_URL}/${editProduct.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editProduct),
      });
      
      if (!response.ok) throw new Error('Failed to update product');
      
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product');
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete product');
      
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product');
    }
  };

  // Set product for editing
  const handleEditClick = (product) => {
    setEditProduct({ ...product });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editProduct) {
      setEditProduct(prev => ({ ...prev, [name]: value }));
    } else {
      setNewProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle array fields (images, sizes, features)
  const handleArrayChange = (field, value) => {
    const arrayValue = value.split(',').map(item => item.trim());
    if (editProduct) {
      setEditProduct(prev => ({ ...prev, [field]: arrayValue }));
    } else {
      setNewProduct(prev => ({ ...prev, [field]: arrayValue }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-gray-700">
      <h1 className="text-2xl font-bold mb-8">Products Management</h1>
      
      {/* Add/Edit Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editProduct ? 'Edit Product' : 'Add New Product'}
        </h2>
        
        <form onSubmit={editProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={editProduct?.title || newProduct.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={editProduct?.price || newProduct.price}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                name="stock"
                value={editProduct?.stock || newProduct.stock}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="categoryId"
                value={editProduct?.categoryId || newProduct.categoryId}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={editProduct?.description || newProduct.description}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Images (comma-separated URLs)
              </label>
              <input
                type="text"
                value={(editProduct?.images || newProduct.images).join(', ')}
                onChange={(e) => handleArrayChange('images', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sizes (comma-separated)
              </label>
              <input
                type="text"
                value={(editProduct?.sizes || newProduct.sizes).join(', ')}
                onChange={(e) => handleArrayChange('sizes', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="S, M, L, XL"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Features (comma-separated)
              </label>
              <input
                type="text"
                value={(editProduct?.features || newProduct.features).join(', ')}
                onChange={(e) => handleArrayChange('features', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="100% Cotton, Breathable, Machine-washable"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            {editProduct && (
              <button
                type="button"
                onClick={() => setEditProduct(null)}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {editProduct ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Products List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Products</h3>
        </div>
        
        {loading ? (
          <div className="p-4 text-center">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No products found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.images?.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {product.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${parseFloat(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {categories.find(cat => cat.id === product.categoryId)?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
