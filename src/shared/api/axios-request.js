// Импортируем axios
import axios from 'axios'
import { REACT_APP_API_URL } from '../../utils/constans'
import {
	infiniteQueryOptions,
	keepPreviousData,
	useQuery
} from '@tanstack/react-query'

// Создаем экземпляр axios с базовыми настройками
const apiClient = axios.create({
	baseURL: REACT_APP_API_URL, // Укажите базовый URL вашего API
	// timeout: 10000, // Таймаут запросов в миллисекундах
	headers: {
		'Content-Type': 'application/json'
	}
})

export const modelsClient = {
	getAllModelsInfiniteQueryOptions: ({ tableParams }, { searchQuery }) => {
		return infiniteQueryOptions({
			queryKey: ['models', 'list', tableParams, searchQuery],
			queryFn: ({ queryKey }) => {
				// Извлекаем параметры из queryKey
				const [, , tableParams, searchQuery] = queryKey
				return getAllModels({ tableParams, searchQuery })
			},
			placeholderData: keepPreviousData
		})
	}
}
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
export const deleteModel = async id => {
	try {
		// Отправляем DELETE-запрос по указанному ID
		const response = await apiClient.delete(`/models/${id}`)
		console.log(response)
		return 0 // Возвращаем данные ответа сервера (например, сообщение об успешном удалении)
	} catch (error) {
		console.error('Ошибка при выполнении DELETE-запроса:', error)
		throw error
	}
}
export const getAllModels = async ({ tableParams, searchQuery }) => {
	console.log(tableParams)

	const response = await getAll('/models', {
		params: {
			page: tableParams.page + 1, // API pages are 1-based
			perPage: tableParams.rowsPerPage,
			search: searchQuery,
			sortBy: tableParams.sortBy,
			sortDirection: tableParams.sortDirection
		}
	})
	return response
}
const fetchModelById = async id => {
	const { data } = await axios.get(`http://localhost:5000/models/${id}`)
	return data
}

export const useModel = id => {
	return useQuery({
		queryKey: [`model`, id],
		queryFn: () => fetchModelById(id),
		enabled: !!id // Выполнять запрос только, если id существует
	})
}

export default modelsClient
