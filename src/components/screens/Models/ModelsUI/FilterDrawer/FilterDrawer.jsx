import React, { useState } from 'react'
import {
	Drawer,
	Box,
	FormControlLabel,
	Checkbox,
	Divider,
	List,
	ListItem,
	Typography,
	IconButton,
	Collapse
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import styles from './FilterDrawer.module.scss'

const FilterDrawer = ({
	isOpen,
	onClose,
	heightOptions,
	shoeSizeOptions,
	ageOptions,
	onFilterChange,
	gender,
	filters // добавляем filters
}) => {
	const [isHeightOpen, setIsHeightOpen] = useState(true)
	const [isShoeSizeOpen, setIsShoeSizeOpen] = useState(true)
	const [isAgeOpen, setIsAgeOpen] = useState(true)

	const handleCheckboxChange = (filterType, value) => event => {
		onFilterChange(filterType, value, event.target.checked)
	}

	const toggleHeight = () => setIsHeightOpen(prev => !prev)
	const toggleShoeSize = () => setIsShoeSizeOpen(prev => !prev)
	const toggleAge = () => setIsAgeOpen(prev => !prev)

	const renderFilterSection = (
		title,
		options,
		filterType,
		isOpen,
		toggleSection
	) => (
		<div>
			<Typography
				variant='subtitle1'
				className={styles.subtitle}
				sx={{
					marginY: 1,
					display: 'flex',
					justifyContent: 'space-between'
				}}
			>
				<span>{title}</span>
				<IconButton onClick={toggleSection}>
					{isOpen ? (
						<ExpandLessIcon sx={{ color: '#fff' }} />
					) : (
						<ExpandMoreIcon sx={{ color: '#fff' }} />
					)}
				</IconButton>
			</Typography>

			<Collapse in={isOpen}>
				<List>
					{options.map(option => (
						<ListItem key={option} button className={styles.listItem}>
							<FormControlLabel
								control={
									<Checkbox
										checked={filters[filterType]?.includes(option)} // отображение выбранных чекбоксов
										onChange={handleCheckboxChange(filterType, option)}
										name={option}
										sx={{
											color: '#fff',
											'&.Mui-checked': {
												color: gender === 'female' ? '#d95a8c' : '#01959f' // Условие для цвета
											}
										}}
									/>
								}
								label={option}
								className={styles.checkboxLabel}
							/>
						</ListItem>
					))}
				</List>
			</Collapse>
		</div>
	)

	return (
		<Drawer
			anchor='left'
			open={isOpen}
			onClose={onClose}
			sx={{
				'& .MuiDrawer-paper': {
					backgroundColor: '#111',
					color: '#fff'
				}
			}}
		>
			<Box sx={{ width: 250, padding: 2 }} role='presentation'>
				<Typography variant='h6' className={styles.title}>
					Панель фильтрации
				</Typography>

				<Divider sx={{ backgroundColor: '#fff' }} />

				{renderFilterSection(
					'Рост',
					heightOptions,
					'height',
					isHeightOpen,
					toggleHeight
				)}
				<Divider sx={{ backgroundColor: '#fff' }} />

				{renderFilterSection(
					'Размер обуви',
					shoeSizeOptions,
					'shoeSize',
					isShoeSizeOpen,
					toggleShoeSize
				)}
				<Divider sx={{ backgroundColor: '#fff' }} />

				{renderFilterSection(
					'Возраст',
					ageOptions,
					'age',
					isAgeOpen,
					toggleAge
				)}
			</Box>
		</Drawer>
	)
}

export default FilterDrawer
