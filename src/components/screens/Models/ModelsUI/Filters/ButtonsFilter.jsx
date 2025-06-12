import { Button, Stack } from '@mui/material'

const ButtonsFilter = ({ gender, toggleDrawer, handleGenderChange }) => {
	return (
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
	)
}

export default ButtonsFilter
