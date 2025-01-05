import { useCallback, useMemo, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	TablePagination
} from '@mui/material'
import { ArrowDownward, ArrowUpward, Delete, Edit } from '@mui/icons-material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAll } from '../../../../../shared/api/axios-request'
import TableRowMemo from './TableRow/TableRow'
import clsx from 'clsx'

const CustomTableContainer = ({ searchQuery }) => {
	const [tableParams, setTableParams] = useState({
		page: 0,
		rowsPerPage: 5,
		sortBy: 'id',
		sortDirection: 'asc'
	})

	// Функция для обновления tableParams
	const updateTableParams = updates => {
		setTableParams(prev => ({ ...prev, ...updates }))
	}

	// const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

	const fetchModels = useCallback(
		async ({ signal }) => {
			// await delay(1000) // задержка 2 сек

			const response = await getAll(
				'/models',
				{
					params: {
						page: tableParams.page + 1, // API pages are 1-based
						perPage: tableParams.rowsPerPage,
						search: searchQuery,
						sortBy: tableParams.sortBy,
						sortDirection: tableParams.sortDirection
					}
				},
				signal
			)
			console.log(response)
			return response
		},
		[tableParams, searchQuery]
	)

	const { data, isPending, isError, isFetching } = useQuery({
		queryKey: ['models', 'list', tableParams, searchQuery],
		queryFn: fetchModels,
		gcTime: 1000,
		placeholderData: keepPreviousData
	})

	console.log(data)

	const handleChangePage = (event, newPage) => {
		updateTableParams({ page: newPage })
	}

	const handleChangeRowsPerPage = event => {
		updateTableParams({
			rowsPerPage: parseInt(event.target.value, 10),
			page: 0
		})
		console.log('handleChangeRowsPerPage')
	}

	const handleSort = column => {
		const isAsc =
			tableParams.sortBy === column && tableParams.sortDirection === 'asc'
		updateTableParams({
			sortDirection: isAsc ? 'desc' : 'asc',
			sortBy: column
		})
	}

	const handleEdit = id => {
		console.log('Edit row with id:', id)
	}

	const handleDelete = id => {
		console.log('Delete row with id:', id)
	}

	if (isPending) return <span>Loading...</span>
	if (isError) return <span>Error loading data</span>

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							<span style={{ display: 'flex', alignItems: 'center' }}>
								ID
								<IconButton onClick={() => handleSort('id')}>
									{tableParams.sortBy === 'id' &&
									tableParams.sortDirection === 'asc' ? (
										<ArrowUpward fontSize='small' />
									) : (
										<ArrowDownward fontSize='small' />
									)}
								</IconButton>
							</span>
						</TableCell>
						<TableCell>
							<span style={{ display: 'flex', alignItems: 'center' }}>
								Фамилия Имя
								<IconButton onClick={() => handleSort('FI')}>
									{tableParams.sortBy === 'FI' &&
									tableParams.sortDirection === 'asc' ? (
										<ArrowUpward fontSize='small' />
									) : (
										<ArrowDownward fontSize='small' />
									)}
								</IconButton>
							</span>
						</TableCell>
						<TableCell>
							<span style={{ display: 'flex', alignItems: 'center' }}>
								Рост
								<IconButton onClick={() => handleSort('height')}>
									{tableParams.sortBy === 'height' &&
									tableParams.sortDirection === 'asc' ? (
										<ArrowUpward fontSize='small' />
									) : (
										<ArrowDownward fontSize='small' />
									)}
								</IconButton>
							</span>
						</TableCell>
						<TableCell>
							<span style={{ display: 'flex', alignItems: 'center' }}>
								Размер обуви
								<IconButton onClick={() => handleSort('shoeSize')}>
									{tableParams.sortBy === 'shoeSize' &&
									tableParams.sortDirection === 'asc' ? (
										<ArrowUpward fontSize='small' />
									) : (
										<ArrowDownward fontSize='small' />
									)}
								</IconButton>
							</span>
						</TableCell>
						<TableCell>
							<span style={{ display: 'flex', alignItems: 'center' }}>
								Пол
								<IconButton onClick={() => handleSort('gender')}>
									{tableParams.sortBy === 'gender' &&
									tableParams.sortDirection === 'asc' ? (
										<ArrowUpward fontSize='small' />
									) : (
										<ArrowDownward fontSize='small' />
									)}
								</IconButton>
							</span>
						</TableCell>
						<TableCell>
							<span style={{ display: 'flex', alignItems: 'center' }}>
								Возраст
								<IconButton onClick={() => handleSort('age')}>
									{tableParams.sortBy === 'age' &&
									tableParams.sortDirection === 'asc' ? (
										<ArrowUpward fontSize='small' />
									) : (
										<ArrowDownward fontSize='small' />
									)}
								</IconButton>
							</span>
						</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody style={isFetching ? { opacity: 0.6 } : {}}>
					{data?.models?.map(row => (
						<TableRowMemo
							key={row.id}
							row={row}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					))}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[1, 5, 10, 20]}
				component='span'
				count={data?.total || 0}
				rowsPerPage={tableParams.rowsPerPage}
				page={tableParams.page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</TableContainer>
	)
}

export default CustomTableContainer
