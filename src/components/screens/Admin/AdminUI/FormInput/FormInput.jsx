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
import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { REACT_APP_API_URL } from '../../../../../utils/constans'
import modelsClient, { useModel } from '../../../../../shared/api/axios-request'

const FormInput = ({ editData, setEditData }) => {
	const queryClient = useQueryClient()
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
	const [selectedImages, setSelectedImages] = useState([])
	const [selectedImageIndex, setSelectedImageIndex] = useState(null)

	// Получение данных для редактирования
	const idModelInTable = editData ? editData.id : null

	const { data } = useModel(idModelInTable)

	// Обработчик изменения полей
	const handleInputChange = e => {
		const { name, value } = e.target
		setInputs(prev => ({
			...prev,
			[name]: value
		}))

		if (value === '') {
			setErrors(prev => ({ ...prev, [name]: `${name} обязательно` }))
		} else {
			setErrors(prev => ({ ...prev, [name]: '' }))
		}
	}

	const clearImages = () => {
		setImageList([])
	}
	const clearInputs = () =>
		setInputs({
			firstName: '',
			height: '',
			shoeSize: '',
			gender: '',
			age: '',
			imageProfile: ''
		})
	// Мутация для сохранения
	const createModelMutation = useMutation({
		mutationFn: modelsClient.createModel,
		mutationKey: ['save', 'model'],
		onSuccess: () => {
			// alert('Данные успешно сохранены!')
			clearInputs()
			clearImages()
		},
		onError: error => {
			alert(error.message)
		},
		async onSettled() {
			await queryClient.invalidateQueries({
				queryKey: ['models', 'list']
			})
		}
	})

	useEffect(() => {
		if (editData) {
			setInputs({
				firstName: editData.FI || '',
				height: editData.height || '',
				shoeSize: editData.shoeSize || '',
				gender: editData.gender || '',
				age: editData.age || '',
				imageProfile: `${REACT_APP_API_URL}${editData.imageProfile}` || ''
			})
			console.log(data)
			// setImageList(data?.map(el => console.log(el)) || [])
		}
	}, [editData, data])

	// Отправка формы
	const handleSubmit = e => {
		e.preventDefault()

		// Проверка ошибок
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

		if (inputs.imageProfile instanceof File) {
			formData.append('imageProfile', inputs.imageProfile)
			console.log('imageProfile передан')
		}

		imageList.forEach((image, index) => {
			formData.append(`images[${index}]`, image)
		})
		formData.append('imgCount', imageList.length)
		console.log('Submit fn')
		createModelMutation.mutate(formData) // ,?
	}

	return (
		<Box sx={{ flex: 1 }}>
			<form
				onSubmit={handleSubmit}
				style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
			>
				<TextField
					name='firstName'
					label='Фамилия Имя'
					value={inputs.firstName}
					onChange={handleInputChange}
					error={!!errors.firstName}
					helperText={errors.firstName}
					sx={{ mb: 2 }}
				/>
				<TextField
					name='height'
					label='Рост'
					type='number'
					value={inputs.height}
					onChange={handleInputChange}
					error={!!errors.height}
					helperText={errors.height}
					sx={{ mb: 2 }}
				/>
				<TextField
					name='shoeSize'
					label='Размер обуви'
					type='number'
					value={inputs.shoeSize}
					onChange={handleInputChange}
					error={!!errors.shoeSize}
					helperText={errors.shoeSize}
					sx={{ mb: 2 }}
				/>
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
					value={inputs.age}
					onChange={handleInputChange}
					error={!!errors.age}
					helperText={errors.age}
					sx={{ mb: 2 }}
				/>
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
							src={
								editData
									? inputs.imageProfile
									: URL.createObjectURL(inputs.imageProfile)
							}
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
				<Button
					type='submit'
					variant='contained'
					color={editData ? 'secondary' : 'primary'}
					disabled={createModelMutation.isLoading}
					onClick={editData ? handleSubmit : null}
				>
					{createModelMutation.isPending
						? 'Сохранение...'
						: editData
						? 'Изменить'
						: 'Сохранить'}
				</Button>
				{editData ? (
					<Button
						variant='outlined'
						onClick={() => {
							clearImages()
							clearInputs()
							setEditData('')
						}}
						color='error'
						sx={{
							marginTop: '10px',
							width: '100%',
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
				) : (
					<span></span>
				)}
			</form>
			<ImageModal
				open={isModalOpen}
				key={inputs.id}
				onClose={() => setModalOpen(false)}
				onSave={({ images, imageProfile }) => {
					setImageList(images)
					setInputs({
						...inputs,
						imageProfile: imageProfile
					})
				}}
				onClear={clearImages} // Новый пропс для очистки
				selectedImages={selectedImages}
				selectedImageIndex={selectedImageIndex}
				setSelectedImages={setSelectedImages}
				setSelectedImageIndex={setSelectedImageIndex}
			/>
		</Box>
	)
}

export default FormInput
