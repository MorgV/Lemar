// Импортируем axios
import axios from 'axios'
import { REACT_APP_API_URL } from '../../utils/constans'

// Создаем экземпляр axios с базовыми настройками
const apiClient = axios.create({
	baseURL: REACT_APP_API_URL, // Укажите базовый URL вашего API
	// timeout: 10000, // Таймаут запросов в миллисекундах
	headers: {
		'Content-Type': 'application/json'
	}
})

// Функция для GET-запроса
export const getAll = async (endpoint, params = {}) => {
	try {
		const models = await apiClient.get(endpoint, {
			params
		})
		return models.data
	} catch (error) {
		console.error('Ошибка при выполнении GET-запроса:', error)
		throw error
	}
}

// Функция для POST-запроса
export const postData = async (endpoint, data) => {
	try {
		const response = await apiClient.post(endpoint, data)
		return response.data
	} catch (error) {
		console.error('Ошибка при выполнении POST-запроса:', error)
		throw error
	}
}
