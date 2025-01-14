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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import modelsClient, {
	deleteModel
} from '../../../../../shared/api/axios-request'
import TableRowMemo from './TableRow/TableRow'
import apiClient from '../../../../../shared/api/axios-request'

const CustomTableContainer = ({ searchQuery, setEditData, editData }) => {
	const queryClient = useQueryClient()
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

	const { data, error, isPending, isError, isFetching } = useQuery({
		...apiClient.getAllModelsInfiniteQueryOptions(
			{ tableParams },
			{ searchQuery }
		)
	})

	// Мутация для удаления
	const deleteModelMutation = useMutation({
		mutationFn: modelsClient.deleteModel,
		mutationKey: ['delete', 'model'],
		async onSuccess(_, deletedId) {
			const models = queryClient.getQueryData(
				modelsClient.getAllModelsInfiniteQueryOptions.queryKey
			)
			if (models) {
				const updatedModels = models.filter(item => item.id !== deletedId)
				queryClient.setQueryData(
					modelsClient.getAllModelsInfiniteQueryOptions.queryKey,
					updatedModels
				)
			}
			if (editData?.id == deletedId) {
				setEditData({})
			}
		},
		onError: error => {
			alert('Ошибка сохранения:', error.message)
		},
		async onSettled() {
			queryClient.invalidateQueries({
				queryKey: ['models', 'list']
			})
		}
	})
	const handleDelete = id => {
		deleteModelMutation.mutate(id)
	}
	const handleChangePage = (event, newPage) => {
		updateTableParams({ page: newPage })
	}

	const handleChangeRowsPerPage = event => {
		updateTableParams({
			rowsPerPage: parseInt(event.target.value, 10),
			page: 0
		})
	}

	const handleSort = column => {
		const isAsc =
			tableParams.sortBy === column && tableParams.sortDirection === 'asc'
		updateTableParams({
			sortDirection: isAsc ? 'desc' : 'asc',
			sortBy: column
		})
	}

	const handleEdit = row => {
		console.log('Edit row with id:', row.id)
		setEditData(row)
	}

	// Delete handler
	// const handleDelete = async id => {
	// 	deleteModel(id).then(res => alert(res))
	// }

	if (isPending) return <span>Loading...</span>
	if (isError) return <span>Error loading data, {error.message}</span>

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
								Icon
								<IconButton onClick={() => handleSort('FI')}></IconButton>
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
