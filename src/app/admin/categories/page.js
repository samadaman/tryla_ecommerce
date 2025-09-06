'use client';

import { useEffect, useState } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const [editCategory, setEditCategory] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const API_URL = 'http://localhost:4000/categories';

  // Set client-side flag on mount
  useEffect(() => {
    setIsClient(true);
    fetchCategories();
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      // Handle both array response and object with data property
      const categoriesData = Array.isArray(data) ? data : (data.data || []);
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add category
  const handleAdd = async (e) => {
    e?.preventDefault();
    if (!newCategory.trim()) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newCategory }),
      });
      setNewCategory('');
      await fetchCategories();
    } catch (err) {
      console.error('Error adding category:', err);
      alert('Failed to add category. Please make sure you are logged in and have the necessary permissions.');
    }
  };

  // Edit category
  const handleEdit = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: editCategory.name }),
      });
      setEditCategory(null);
      fetchCategories();
    } catch (err) {
      console.error('Error editing category:', err);
      alert('Failed to update category. Please make sure you are logged in and have the necessary permissions.');
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  if (!isClient) {
    return (
      <div className="p-4">
        <h1 className="text-2xl text-gray-800 font-bold mb-4">Categories</h1>
        <p>Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl text-gray-800 font-bold mb-4">Categories</h1>

      {/* Add Category */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border rounded px-3 py-2 flex-1 text-gray-800"
        />
        <button
          type="submit"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Add
        </button>
      </form>

      {/* Categories Table */}
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left text-gray-800">Category Name</th>
                <th className="p-3 text-right text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-b">
                  <td className="p-3 text-gray-600">
                    {editCategory?.id === c.id ? (
                      <input
                        value={editCategory.name}
                        onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                        className="border px-2 py-1 rounded text-gray-800"
                      />
                    ) : (
                      c.name
                    )}
                  </td>
                  <td className="p-3 flex justify-end gap-2">
                    {editCategory?.id === c.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleEdit(c.id)}
                          className="cursor-pointer bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditCategory(null)}
                          className="cursor-pointer bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setEditCategory(c)}
                          className="cursor-pointer bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(c.id)}
                          className="cursor-pointer border border-gray-500 text-gray-800 px-3 py-1 rounded hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
