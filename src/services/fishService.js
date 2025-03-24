// services/fishService.js
const API_BASE_URL = 'https://halak.onrender.com/api';

// Get all fish
export const fetchAllFish = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Halak`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching fish data:", error);
    throw error;
  }
};

// Get fish by ID
export const getFishById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Halak/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching fish with ID ${id}:`, error);
    throw error;
  }
};

// Update fish
export const updateFish = async (id, fishData) => {
  try {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fishData)
    };
    
    const response = await fetch(`${API_BASE_URL}/Halak/${id}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating fish with ID ${id}:`, error);
    throw error;
  }
};