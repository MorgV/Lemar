import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { modelsClient } from '../../../shared/api/axios-request'
import Layout from '../../layout/Layout'
import styles from './Models.module.scss'
import CardList from './ModelsUI/CardList/CardList'
import SearchInput from '../Admin/AdminUI/SearchInput/SearchInput'
import { Button, Stack, Chip } from '@mui/material'
import FilterDrawer from './ModelsUI/FilterDrawer/FilterDrawer'

function Models() {
	console.log('render models')

	const [tableParams, setTableParams] = useState({
		page: 0,
		rowsPerPage: 8,
		sortBy: 'id',
		sortDirection: 'asc'
	})

	const [gender, setGender] = useState('')
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [filters, setFilters] = useState({
		height: [],
		shoeSize: [],
		age: []
	})

	const heightOptions = ['160', '170', '180', '190']
	const shoeSizeOptions = ['35', '36', '37', '38', '39']
	const ageOptions = ['10-15', '16-20', '21-25']

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
				? [...prevFilters[filterType], value]
				: prevFilters[filterType].filter(item => item !== value)

			return {
				...prevFilters,
				[filterType]: newFilterValues
			}
		})
	}

	const handleDeleteChip = (filterType, value) => {
		handleFilterChange(filterType, value, false)
	}

	const { data, error, isLoading, isError, isFetching } = useQuery(
		modelsClient.getModelsSummaryInfiniteQueryOptions(
			{ tableParams },
			{ searchQuery: '' }
		)
	)

	const loadMore = () => {
		setTableParams(prev => ({
			...prev,
			rowsPerPage: prev.rowsPerPage + 4
		}))
	}

	return (
		<Layout screen={'models'}>
			<main className={styles.main}>
				<SearchInput />

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
								key={`${filterType}-${value}`}
								label={`${filterLabels[filterType]}: ${value}`}
								onDelete={() => handleDeleteChip(filterType, value)}
								sx={{
									backgroundColor: gender !== 'female' ? '#01959f' : '#d95a8c',
									color: '#fff',
									'& .MuiChip-deleteIcon': {
										color: '#fff',
										'&:hover':
											gender != 'female'
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
							onLoadMore={loadMore}
							isFetching={isFetching}
						/>
					)}
				</div>
			</main>
		</Layout>
	)
}

export default Models
