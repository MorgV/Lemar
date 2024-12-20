import {
	Box,
	Button,
	Card,
	CardMedia,
	FormHelperText,
	Grid,
	IconButton,
	TextField,
	Typography,
	CloseIcon
} from '@mui/material'
import axios from 'axios'
import { useState } from 'react'

const FormInput = () => {
	const [errors, setErrors] = useState({
		firstName: '',
		lastName: '',
		height: '',
		shoeSize: '',
		gender: '',
		age: '',
		imgFile: ''
	})
	const [inputs, setInputs] = useState({
		firstName: '',
		height: '',
		shoeSize: '',
		gender: '',
		age: '',
		imgFile: ''
	})
	const [imageList, setImageList] = useState()

	const handleInputChange = e => {
		const { name, value } = e.target
		setInputs({
			...inputs,
			[name]: value
		})

		// Simple validation
		if (value === '') {
			setErrors({
				...errors,
				[name]: `${name} обязательно`
			})
		} else {
			setErrors({
				...errors,
				[name]: ''
			})
		}
		if (name == 'imgFile') {
			console.log(e.target.files[0])
			setImageList(e.target.files[0])
		}
		console.log(inputs, imageList)
	}

	const newModels = async ({
		imageList,
		height = 113,
		shoeSize = 36,
		gender = 'woman',
		firstName: FI = 'e Han',
		age = 17
	}) => {
		console.log(imageList, height, shoeSize, gender, FI, age)

		// Если вы хотите отправить запрос
		const formData = new FormData()
		formData.append('imageList', imageList)
		formData.append('height', height)
		formData.append('shoeSize', shoeSize)
		formData.append('gender', gender)
		formData.append('firstName', FI)
		formData.append('age', age)

		try {
			const res = await axios.post(
				'http://localhost:5000/Lemar/models',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)
			return res
		} catch (error) {
			console.error('Ошибка при сохранении модели:', error)
		}
	}

	const handleSubmit = e => {
		e.preventDefault()

		// Проверка всех полей
		const newErrors = {}
		if (!inputs.firstName) newErrors.firstName = 'Фамилия Имя обязательно'
		if (!inputs.height) newErrors.height = 'Рост обязателен'
		if (!inputs.shoeSize) newErrors.shoeSize = 'Размер обуви обязателен'
		if (!inputs.gender) newErrors.gender = 'Пол обязателен'
		if (!inputs.age) newErrors.age = 'Возраст обязателен'
		if (!inputs.imgFile) newErrors.imgFile = 'Изображение обязательно'

		setErrors(newErrors)

		// Если есть ошибки, форма не отправляется
		if (Object.keys(newErrors).length > 0) {
			return
		}

		// Передаем imgFile отдельно как imageList
		newModels({
			imageList: inputs.imgFile, // imgFile передается как imageList
			height: inputs.height,
			shoeSize: inputs.shoeSize,
			gender: inputs.gender,
			firstName: inputs.firstName,
			age: inputs.age
		})
	}

	return (
		<Box sx={{ flex: 1 }}>
			<form
				style={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					position: 'relative'
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
					sx={{ width: '100%', marginBottom: '10px' }}
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
					sx={{ width: '100%', marginBottom: '10px' }}
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
					sx={{ width: '100%', marginBottom: '10px' }}
				/>
				<TextField
					name='gender'
					label='Пол'
					variant='outlined'
					value={inputs.gender}
					onChange={handleInputChange}
					error={!!errors.gender}
					helperText={errors.gender}
					sx={{ width: '100%', marginBottom: '10px' }}
				/>
				<TextField
					name='age'
					label='Возраст'
					type='number'
					variant='outlined'
					value={inputs.age}
					onChange={handleInputChange}
					error={!!errors.age}
					helperText={errors.age}
					sx={{ width: '100%', marginBottom: '10px' }}
				/>
				<Box
					sx={{
						marginBottom: '10px',
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<Button
						variant='outlined'
						component='label'
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '20px',
							color: '#01959f',
							borderColor: 'white'
						}}
					>
						{inputs.imgFile ? (
							<Typography>{inputs.imgFile}</Typography>
						) : (
							<Typography>Загрузите изображение</Typography>
						)}
						<input
							type='file'
							name='imgFile'
							accept='image/*'
							onChange={handleInputChange}
							hidden
						/>
					</Button>
					{errors.imgFile && (
						<FormHelperText error>{errors.imgFile}</FormHelperText>
					)}
					{/* Кнопка открытия модального окна */}
					{/* <Button
						variant='outlined'
						color='primary'
						onClick={() => setIsModalOpen(true)}
						sx={{ marginBottom: '10px' }}
					>
						Добавить изображения
					</Button>

					{/* Отображение ошибок */}
					{/* {errors.imageList && (
						<FormHelperText error>{errors.imageList}</FormHelperText>
					)}{' '} */}

					{/* Отображение загруженных изображений */}
					{/* <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
						{imageList.map((image, index) => (
							<Grid item key={index} xs={4}>
								<Card>
									<CardMedia
										component='img'
										height='140'
										image={URL.createObjectURL(image)}
										alt={`Image ${index + 1}`}
									/>
									<IconButton
										onClick={() => handleRemoveImage(index)}
										sx={{ position: 'absolute', top: 0, right: 0 }}
									>
										<CloseIcon />
									</IconButton>
								</Card>
							</Grid>
						))}
					</Grid> */}
				</Box>
				<Button type='submit' variant='contained' color='primary'>
					Сохранить
				</Button>
			</form>
		</Box>
	)
}

export default FormInput
