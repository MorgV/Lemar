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
	getAllModelsInfiniteQueryOptions: (
		{ tableParams = {} },
		{ searchQuery = '' } = {}
	) => {
		return infiniteQueryOptions({
			queryKey: ['models', 'list', tableParams, searchQuery],
			queryFn: ({ queryKey }) => {
				// Извлекаем параметры из queryKey
				const [, , tableParams, searchQuery] = queryKey

				// Проверяем наличие tableParams
				return getAllModels(tableParams ? { tableParams, searchQuery } : {})
			},
			placeholderData: keepPreviousData
		})
	},

	createModel: data => {
		return postData('/models', data)
	},
	updateModel: (data, { id }) => {
		return apiClient(`/models/${id}`, {
			method: 'POST',
			json: data
		})
	},
	deleteModel: async id => {
		try {
			console.log('Удаляем модель с ID:', id)
			const response = await apiClient(`/models/${id}`, {
				method: 'DELETE'
			})
			// Проверяем статус ответа, если сервер возвращает его в теле
			if (response.status !== 200) {
				throw new Error(response.message || 'Ошибка при удалении модели')
			}
			console.log('Удаляем модель с IddddddddddddddD:', response)

			return response.data // Успешный результат
		} catch (error) {
			console.error('Ошибка при удалении модели:', 'e12e123')
			throw error // Пробрасываем ошибку, чтобы она обрабатывалась далее (например, в onError)
		}
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
		const response = await apiClient.post(endpoint, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
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
export const useModel = id => {
	return useQuery({
		queryKey: [`model`, id],
		queryFn: () => fetchModelById(id),
		enabled: !!id // Выполнять запрос только, если id существует
	})
}
const fetchModelById = async id => {
	const { data } = await axios
		.get(`http://localhost:5000/models/${id}`)
		.then(data => {
			console.log('Данные получены:', data) // Это массив байтов
		})
		.catch(error => {
			console.error('Ошибка:', error)
		})
	return data.data
}

export const saveModel = async ({ formData, id }) => {
	const endpoint = id ? `/models/${id}` : `/models`
	console.log(endpoint, formData)
	if (id) {
		const response = await apiClient.put({
			url: endpoint,
			formData,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return response.data
	} else {
		const response = await apiClient.post({
			url: endpoint,
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return response.data
	}
}

export default modelsClient
