import Layout from '../../layout/Layout'
import styles from './Models.module.scss'

import { useQuery } from '@tanstack/react-query'
import { modelsClient } from '../../../shared/api/axios-request'
import Card from './ModelsUI/Card/Card'
import { useState } from 'react'
function Models() {
	// let models = []
	// const getModels = async (page = 1, perPage = 1, searchStroke = '') => {
	// 	try {
	// 		const response = await axios.get('http://localhost:5000/Lemar/models', {
	// 			page,
	// 			perPage,
	// 			searchStroke
	// 		})
	// 		const myArray = response.data // Данные из запроса
	// 		return myArray // Вернуть массив, если нужно
	// 	} catch (error) {
	// 		console.error('Ошибка:', error)
	// 		return []
	// 	}
	// }
	const [tableParams, setTableParams] = useState({
		page: 0,
		rowsPerPage: 20,
		sortBy: 'id',
		sortDirection: 'asc'
	})
	const { data, error, isPending, isError, isFetching } = useQuery({
		...modelsClient.getAllModelsInfiniteQueryOptions(
			{ tableParams },
			{ searchQuery: '' }
		)
	})

	console.log(data)
	if (isPending) {
		return <div>Loading...</div>
	}
	if (error) {
		return <div>error : {error}</div>
	}

	return (
		<Layout>
			<main className={styles.main}>
				<div className='container'>
					<div className={styles.main__cards}>
						{data.models.map((item, index) => {
							return <Card data={item} key={index} />
						})}
					</div>
				</div>
			</main>
		</Layout>
	)
}

export default Models
