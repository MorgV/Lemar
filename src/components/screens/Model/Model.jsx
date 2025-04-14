import { useMemo, useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useModel } from '../../../shared/api/axios-request'
import {
	Box,
	Typography,
	IconButton,
	Grid,
	Paper,
	Button,
	CircularProgress
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { CSSTransition } from 'react-transition-group'
import './Model.scss'
import { M_NUMBER } from '../../../utils/constans'

const Model = () => {
	const { id } = useParams()
	const idModel = useMemo(() => id, [id])
	const { data } = useModel(idModel)
	const { model, images } = data || {}
	const navigate = useNavigate()

	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [isVisible, setIsVisible] = useState(false)
	const [imageLoaded, setImageLoaded] = useState(false)

	const nodeRef = useRef(null)

	useEffect(() => {
		setIsVisible(true)
	}, [])

	useEffect(() => {
		setImageLoaded(false)
	}, [currentImageIndex])

	const handlePrevSlide = () => {
		setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
	}

	const handleNextSlide = () => {
		setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
	}

	const handleClose = () => setIsVisible(false)

	const handleClick = () => {
		const phoneNumber = M_NUMBER
		const message = `Здравствуйте, я хочу выбрать модель! Меня интересует ${model.FI}, рост ${model.height}`
		const isMobile =
			/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
				navigator.userAgent
			)

		const whatsappUrl = isMobile
			? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
			: `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
					message
			  )}`

		window.open(whatsappUrl, '_blank')
	}

	return (
		<CSSTransition
			in={isVisible}
			timeout={300}
			classNames='fade'
			unmountOnExit
			onExited={() => navigate(-1)}
			nodeRef={nodeRef}
		>
			<Grid ref={nodeRef} container className='model-container'>
				{/* Header */}
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

				{/* Slider */}
				<Grid item xs={12} className='model-slider'>
					{images?.length > 0 && (
						<Box className='slider-container'>
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

							<Box className='slider-image-wrapper'>
								{!imageLoaded && (
									<Box
										sx={{
											position: 'absolute',
											top: '50%',
											left: '50%',
											transform: 'translate(-50%, -50%)',
											zIndex: 2
										}}
									>
										<CircularProgress />
									</Box>
								)}

								<img
									src={images[currentImageIndex]?.URL}
									alt={`Image ${currentImageIndex + 1}`}
									className='slider-image'
									onLoad={() => setImageLoaded(true)}
									onError={() => setImageLoaded(true)}
									style={{
										opacity: imageLoaded ? 1 : 0,
										transition: 'opacity 0.3s ease-in-out',
										width: '100%',
										height: 'auto',
										display: 'block'
									}}
								/>
							</Box>

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

				{/* Info */}
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
							<br />
							{model?.FI?.split(' ')[1]
								? model?.FI?.split(' ')[1]
								: model?.FI?.split(' ')[0]}
						</Typography>
						<Button
							variant='contained'
							sx={{ color: '#111', bgcolor: '#fff', borderRadius: 0 }}
							onClick={handleClick}
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
