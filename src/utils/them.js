import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		text: {
			primary: '#111', // Цвет основного текста
			secondary: '#01959f' // Цвет вторичного текста
		}
	},
	components: {
		MuiTab: {
			styleOverrides: {
				root: {
					color: 'white', // Цвет текста неактивной вкладки
					'&.Mui-selected': {
						color: '#01959f' // Цвет текста активной вкладки
					}
				}
			}
		},
		MuiTabs: {
			styleOverrides: {
				indicator: {
					backgroundColor: '#01959f' // Цвет индикатора под активной вкладкой
				}
			}
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: 'white' // Цвет обводки
						},
						'&:hover fieldset': {
							borderColor: 'white' // Цвет обводки при наведении
						},
						'&.Mui-focused fieldset': {
							borderColor: '#b53471' // Цвет обводки при фокусе
						}
					},
					'& .MuiInputBase-input': {
						color: 'white' // Цвет текста #01959f
					}
				}
			}
		},
		MuiFormControl: {
			styleOverrides: {
				root: {
					// Если нужно добавить стили для FormControl
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: 'white' // Цвет обводки
						},
						'&:hover fieldset': {
							borderColor: 'white' // Цвет обводки при наведении
						},
						'&.Mui-focused fieldset': {
							borderColor: '#b53471' // Цвет обводки при фокусе
						}
					},
					'& .MuiInputBase-input': {
						color: 'white' // Цвет текста
					}
				}
			}
		}
	}
})

export default theme
