import { createTheme } from '@mui/material/styles'
const theme = createTheme({
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
		}
	}
})

export default theme
