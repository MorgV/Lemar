import Layout from '../../layout/Layout'
import styles from './Models.module.scss'
import Card from './ModelsUI/Card/Card'
// import cardsData from '../../../data/data.json'
import axios from 'axios'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

function Models() {
	let models = []
	const getModels = async (page = 1, perPage = 1, searchStroke = '') => {
		try {
			const response = await axios.get('http://localhost:5000/Lemar/models', {
				page,
				perPage,
				searchStroke
			})
			const myArray = response.data // Данные из запроса
			return myArray // Вернуть массив, если нужно
		} catch (error) {
			console.error('Ошибка:', error)
			return []
		}
	}

	// const newModels = async (
	// 	height = 113,
	// 	shoeSize = 36,
	// 	gender = 'woman',
	// 	FI = 'e Han',
	// 	age = 17
	// ) => {
	// 	const res = await axios.post('http://localhost:5000/Lemar/models', {
	// 		height,
	// 		shoeSize,
	// 		gender,
	// 		FI,
	// 		age
	// 	})
	// 	return res
	// }

	useEffect(() => {
		getModels().then(modelsArray => (models = modelsArray)) // здесь лежат модели но не отрисовываются так как стейт менеджера нет
		console.log('first')
	}, [])

	const { data, error, isPending } = useQuery({
		queryKey: ['models', 'list'],
		queryFn: getModels
	})

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
						{data.map((item, index) => {
							return <Card data={item} key={index} />
						})}
					</div>
				</div>
			</main>
		</Layout>
	)
}

export default Models
