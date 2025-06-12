import { Chip, Stack } from '@mui/material'

const ChipsFilter = ({ filters, handleDeleteChip, filterLabels, gender }) => {
	return (
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
	)
}

export default ChipsFilter
