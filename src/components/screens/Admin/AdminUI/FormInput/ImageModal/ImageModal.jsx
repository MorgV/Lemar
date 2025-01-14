import { useEffect, useState } from 'react'
import {
	Modal,
	Box,
	Button,
	Typography,
	IconButton,
	Alert
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { REACT_APP_API_URL } from '../../../../../../utils/constans'

const ImageModal = ({
	open,
	onClose,
	selectedImages,
	setSelectedImages,
	selectedImageIndex,
	setSelectedImageIndex,
	onSave,
	editImages,
	setImageList,
	imageList,
	setImageDeleteList
}) => {
	const [error, setError] = useState('') // Для хранения текста ошибки
	const [deletedArrayIdImagesOnServe, setDeletedArrayIdImagesOnServe] =
		useState([])

	const handleFileChange = event => {
		const files = Array.from(event.target.files)
		setSelectedImages([...selectedImages, ...files])
		setError('') // Убираем ошибку, если пользователь добавил файлы
	}

	const handleClear = () => {
		setSelectedImages([])
		setError('') // Убираем ошибку при очистке
	}

	const handleRemoveImage = (index, file) => {
		console.log(file)
		const newImages = selectedImages.filter((_, i) => i !== index)
		setSelectedImages(newImages)
		if (index === selectedImageIndex) {
			setSelectedImageIndex(null) // Сбрасываем выбор, если удалено выбранное изображение
		}
		if (isFile(file) == false) {
			editImages.map(el => {
				if (el.URL == file) {
					console.log(el.id, ' deleted')
					setDeletedArrayIdImagesOnServe(prevState => [...prevState, el.id])
					console.log(deletedArrayIdImagesOnServe, el.id)
				}
			})
		}
	}

	const handleImageClick = index => {
		console.log(index)
		setSelectedImageIndex(index === selectedImageIndex ? null : index)
	}

	const handleSave = () => {
		if (selectedImages.length === 0) {
			setError('Добавьте хотя бы одно изображение.')
			return
		}
		if (selectedImageIndex === null) {
			setError('Выберите профильное изображение.')
			return
		}

		onSave({
			images: selectedImages,
			selectedImageIndexImageList: selectedImageIndex
		})
		setImageDeleteList(deletedArrayIdImagesOnServe)
		onClose()
		setError('') // Сбрасываем ошибку после успешного сохранения
	}
	const isFile = el => {
		return el instanceof File ? true : false
	}

	useEffect(() => {
		if (editImages) {
			let imagesOnServe = editImages?.map(el => el.URL) // el.i - serv im || imageDeleteList[] то что мы вернем
			console.log(editImages, 'iwifweoifwijweioj')
			console.log('qwdqwdjp')
			setSelectedImages(imagesOnServe)
		}
	}, [editImages])

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: 4,
					borderRadius: 2,
					width: '80vw',
					maxHeight: '90vh',
					overflowY: 'auto'
				}}
			>
				{/* Top row buttons */}
				<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
					<Button
						variant='contained'
						component='label'
						sx={{
							width: '48%',
							backgroundColor: '#01959f',
							'&:hover': {
								backgroundColor: '#01b2bf'
							}
						}}
					>
						Загрузить изображения
						<input
							type='file'
							multiple
							accept='image/*'
							onChange={handleFileChange}
							hidden
						/>
					</Button>
					<Button
						variant='outlined'
						onClick={handleClear}
						color='error'
						sx={{
							width: '48%',
							borderColor: '#b53471',
							color: '#b53471',
							'&:hover': {
								borderColor: '#b53471',
								color: '#b53471'
							}
						}}
					>
						Очистить
					</Button>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
					<Button
						variant='outlined'
						onClick={onClose}
						color='error'
						sx={{
							width: '48%',
							borderColor: '#b53471',
							color: '#b53471',
							'&:hover': {
								borderColor: '#b53471',
								color: '#b53471'
							}
						}}
					>
						Отмена
					</Button>
					<Button
						variant='contained'
						onClick={handleSave}
						sx={{
							width: '48%',
							backgroundColor: '#01959f',
							'&:hover': {
								backgroundColor: '#01b2bf'
							}
						}}
					>
						Сохранить
					</Button>
				</Box>

				{/* Error message */}
				{error && (
					<Alert severity='error' sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}

				{/* Display images */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						flexWrap: 'wrap',
						gap: 2
					}}
				>
					{selectedImages.map((file, index) => (
						<Box
							key={index}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								width: '48%',
								position: 'relative',
								'@media (max-width: 600px)': {
									width: '100%'
								}
							}}
							onClick={() => handleImageClick(index)}
						>
							<img
								src={isFile(file) ? URL.createObjectURL(file) : file}
								alt={isFile(file) ? file.name : ''}
								style={{
									width: '100%',
									maxHeight: '400px',
									objectFit: 'cover',
									borderRadius: '8px'
								}}
							/>

							{index === selectedImageIndex && (
								<Box
									sx={{
										position: 'absolute',
										top: 8,
										left: 8,
										width: 20,
										height: 20,
										borderRadius: '50%',
										backgroundColor: '#01959f',
										border: '2px solid white'
									}}
								/>
							)}

							<Typography variant='caption' sx={{ mt: 1 }}>
								{isFile(file) ? file.name : ''}
							</Typography>

							<IconButton
								onClick={() => handleRemoveImage(index, file)}
								color='error'
								sx={{
									position: 'absolute',
									top: 10,
									right: 10
								}}
							>
								<Close />
							</IconButton>
						</Box>
					))}
				</Box>

				{/* Bottom row buttons */}
				<Box
					sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
				></Box>
			</Box>
		</Modal>
	)
}

export default ImageModal
