import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://172.16.1.53:3000/api'; // Change to your machine's IP for physical devices

export const apiClient = {
  async post(endpoint: string, body: any) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      return data;
    } catch (error: any) {
      throw error;
    }
  },

  async get(endpoint: string) {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      return data;
    } catch (error: any) {
      throw error;
    }
  },
};
