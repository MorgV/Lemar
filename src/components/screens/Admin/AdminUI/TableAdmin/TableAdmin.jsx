import { Box } from '@mui/material'
import { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import CustomTableContainer from '../CustomTableContainer/CustomTableContainer'
import SearchInput from '../SearchInput/SearchInput'
import { getAll } from '../../../../../shared/api/axios-request'

export default function SimpleTable() {
	const [searchQuery, setSearchQuery] = useState('')

	//
	const models = getAll('/models', {
		page: 1,
		perPage: 5,
		searchStroke: '123'
	})
	console.log(models)

	return (
		<Box sx={{ width: '100%', display: 'flex', gap: '20px' }}>
			{/* Form с инпутами для таблицы */}
			<FormInput />
			{/* Таблица */}
			<Box sx={{ flex: 3 }}>
				<SearchInput
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
				<CustomTableContainer searchQuery={searchQuery} />
			</Box>
		</Box>
	)
}
