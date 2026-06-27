import { useState, useEffect } from 'react';
import { message } from 'antd';
import { InventoryItemType } from '../types';

interface InventoryFormData {
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  quantity?: number;
  unit?: string;
  purchase_date?: string;
  purchase_price?: number;
  current_value?: number;
  barcode?: string;
  qr_code?: string;
  brand?: string;
  model?: string;
  serial_number?: string;
  location?: string;
  warranty_period?: number;
  warranty_expiry_date?: string;
  condition?: string;
  status?: string;
  low_stock_alert?: number;
  last_used_date?: string;
  last_maintenance_date?: string;
  next_maintenance_date?: string;
  maintenance_notes?: string;
  notes?: string;
  photos?: string[];
  documents?: string[];
  tags?: string[];
  is_active?: boolean;
  room_id?: string;
}

export const useInventory = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInventoryItems = async (roomId?: string, category?: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      let url = '/api/inventory/';
      const params = [];
      if (roomId) params.push('room_id=' + roomId);
      if (category) params.push('category=' + category);
      if (params.length > 0) {
        url += '?' + params.join('&');
      }
      const response = await fetch(url, {
        headers: { Authorization: 'Bearer ' + token }
      });
      if (response.ok) {
        const data = await response.json();
        setInventoryItems(data);
      } else {
        throw new Error('Failed to fetch inventory items');
      }
    } catch (err) {
      setError(err.message);
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLowStockItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/inventory/low-stock', {
        headers: { Authorization: 'Bearer ' + token }
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch low stock items');
      }
    } catch (err) {
      setError(err.message);
      message.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createInventoryItem = async (itemData: InventoryFormData) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/inventory/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(itemData)
      });
      if (response.ok) {
        const newItem = await response.json();
        setInventoryItems(prev => [...prev, newItem]);
        message.success('Inventory item created successfully');
        return newItem;
      } else {
        throw new Error('Failed to create inventory item');
      }
    } catch (err) {
      setError(err.message);
      message.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateInventoryItem = async (id: string, itemData: Partial<InventoryFormData>) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/inventory/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(itemData)
      });
      if (response.ok) {
        const updatedItem = await response.json();
        setInventoryItems(prev => prev.map(item => item.id === id ? updatedItem : item));
        message.success('Inventory item updated successfully');
        return updatedItem;
      } else {
        throw new Error('Failed to update inventory item');
      }
    } catch (err) {
      setError(err.message);
      message.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteInventoryItem = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/inventory/' + id, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token }
      });
      if (response.ok) {
        setInventoryItems(prev => prev.filter(item => item.id !== id));
        message.success('Inventory item deleted successfully');
      } else {
        throw new Error('Failed to delete inventory item');
      }
    } catch (err) {
      setError(err.message);
      message.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    inventoryItems,
    loading,
    error,
    fetchInventoryItems,
    fetchLowStockItems,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
  };
};

export default useInventory;