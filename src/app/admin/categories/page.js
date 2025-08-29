'use client';

import { useEffect, useState } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const [editCategory, setEditCategory] = useState(null);

  const API_URL = 'http://localhost:4000/categories';

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add category
  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory }),
      });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  // Edit category
  const handleEdit = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editCategory.name }),
      });
      setEditCategory(null);
      fetchCategories();
    } catch (err) {
      console.error('Error editing category:', err);
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

  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-bold mb-4">Categories</h1>

      {/* Add Category */}
      <div className="flex gap-2 mb-6 text-gray-800">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border rounded px-3 py-2 flex-1 text-gray-800"
        />
        <button
          onClick={handleAdd}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Add
        </button>
      </div>

      {/* Categories Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
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
                        onClick={() => handleEdit(c.id)}
                        className="cursor-pointer bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditCategory(null)}
                        className="cursor-pointer bg-gray-500 px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditCategory(c)}
                        className="cursor-pointer bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Edit
                      </button>
                      <button
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
      )}
    </div>
  );
}
