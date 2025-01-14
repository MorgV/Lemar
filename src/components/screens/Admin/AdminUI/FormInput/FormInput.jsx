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
import { useState, useEffect, useMemo } from 'react'
import useModelForm from '../../../../../shared/hooks/useCreateModel' // Импорт нового хука
import { REACT_APP_API_URL } from '../../../../../utils/constans'
import { useModel } from '../../../../../shared/api/axios-request'

const FormInput = ({ editData, setEditData }) => {
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
	const [imageDeleteList, setImageDeleteList] = useState([])
	const [isModalOpen, setModalOpen] = useState(false)
	const [selectedImages, setSelectedImages] = useState([])
	const [selectedImageIndex, setSelectedImageIndex] = useState(null)

	const idModelInTable = useMemo(() => editData?.id, [editData])
	const { data } = useModel(idModelInTable)
	console.log('rerender', data)
	const clearInputs = () =>
		setInputs({
			firstName: '',
			height: '',
			shoeSize: '',
			gender: '',
			age: '',
			imageProfile: ''
		})
	const clearImages = () => {
		setImageList([])
		setSelectedImages([])
		setSelectedImageIndex([])
	}
	const isFile = el => {
		return el instanceof File ? true : false
	}

	const { handleSubmit, createModelMutation } = useModelForm({
		editData,
		setEditData,
		clearInputs,
		clearImages,
		setErrors
	})

	useEffect(() => {
		console.log(editData)
		if (editData && Object.keys(editData).length !== 0) {
			setInputs({
				firstName: editData.FI || '',
				height: editData.height || '',
				shoeSize: editData.shoeSize || '',
				gender: editData.gender || '',
				age: editData.age || '',
				imageProfile: `${REACT_APP_API_URL}${editData.imageProfile}` || ''
			})
		} else if (editData ? Object.keys(editData).length === 0 : false) {
			clearImages()
			clearInputs()
			setEditData(undefined)
		}
	}, [editData, data]) // Этот useEffect срабатывает только при изменении editData

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

	return (
		<Box sx={{ flex: 1 }}>
			<form
				onSubmit={e => handleSubmit(e, inputs, imageList, imageDeleteList)}
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
							// Сделать проверку на файл + отмена и изм на сохр
							src={
								isFile(inputs.imageProfile)
									? URL.createObjectURL(inputs.imageProfile)
									: inputs.imageProfile
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
				>
					{createModelMutation.isPending
						? 'Сохранение...'
						: editData
						? 'Изменить'
						: 'Сохранить'}
				</Button>
				{editData && (
					<Button
						variant='outlined'
						onClick={() => {
							clearImages()
							clearInputs()
							setEditData(undefined)
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
				)}
			</form>
			<ImageModal
				open={isModalOpen}
				key={inputs.id}
				editImages={data?.images}
				onClose={() => setModalOpen(false)}
				onSave={({ images, selectedImageIndexImageList }) => {
					setImageList(images)
					setInputs({
						...inputs,
						imageProfile: selectedImages[selectedImageIndexImageList]
					})
				}}
				onClear={clearImages}
				selectedImages={selectedImages}
				selectedImageIndex={selectedImageIndex}
				setSelectedImages={setSelectedImages}
				setSelectedImageIndex={setSelectedImageIndex}
				setImageDeleteList={setImageDeleteList}
			/>
		</Box>
	)
}

export default FormInput
