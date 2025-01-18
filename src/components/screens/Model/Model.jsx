import { useMemo, useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useModel } from '../../../shared/api/axios-request'
import { Box, Typography, IconButton, Grid, Paper, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
ArrowRightIcon
import { CSSTransition } from 'react-transition-group'
import './Model.scss'

const Model = () => {
	const { id } = useParams() // Получение id из URL
	const idModel = useMemo(() => id, [id])
	const { data } = useModel(idModel)
	const { model, images } = data || {}
	const navigate = useNavigate()

	// Состояние для текущего изображения в слайдере
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	// Состояние для управления анимацией
	const [isVisible, setIsVisible] = useState(false)

	// Включение анимации при загрузке
	useEffect(() => {
		setIsVisible(true)
	}, [])

	// Функции для переключения слайдов
	const handlePrevSlide = () => {
		setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
	}

	const handleNextSlide = () => {
		setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
	}

	// Функция для закрытия анимации
	const handleClose = () => setIsVisible(false)

	return (
		<CSSTransition
			in={isVisible}
			timeout={300} // Время анимации
			classNames='fade'
			unmountOnExit
			onExited={() => {
				// После завершения анимации закрытия перенаправляем
				navigate('/models')
			}}
		>
			<Grid container className='model-container'>
				{/* Верхняя часть */}
				<Grid item xs={12} className='model-header'>
					<Box className='header-left'>
						<Link onClick={handleClose} className='back-link'>
							<IconButton className='back-button' aria-label='Назад'>
								<ArrowBackIcon
									sx={{ width: 20, height: 20, color: '#fff', opacity: 0.5 }}
								/>
							</IconButton>
							<Typography variant='body1' className='return-to-catalog'>
								Вернуться к каталогу
							</Typography>
						</Link>
					</Box>
					<Box className='header-right'>
						<IconButton
							className='close-button'
							aria-label='Закрыть'
							onClick={handleClose}
						>
							<CloseIcon
								sx={{ width: 30, height: 30, color: '#fff', fontWeight: '200' }}
							/>
						</IconButton>
					</Box>
				</Grid>

				{/* Центральная часть с слайдером */}
				<Grid item xs={12} className='model-slider'>
					{images?.length > 0 && (
						<Box className='slider-container'>
							{/* Стрелка влево */}
							<IconButton className='arrow-button' onClick={handlePrevSlide}>
								<ArrowLeftIcon
									sx={{
										color: '#111',
										bgcolor: '#fff',
										borderRadius: '50%',
										fontSize: '40px'
									}}
								/>
							</IconButton>

							{/* Текущее изображение */}
							<img
								src={images[currentImageIndex]?.URL}
								alt={`Image ${currentImageIndex + 1}`}
								className='slider-image'
							/>

							{/* Стрелка вправо */}
							<IconButton className='arrow-button' onClick={handleNextSlide}>
								<ArrowRightIcon
									sx={{
										color: '#111',
										bgcolor: '#fff',
										borderRadius: '50%',
										fontSize: '40px'
									}}
								/>
							</IconButton>
						</Box>
					)}
				</Grid>

				{/* Нижняя часть с информацией */}
				<Grid bgcolor={'inherit'} item xs={12} className='model-info'>
					<Paper
						sx={{
							bgcolor: '#111',
							color: '#fff',
							typography: { fontSize: '50px' }
						}}
						className='model-info-paper'
					>
						<Typography variant='h5' className='model-info-title'>
							{model?.FI?.split(' ')[1]
								? model?.FI?.split(' ')[1]
								: model?.FI?.split(' ')[0]}
						</Typography>
						<Button
							variant='contained'
							sx={{ color: '#111', bgcolor: '#fff', borderRadius: 0 }}
						>
							Выбрать модель
						</Button>
						<Typography sx={{ fontSize: '23px', marginBottom: '10px' }}>
							{model?.FI}
						</Typography>
						<Typography>
							<strong>Возраст:</strong> {model?.age}
						</Typography>
						<Typography sx={{ marginBottom: '20px' }}>
							<strong>Пол:</strong> {model?.gender}
						</Typography>
						<Typography>
							<strong>Рост:</strong> {model?.height} см
						</Typography>
						<Typography>
							<strong>Размер Обуви:</strong> {model?.shoeSize}
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</CSSTransition>
	)
}

export default Model
