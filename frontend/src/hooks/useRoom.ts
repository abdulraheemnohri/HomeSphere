import { useState, useEffect } from 'react';
import { message } from 'antd';
import { RoomType } from '../types';

interface RoomFormData {
  name: string;
  property_id: string;
  room_type: string;
  floor_number?: number;
  area?: number;
  area_unit?: string;
  has_window?: boolean;
  has_bathroom?: boolean;
  has_ac?: boolean;
  has_heater?: boolean;
  cleaning_schedule?: string;
  last_cleaned?: string;
  next_cleaning?: string;
  maintenance_notes?: string;
  is_active?: boolean;
}

export const useRoom = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async (propertyId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      let url = '/api/rooms/';
      if (propertyId) {
        url += '?property_id=' + propertyId;
      }
      const response = await fetch(url, {
        headers: { Authorization: 'Bearer ' + token }
      });
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      } else {
        throw new Error('Failed to fetch rooms');
      }
    } catch (err) {
      setError(err.message);
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async (roomData: RoomFormData) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/rooms/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(roomData)
      });
      if (response.ok) {
        const newRoom = await response.json();
        setRooms(prev => [...prev, newRoom]);
        message.success('Room created successfully');
        return newRoom;
      } else {
        throw new Error('Failed to create room');
      }
    } catch (err) {
      setError(err.message);
      message.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRoom = async (id: string, roomData: Partial<RoomFormData>) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/rooms/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(roomData)
      });
      if (response.ok) {
        const updatedRoom = await response.json();
        setRooms(prev => prev.map(room => room.id === id ? updatedRoom : room));
        message.success('Room updated successfully');
        return updatedRoom;
      } else {
        throw new Error('Failed to update room');
      }
    } catch (err) {
      setError(err.message);
      message.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/rooms/' + id, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token }
      });
      if (response.ok) {
        setRooms(prev => prev.filter(room => room.id !== id));
        message.success('Room deleted successfully');
      } else {
        throw new Error('Failed to delete room');
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
    rooms,
    loading,
    error,
    fetchRooms,
    createRoom,
    updateRoom,
    deleteRoom
  };
};

export default useRoom;