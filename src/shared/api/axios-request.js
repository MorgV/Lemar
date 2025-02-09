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
		console.log('create MOdel')
		return postData('/models', data)
	},
	updateModel: ({ data, id }) => {
		console.log('Updating model:', data, id)
		return postData(`/models/${id}`, data) // Используем postData
	},
	getModelsSummaryInfiniteQueryOptions: (
		{ tableParams = {}, gender = '', filters = {} },
		{ searchQuery = '' } = {} // Убедитесь, что передаете searchQuery правильно
	) => {
		console.log(tableParams, gender, filters, searchQuery)
		return infiniteQueryOptions({
			queryKey: ['models', 'list', tableParams, gender, filters, searchQuery],
			queryFn: ({ queryKey }) => {
				const [, , tableParams, gender, filters, searchQuery] = queryKey

				return getAllModelsSummary({
					tableParams,
					searchQuery, // Используем searchQuery здесь
					gender,
					filters
				})
			},
			placeholderData: keepPreviousData
		})
	},

	deleteModel: async id => {
		try {
			console.log('Удаляем модель с ID:', id)
			const response = await apiClient(`/models/${id}`, {
				method: 'DELETE'
			})
			// Проверяем статус ответа, если сервер возвращает его в теле
			console.log(response.data)
			if (response.data.status != 'success') {
				throw new Error(response.data.message || 'Ошибка при удалении модели')
			}
			console.log('Удаляем модель с ID:', response)

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
export const getAllModelsSummary = async ({
	tableParams,
	searchQuery,
	gender,
	filters
}) => {
	console.log(tableParams, gender, filters, searchQuery)

	const response = await getAll('/modelssummary', {
		page: tableParams.page + 1, // API pages are 1-based
		perPage: tableParams.rowsPerPage,
		search: searchQuery || '', // Передаем searchQuery
		sortBy: tableParams.sortBy,
		sortDirection: tableParams.sortDirection,
		gender: gender || '', // Добавляем пол
		filters: JSON.stringify(filters) // Сериализуем фильтры в JSON-строку
	})

	console.log(response)
	return response
}

export const useModel = id => {
	return useQuery({
		queryKey: ['model', id],
		queryFn: () => getModelById(id),
		enabled: !!id
	})
}
const getModelById = async id => {
	try {
		const { data } = await axios.get(`http://lemar-models.ru:5000/models/${id}`)
		console.log('Данные получены:', data)
		return data // Возвращаем данные здесь
	} catch (error) {
		console.error('Ошибка:', error)
		return null // Возвращаем null в случае ошибки
	}
}

export default modelsClient
