import {
	Box,
	Button,
	TextField,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel
} from '@mui/material'
import ImageModal from './ImageModal/ImageModal'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const FormInput = ({ editData, onFormSubmit }) => {
	const [errors, setErrors] = useState({
		firstName: '',
		height: '',
		shoeSize: '',
		gender: '',
		age: '',
		imageProfile: ''
	})
	const [inputs, setInputs] = useState({
		firstName: '',
		height: '',
		shoeSize: '',
		gender: '',
		age: '',
		imageProfile: ''
	})
	const [imageList, setImageList] = useState([])
	const [isModalOpen, setModalOpen] = useState(false)

	// Handle input change for form fields
	const handleInputChange = e => {
		const { name, value } = e.target
		setInputs({
			...inputs,
			[name]: value
		})
		if (value === '') {
			setErrors({ ...errors, [name]: `${name} обязательно` })
		} else {
			setErrors({ ...errors, [name]: '' })
		}
	}

	// Mutation for form submission
	const mutation = useMutation({
		mutationFn: async formData => {
			const response = await axios.post(
				'http://localhost:5000/models',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)
			return response.data
		},
		mutationKey: ['create', 'model'],
		onSuccess: data => {
			// Reset form data including images after successful form submission
			setTimeout(() => {
				// Reset the form inputs and images
				setInputs({
					firstName: '',
					height: '',
					shoeSize: '',
					gender: '',
					age: '',
					imageProfile: ''
				})
				setErrors({
					firstName: '',
					height: '',
					shoeSize: '',
					gender: '',
					age: '',
					imageProfile: ''
				})
				setImageList([]) // Clear the image list
				setModalOpen(false) // Close the modal
				alert('Данные успешно сохранены!')
			}, 1000)
		},
		onError: error => {
			alert('Ошибка:', error)
		}
	})

	// Handle form submission
	const handleSubmit = e => {
		e.preventDefault()
		const newErrors = {}
		if (!inputs.firstName) newErrors.firstName = 'Фамилия Имя обязательно'
		if (!inputs.height) newErrors.height = 'Рост обязателен'
		if (!inputs.shoeSize) newErrors.shoeSize = 'Размер обуви обязателен'
		if (!inputs.gender) newErrors.gender = 'Пол обязателен'
		if (!inputs.age) newErrors.age = 'Возраст обязателен'
		if (!inputs.imageProfile)
			newErrors.imageProfile = 'Фото для профиля обязательно'
		if (imageList.length === 0) newErrors.imageList = 'Введите картинку'

		setErrors(newErrors)

		if (Object.keys(newErrors).length > 0) {
			return
		}

		const formData = new FormData()
		formData.append('firstName', inputs.firstName)
		formData.append('height', inputs.height)
		formData.append('shoeSize', inputs.shoeSize)
		formData.append('gender', inputs.gender)
		formData.append('age', inputs.age)

		// Add profile image to formData
		if (inputs.imageProfile instanceof File) {
			formData.append('imageProfile', inputs.imageProfile)
		}

		// Add all images in the imageList to formData
		let imgCount = 0
		imageList.forEach((image, index) => {
			imgCount++
			formData.append(`images[${index}]`, image)
		})
		formData.append('imgCount', imgCount)

		mutation.mutate(formData)
	}

	return (
		<Box sx={{ flex: 1 }}>
			<form
				style={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column'
				}}
				onSubmit={handleSubmit}
			>
				<TextField
					name='firstName'
					label='Фамилия Имя'
					variant='outlined'
					value={inputs.firstName}
					onChange={handleInputChange}
					error={!!errors.firstName}
					helperText={errors.firstName}
					sx={{ width: '100%', mb: 2 }}
				/>
				<TextField
					name='height'
					label='Рост'
					type='number'
					variant='outlined'
					value={inputs.height}
					onChange={handleInputChange}
					error={!!errors.height}
					helperText={errors.height}
					sx={{ width: '100%', mb: 2 }}
				/>
				<TextField
					name='shoeSize'
					label='Размер обуви'
					type='number'
					variant='outlined'
					value={inputs.shoeSize}
					onChange={handleInputChange}
					error={!!errors.shoeSize}
					helperText={errors.shoeSize}
					sx={{ width: '100%', mb: 2 }}
				/>

				{/* Gender selection (dropdown) */}
				<FormControl
					fullWidth
					variant='outlined'
					sx={{ mb: 2 }}
					error={!!errors.gender}
				>
					<InputLabel>Пол</InputLabel>
					<Select
						name='gender'
						value={inputs.gender}
						onChange={handleInputChange}
						label='Пол'
					>
						<MenuItem value=''>
							<em>Выберите пол</em>
						</MenuItem>
						<MenuItem value='Мужской'>Мужской</MenuItem>
						<MenuItem value='Женский'>Женский</MenuItem>
					</Select>
					{errors.gender && (
						<Typography color='error'>{errors.gender}</Typography>
					)}
				</FormControl>

				<TextField
					name='age'
					label='Возраст'
					type='number'
					variant='outlined'
					value={inputs.age}
					onChange={handleInputChange}
					error={!!errors.age}
					helperText={errors.age}
					sx={{ width: '100%', mb: 2 }}
				/>

				{/* Image Profile Button */}
				<Button
					variant='outlined'
					onClick={() => setModalOpen(true)}
					sx={{
						mb: 2,
						color: errors.imageProfile ? 'red' : '#01959f',
						borderColor: errors.imageProfile ? 'red' : 'white'
					}}
				>
					{!errors.imageProfile || !errors.imageList
						? 'Выбрать изображения'
						: `${errors.imageProfile}, ${errors.imageList}`}
				</Button>

				{/* Display selected profile image below button */}
				{inputs.imageProfile && (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							mb: 2
						}}
					>
						<Typography variant='body1' color='textSecondary'>
							Выбранное изображение профиля:
						</Typography>
						<img
							src={URL.createObjectURL(inputs.imageProfile)}
							alt='Profile'
							style={{
								width: '120px',
								height: '120px',
								objectFit: 'cover',
								borderRadius: '8px',
								marginTop: '8px'
							}}
						/>
					</Box>
				)}

				<Button type='submit' variant='contained' disabled={mutation.isLoading}>
					{mutation.isLoading ? 'Сохранение...' : 'Сохранить'}
				</Button>
			</form>
			<ImageModal
				open={isModalOpen}
				onClose={() => setModalOpen(false)}
				onSave={({ images, imageProfile }) => {
					setImageList(images)
					setInputs({
						...inputs,
						imageProfile: imageProfile
					})
				}}
			/>
		</Box>
	)
}

export default FormInput
