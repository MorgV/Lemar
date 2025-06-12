import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { modelsClient } from '../../../shared/api/axios-request'
import SearchInput from '../Admin/AdminUI/SearchInput/SearchInput'
import FilterDrawer from './ModelsUI/FilterDrawer/FilterDrawer'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { debounce } from 'lodash'
import { ModelsLayout } from './ModelsLayout'
import ButtonsFilter from './ModelsUI/Filters/ButtonsFilter'
import ChipsFilter from './ModelsUI/Filters/ChipsFilter'
import ModelsList from './ModelsUI/ModelsList/ModelsList'

function Models() {
	console.log('render models')
	// TODO: Вынести бизнес логику
	// TODO: оптимизировать элементы
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
			<ModelsLayout
				search={
					<SearchInput
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						onChange={handleSearchChange} // Передаем функцию для изменения searchQuery
					/>
				}
				buttons={
					<ButtonsFilter
						gender={gender}
						toggleDrawer={toggleDrawer}
						handleGenderChange={handleGenderChange}
					/>
				}
				chips={
					<ChipsFilter
						filterLabels={filterLabels}
						gender={gender}
						filters={filters}
						handleDeleteChip={handleDeleteChip}
					/>
				}
				filterDrawer={
					<FilterDrawer
						key={gender}
						isOpen={isDrawerOpen}
						onClose={toggleDrawer(false)}
						heightOptions={heightOptions}
						shoeSizeOptions={shoeSizeOptions}
						ageOptions={ageOptions}
						onFilterChange={handleFilterChange}
						filters={filters}
						gender={gender}
					/>
				}
				modelsList={
					<ModelsList
						data={data}
						error={error}
						isError={isError}
						isFetching={isFetching}
						isLoading={isLoading}
						loadMore={loadMore}
					/>
				}
			/>
		</>
	)
}

export default Models
