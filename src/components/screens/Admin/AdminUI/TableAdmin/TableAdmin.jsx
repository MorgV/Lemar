import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Checkbox,
	TablePagination,
	IconButton,
	Box
} from '@mui/material'
import { ArrowDownward, ArrowUpward, Edit, Delete } from '@mui/icons-material'
import { useState } from 'react'

const rows = [
	{
		id: 1,
		lastName: 'Snow',
		firstName: 'Jon',
		height: 180,
		shoeSize: 42,
		gender: 'Male',
		age: 35
	},
	{
		id: 2,
		lastName: 'Lannister',
		firstName: 'Cersei',
		height: 165,
		shoeSize: 38,
		gender: 'Female',
		age: 42
	},
	{
		id: 3,
		lastName: 'Lannister',
		firstName: 'Jaime',
		height: 185,
		shoeSize: 44,
		gender: 'Male',
		age: 45
	},
	{
		id: 4,
		lastName: 'Stark',
		firstName: 'Arya',
		height: 160,
		shoeSize: 37,
		gender: 'Female',
		age: 16
	},
	{
		id: 5,
		lastName: 'Targaryen',
		firstName: 'Daenerys',
		height: 170,
		shoeSize: 39,
		gender: 'Female',
		age: 25
	},
	{
		id: 6,
		lastName: 'Melisandre',
		firstName: 'None',
		height: 160,
		shoeSize: 38,
		gender: 'Female',
		age: 150
	},
	{
		id: 7,
		lastName: 'Clifford',
		firstName: 'Ferrara',
		height: 175,
		shoeSize: 41,
		gender: 'Male',
		age: 44
	},
	{
		id: 8,
		lastName: 'Frances',
		firstName: 'Rossini',
		height: 168,
		shoeSize: 40,
		gender: 'Female',
		age: 36
	},
	{
		id: 9,
		lastName: 'Roxie',
		firstName: 'Harvey',
		height: 172,
		shoeSize: 43,
		gender: 'Male',
		age: 65
	}
]

export default function SimpleTable() {
	const [selected, setSelected] = useState([])
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(5) // Default rows per page
	const [sortDirection, setSortDirection] = useState('asc')
	const [sortBy, setSortBy] = useState('id')

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			const newSelected = rows.map(row => row.id)
			setSelected(newSelected)
			return
		}
		setSelected([])
	}

	const handleClick = id => {
		const selectedIndex = selected.indexOf(id)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			)
		}

		setSelected(newSelected)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0) // Reset to the first page when changing rows per page
	}

	const handleEdit = id => {
		console.log('Edit row with id:', id) // You can implement editing functionality here
	}

	const handleDelete = id => {
		console.log('Delete row with id:', id) // You can implement delete functionality here
	}

	const isSelected = id => selected.indexOf(id) !== -1

	const handleSort = column => {
		const isAsc = sortBy === column && sortDirection === 'asc'
		setSortDirection(isAsc ? 'desc' : 'asc')
		setSortBy(column)
	}

	// Sort rows based on selected column and direction
	const sortedRows = [...rows].sort((a, b) => {
		if (a[sortBy] < b[sortBy]) {
			return sortDirection === 'asc' ? -1 : 1
		}
		if (a[sortBy] > b[sortBy]) {
			return sortDirection === 'asc' ? 1 : -1
		}
		return 0
	})

	return (
		<Box sx={{ width: '100%', display: 'flex', gap: '20px' }}>
			<Box>input</Box>
			<Box>
				<Box>search</Box>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell padding='checkbox'>
									<Checkbox
										indeterminate={
											selected.length > 0 && selected.length < rows.length
										}
										checked={rows.length > 0 && selected.length === rows.length}
										onChange={handleSelectAllClick}
									/>
								</TableCell>
								<TableCell>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										ID
										<IconButton onClick={() => handleSort('id')}>
											{sortBy === 'id' && sortDirection === 'asc' ? (
												<ArrowUpward fontSize='small' />
											) : (
												<ArrowDownward fontSize='small' />
											)}
										</IconButton>
									</div>
								</TableCell>
								<TableCell>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										Фамилия Имя
										<IconButton onClick={() => handleSort('lastName')}>
											{sortBy === 'lastName' && sortDirection === 'asc' ? (
												<ArrowUpward fontSize='small' />
											) : (
												<ArrowDownward fontSize='small' />
											)}
										</IconButton>
									</div>
								</TableCell>
								<TableCell>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										Рост
										<IconButton onClick={() => handleSort('height')}>
											{sortBy === 'height' && sortDirection === 'asc' ? (
												<ArrowUpward fontSize='small' />
											) : (
												<ArrowDownward fontSize='small' />
											)}
										</IconButton>
									</div>
								</TableCell>
								<TableCell>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										Размер обуви
										<IconButton onClick={() => handleSort('shoeSize')}>
											{sortBy === 'shoeSize' && sortDirection === 'asc' ? (
												<ArrowUpward fontSize='small' />
											) : (
												<ArrowDownward fontSize='small' />
											)}
										</IconButton>
									</div>
								</TableCell>
								<TableCell>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										Пол
										<IconButton onClick={() => handleSort('gender')}>
											{sortBy === 'gender' && sortDirection === 'asc' ? (
												<ArrowUpward fontSize='small' />
											) : (
												<ArrowDownward fontSize='small' />
											)}
										</IconButton>
									</div>
								</TableCell>
								<TableCell>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										Возраст
										<IconButton onClick={() => handleSort('age')}>
											{sortBy === 'age' && sortDirection === 'asc' ? (
												<ArrowUpward fontSize='small' />
											) : (
												<ArrowDownward fontSize='small' />
											)}
										</IconButton>
									</div>
								</TableCell>
								<TableCell>Actions</TableCell>{' '}
								{/* Adding Actions column for buttons */}
							</TableRow>
						</TableHead>
						<TableBody>
							{sortedRows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(row => {
									const isItemSelected = isSelected(row.id)
									return (
										<TableRow
											key={row.id}
											hover
											role='checkbox'
											onClick={() => handleClick(row.id)}
											selected={isItemSelected}
										>
											<TableCell padding='checkbox'>
												<Checkbox checked={isItemSelected} />
											</TableCell>
											<TableCell>{row.id}</TableCell>
											<TableCell>{`${row.lastName} ${row.firstName}`}</TableCell>
											<TableCell>{row.height} cm</TableCell>
											<TableCell>{row.shoeSize} EU</TableCell>
											<TableCell>{row.gender}</TableCell>
											<TableCell>{row.age}</TableCell>
											<TableCell>
												{/* Edit and Delete buttons */}
												<IconButton
													onClick={() => handleEdit(row.id)}
													color='primary'
												>
													<Edit />
												</IconButton>
												<IconButton
													onClick={() => handleDelete(row.id)}
													color='secondary'
												>
													<Delete />
												</IconButton>
											</TableCell>
										</TableRow>
									)
								})}
						</TableBody>
					</Table>
					<TablePagination
						rowsPerPageOptions={[5, 10, 20]} // Options for rows per page
						component='div'
						count={sortedRows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage} // Handle change in rows per page
					/>
				</TableContainer>
			</Box>
		</Box>
	)
}
