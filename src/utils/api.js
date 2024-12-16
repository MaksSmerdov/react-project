export const fetchDataFromAPI = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error; // Позволяет обработать ошибку в вызывающем коде
  }
};
