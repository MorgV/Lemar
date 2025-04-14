import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { modelsClient } from '../../../shared/api/axios-request'
import Layout from '../../layout/Layout'
import styles from './Models.module.scss'
import CardList from './ModelsUI/CardList/CardList'
import SearchInput from '../Admin/AdminUI/SearchInput/SearchInput'
import { Button, Stack, Chip } from '@mui/material'
import FilterDrawer from './ModelsUI/FilterDrawer/FilterDrawer'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { debounce } from 'lodash'

function Models() {
	console.log('render models')
	const { category } = useParams() // category = 'boys' или 'girls'
	const [tableParams, setTableParams] = useState({
		page: 0,
		rowsPerPage: 8,
		sortBy: 'id',
		sortDirection: 'asc',
		search: '' // Параметр для поиска
	})
	useEffect(() => {
		setGender(category)
		console.log(category)
	}, [category])

	const [searchQuery, setSearchQuery] = useState('')
	const [gender, setGender] = useState()
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [filters, setFilters] = useState({
		height: [],
		shoeSize: [],
		age: []
	})

	const heightOptions = [
		'92-110',
		'110-120',
		'120-130',
		'130-140',
		'140 - 150',
		'150 - 160',
		'160 - 170',
		'170 - 180'
	]

	const shoeSizeOptions = ['25-30', '31-35', '36-40', '41-45']
	const ageOptions = ['3-6', '7-10', '11-15']

	const filterLabels = {
		height: 'Рост',
		shoeSize: 'Размер обуви',
		age: 'Возраст'
	}

	const handleGenderChange = newGender => {
		setGender(prevGender => (prevGender === newGender ? '' : newGender))
	}

	const toggleDrawer = open => event => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return
		}
		setIsDrawerOpen(open)
	}

	const handleFilterChange = (filterType, value, isChecked) => {
		setFilters(prevFilters => {
			const newFilterValues = isChecked
				? [...prevFilters[filterType], value] // Добавляем новый диапазон
				: prevFilters[filterType].filter(item => item !== value) // Удаляем диапазон

			return {
				...prevFilters,
				[filterType]: newFilterValues // Обновляем массив для конкретного фильтра
			}
		})
	}

	const handleDeleteChip = (filterType, value) => {
		handleFilterChange(filterType, value, false)
	}

	const handleSearchChange = debounce(event => {
		const query = event.target.value
		setSearchQuery(query)
		setTableParams(prev => ({
			...prev,
			search: query
		}))
	}, 1000)

	const { data, error, isLoading, isError, isFetching } = useQuery(
		modelsClient.getModelsSummaryInfiniteQueryOptions(
			{
				tableParams: {
					...tableParams, // Оставляем остальные параметры нетронутыми
					search: searchQuery // Передаем searchQuery
				},
				gender: gender || '',
				filters: filters
			},
			{ searchQuery } // Передаем searchQuery также здесь для синхронизации
		)
	)
	const loadMore = () => {
		setTableParams(prev => ({
			...prev,
			rowsPerPage: prev.rowsPerPage + 4
		}))
	}

	return (
		<>
			<Helmet>
				<title>Lemar-models</title>
				<meta
					name='description'
					content='LEMAR,модели кастинги, фотосессии, обучение для моделей. Запишитесь на пробный урок и станьте профессиональной моделью! Школа моды Владимир. lemar-models, модели во Владимире'
				/>
			</Helmet>

			<main className={styles.main}>
				<SearchInput
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					onChange={handleSearchChange} // Передаем функцию для изменения searchQuery
				/>

				<Stack
					direction={{ xs: 'column', sm: 'row' }} // Вертикально для маленьких экранов
					spacing={2}
					marginY={2}
					alignItems='center'
					justifyContent={{ xs: 'center', sm: 'space-between' }} // Центрирование на мобилках
					width='100%'
				>
					<Button
						variant='contained'
						sx={{
							color: '#fff',
							backgroundColor: gender !== 'female' ? '#01959f' : '#d95a8c',
							width: { xs: '100%', sm: 'auto' }, // 100% ширины на мобильных
							'&:hover': {
								backgroundColor: '#01b2bf',
								color: '#fff',
								transform: 'scale(1.05)',
								transition: 'all 0.3s ease'
							}
						}}
						onClick={toggleDrawer(true)}
					>
						Фильтрация
					</Button>

					<Stack
						direction={{ xs: 'column', sm: 'row' }} // Кнопки вертикально на мобилках
						spacing={2}
						width={{ xs: '100%', sm: 'auto' }}
					>
						<Button
							variant={gender === 'male' ? 'contained' : 'outlined'}
							sx={{
								color: '#fff',
								bgcolor: gender === 'male' ? '#01959f' : 'transparent',
								borderColor: '#01959f',
								width: { xs: '100%', sm: 'auto' }, // 100% ширины на мобильных
								'&:hover': {
									backgroundColor: '#01b2bf',
									color: '#fff',
									transform: 'scale(1.05)',
									transition: 'all 0.3s ease'
								}
							}}
							onClick={() => handleGenderChange('male')}
						>
							Мальчики
						</Button>

						<Button
							variant={gender === 'female' ? 'contained' : 'outlined'}
							sx={{
								color: '#fff',
								bgcolor: gender === 'female' ? '#d95a8c' : 'transparent',
								borderColor: '#d95a8c',
								width: { xs: '100%', sm: 'auto' }, // 100% ширины на мобильных
								'&:hover': {
									backgroundColor: '#e57399',
									color: '#fff',
									transform: 'scale(1.05)',
									transition: 'all 0.3s ease'
								}
							}}
							onClick={() => handleGenderChange('female')}
						>
							Девочки
						</Button>
					</Stack>
				</Stack>

				<Stack
					direction='row'
					flexWrap='wrap'
					margin={'10px 0 20px 0'}
					gap={'10px'}
				>
					{Object.entries(filters).map(([filterType, values]) =>
						values.map(value => (
							<Chip
								key={`${filterType}-${value}`} // Исправили эту строку
								label={`${filterLabels[filterType]}: ${value}`} // Исправили эту строку
								onDelete={() => handleDeleteChip(filterType, value)}
								sx={{
									backgroundColor: gender !== 'female' ? '#01959f' : '#d95a8c',
									color: '#fff',
									'& .MuiChip-deleteIcon': {
										color: '#fff',
										'&:hover':
											gender !== 'female'
												? { color: '#b53471' }
												: { color: '#01959f' }
									}
								}}
							/>
						))
					)}
				</Stack>

				<FilterDrawer
					isOpen={isDrawerOpen}
					onClose={toggleDrawer(false)}
					heightOptions={heightOptions}
					shoeSizeOptions={shoeSizeOptions}
					ageOptions={ageOptions}
					onFilterChange={handleFilterChange}
					filters={filters}
					gender={gender}
				/>

				<div className='container'>
					{isLoading ? (
						<div>Loading...</div>
					) : isError ? (
						<div>Error: {error.message}</div>
					) : (
						<CardList
							data={data?.models}
							total={data?.total}
							onLoadMore={loadMore}
							isFetching={isFetching}
						/>
					)}
				</div>
			</main>
		</>
	)
}

export default Models
