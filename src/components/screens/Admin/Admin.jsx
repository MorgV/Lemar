import { useState } from 'react'
import NotFound from '../NotFound/NotFound'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import TableAdmin from './AdminUI/TableAdmin/TableAdmin'

const Admin = () => {
	let isLogin = true

	const [value, setValue] = useState(0)
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	function TabPanel(props) {
		const { children, value, index, ...other } = props

		return (
			<div
				role='tabpanel'
				hidden={value !== index}
				id={`tabpanel-${index}`}
				aria-labelledby={`tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		)
	}

	return isLogin ? (
		<>
			<Box sx={{ width: '100%', p: 3 }}>
				{/* Компонент Tabs для переключения вкладок */}
				<Tabs
					value={value}
					onChange={handleChange}
					textColor='primary'
					indicatorColor='primary'
				>
					<Tab label='Модели' id='tab-0' aria-controls='tabpanel-0' />
					<Tab label='Пункт Два' id='tab-1' aria-controls='tabpanel-1' />
					<Tab label='Пункт Третий' id='tab-2' aria-controls='tabpanel-2' />
				</Tabs>

				{/* Содержимое вкладок */}
				<TabPanel value={value} index={0}>
					<TableAdmin />
				</TabPanel>
				<TabPanel value={value} index={1}>
					Пункт два
				</TabPanel>
				<TabPanel value={value} index={2}>
					Пункт третий
				</TabPanel>
			</Box>
		</>
	) : (
		<NotFound />
	)
}

export default Admin
