import React, { useState } from 'react'
import { Modal, Box, Button, Typography, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

const ImageModal = ({ open, onClose, onSave }) => {
	const [selectedImages, setSelectedImages] = useState([])
	const [selectedImageIndex, setSelectedImageIndex] = useState(null) // Selected profile image

	const handleFileChange = event => {
		const files = Array.from(event.target.files)
		setSelectedImages([...selectedImages, ...files])
	}

	const handleClear = () => {
		setSelectedImages([])
	}

	const handleRemoveImage = index => {
		const newImages = selectedImages.filter((_, i) => i !== index)
		setSelectedImages(newImages)
	}

	const handleImageClick = index => {
		setSelectedImageIndex(index === selectedImageIndex ? null : index)
	}

	// Handle Save
	const handleSave = () => {
		// Set the imageProfile as the selected image
		const imageProfile =
			selectedImageIndex !== null ? selectedImages[selectedImageIndex] : null
		// Pass both selected images and profile image to parent component
		onSave({
			images: selectedImages,
			imageProfile
		})
		onClose()
	}

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

				{/* Header */}
				<Typography variant='h6' mb={2}>
					Выберите изображения
				</Typography>

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
								src={URL.createObjectURL(file)}
								alt={file.name}
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
								{file.name}
							</Typography>

							<IconButton
								onClick={() => handleRemoveImage(index)}
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
				<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
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
			</Box>
		</Modal>
	)
}

export default ImageModal
