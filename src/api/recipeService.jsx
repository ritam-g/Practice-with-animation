import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const fetchJson = async (path) => {
  const response = await axios.get(`${BASE_URL}/${path}`);
  return response.data?.meals || [];
};

export const searchMeals = (query) => fetchJson(`search.php?s=${encodeURIComponent(query)}`);

export const getMealById = (id) => fetchJson(`lookup.php?i=${encodeURIComponent(id)}`);

export const getRandomMeal = () => fetchJson('random.php');

export const getCategories = () => fetchJson('categories.php').then(data => data?.categories || []);

export const getMealsByCategory = (category) => fetchJson(`filter.php?c=${encodeURIComponent(category)}`);

export const getMealsByArea = (area) => fetchJson(`filter.php?a=${encodeURIComponent(area)}`);

export default {
  searchMeals,
  getMealById,
  getRandomMeal,
  getCategories,
  getMealsByCategory,
  getMealsByArea,
};

