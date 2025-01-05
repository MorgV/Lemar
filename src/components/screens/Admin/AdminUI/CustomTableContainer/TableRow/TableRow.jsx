import { memo } from 'react'
import { TableRow, TableCell, IconButton } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { REACT_APP_API_URL } from '../../../../../../utils/constans'

// eslint-disable-next-line react/display-name
const TableRowMemo = memo(({ row, handleEdit, handleDelete }) => {
	console.log('Рендер строки:', row.id) // Поможет отследить рендер
	return (
		<TableRow key={row.id}>
			<TableCell>{row.id}</TableCell>
			<TableCell>
				{/* Отображение изображения */}
				{row.imageProfile && (
					<img
						src={`${REACT_APP_API_URL}${row.imageProfile}`} // Путь к изображению (например, url или база64)
						alt='Profile'
						style={{
							width: '50px',
							height: '50px',
							objectFit: 'cover',
							borderRadius: '50%' // Можно сделать круглым, если это необходимо
						}}
					/>
				)}
			</TableCell>
			<TableCell>{`${row.FI}`}</TableCell>
			<TableCell>{row.height} cm</TableCell>
			<TableCell>{row.shoeSize} EU</TableCell>
			<TableCell>{row.gender}</TableCell>
			<TableCell>{row.age}</TableCell>
			<TableCell>
				<IconButton onClick={() => handleEdit(row)} color='primary'>
					<Edit />
				</IconButton>
				<IconButton onClick={() => handleDelete(row.id)} color='secondary'>
					<Delete />
				</IconButton>
			</TableCell>
		</TableRow>
	)
})

export default TableRowMemo
