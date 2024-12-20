import { TextField } from '@mui/material'

const SearchInput = ({ searchQuery, setSearchQuery }) => {
	return (
		<TextField
			label='Поиск'
			variant='outlined'
			value={searchQuery}
			onChange={e => setSearchQuery(e.target.value)}
			sx={{ marginBottom: '20px', width: '100%' }}
		/>
	)
}
export default SearchInput
