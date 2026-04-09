/**
 * Frontend API Configuration Example
 * Shows how to call public and admin routes
 */

// ============================================
// 1. PUBLIC API ENDPOINTS (No Auth Required)
// ============================================

// Get all products for customer browsing
export const getPublicProducts = async () => {
  const response = await fetch('http://localhost:3001/api/website/products');
  return response.json();
};

// Get categories for filtering
export const getPublicCategories = async () => {
  const response = await fetch('http://localhost:3001/api/website/categories');
  return response.json();
};

// Get single product details
export const getPublicProduct = async (id: string) => {
  const response = await fetch(`http://localhost:3001/api/website/products/${id}`);
  return response.json();
};

// Customer login
export const loginCustomer = async (email: string, password: string) => {
  const response = await fetch('http://localhost:3001/api/website/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// ============================================
// 2. ADMIN API ENDPOINTS (Requires Auth Token)
// ============================================

// Helper: Get token from localStorage
const getAuthToken = () => localStorage.getItem('adminToken');

// Admin: Get all products with admin view
export const getAdminProducts = async (token: string) => {
  const response = await fetch('http://localhost:3001/api/admin/products', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

// Admin: Create new product
export const createProduct = async (product: any, token: string) => {
  const response = await fetch('http://localhost:3001/api/admin/products', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });
  return response.json();
};

// Admin: Update product
export const updateProduct = async (id: string, updates: any, token: string) => {
  const response = await fetch(`http://localhost:3001/api/admin/products/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  return response.json();
};

// Admin: Delete product
export const deleteProduct = async (id: string, token: string) => {
  const response = await fetch(`http://localhost:3001/api/admin/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

// Admin: Get all categories for management
export const getAdminCategories = async (token: string) => {
  const response = await fetch('http://localhost:3001/api/admin/categories', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

// Admin: Create category
export const createCategory = async (category: any, token: string) => {
  const response = await fetch('http://localhost:3001/api/admin/categories', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(category)
  });
  return response.json();
};

// Admin: Update category
export const updateCategory = async (id: string, updates: any, token: string) => {
  const response = await fetch(`http://localhost:3001/api/admin/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  return response.json();
};

// Admin: Delete category
export const deleteCategory = async (id: string, token: string) => {
  const response = await fetch(`http://localhost:3001/api/admin/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

// Admin: Get all users
export const getAdminUsers = async (token: string) => {
  const response = await fetch('http://localhost:3001/api/admin/users', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

// Admin: Get all orders
export const getAdminOrders = async (token: string) => {
  const response = await fetch('http://localhost:3001/api/admin/orders', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

// ============================================
// 3. USAGE EXAMPLES IN REACT
// ============================================

/*
// In Frontend Components:

// PUBLIC - Browse products (no auth needed)
import { useEffect, useState } from 'react';

export function ProductsBrowse() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getPublicProducts().then(data => setProducts(data.data || []));
  }, []);

  return (
    <div>
      {products.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  );
}

// ADMIN - Manage products (requires token)
export function AdminProducts() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (token) {
      getAdminProducts(token).then(data => setProducts(data.data || []));
    }
  }, [token]);

  const handleDelete = async (id: string) => {
    if (token) {
      await deleteProduct(id, token);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      {products.map(p => (
        <div key={p.id}>
          {p.name}
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
*/
