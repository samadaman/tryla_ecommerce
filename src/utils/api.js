/**
 * API Utility for making HTTP requests
 * Uses environment variables for configuration
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

/**
 * Helper function to handle fetch requests
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const error = new Error('An error occurred while fetching the data.');
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Example API functions
export async function getProducts() {
  return fetchAPI('/products');
}

export async function getProductById(id) {
  try {
    console.log(`Fetching product with ID: ${id}`);
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.status = response.status;
      throw error;
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    
    // Handle case where the API returns { ok: true, data: {...} }
    if (data && data.ok && data.data) {
      return data.data;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getProductById:', error);
    throw error;
  }
}

export async function getFeaturedProducts() {
  return fetchAPI('/products/featured');
}

export async function getCategories() {
  return fetchAPI('/categories');
}

export default {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getCategories,
};