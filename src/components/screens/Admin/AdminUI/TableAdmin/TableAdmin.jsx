import { Box } from '@mui/material'
import { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import CustomTableContainer from '../CustomTableContainer/CustomTableContainer'
import SearchInput from '../SearchInput/SearchInput'

export default function SimpleTable() {
	const [searchQuery, setSearchQuery] = useState('')
	const [editData, setEditData] = useState(null) // Отслеживает текущую редактируемую строку

	//

	return (
		<Box sx={{ width: '100%', display: 'flex', gap: '20px' }}>
			{/* Form с инпутами для таблицы */}
			<FormInput editData={editData} />
			{/* Таблица */}
			<Box sx={{ flex: 3 }}>
				<SearchInput
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
				<CustomTableContainer
					setEditData={setEditData}
					searchQuery={searchQuery}
				/>
			</Box>
		</Box>
	)
}
