import { useMutation, useQueryClient } from '@tanstack/react-query'
import modelsClient from '../../shared/api/axios-request'

const useUpdateModelForm = ({
	editData,
	clearInputs,
	clearImages,
	setEditData,
	setErrors
}) => {
	const queryClient = useQueryClient()

	// Мутация для создания/редактирования модели
	const createModelMutation = useMutation({
		mutationFn: editData ? modelsClient.updateModel : modelsClient.createModel,
		mutationKey: ['save', 'model'],
		onSuccess: () => {
			clearInputs()
			clearImages()
			setEditData(undefined)
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

	// Отправка формы
	const handleSubmit = (e, inputs, imageList, imageDeleteList) => {
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
		console.log(inputs, imageList)

		const formData = new FormData()
		formData.append('firstName', inputs.firstName)
		formData.append('height', inputs.height)
		formData.append('shoeSize', inputs.shoeSize)
		formData.append('gender', inputs.gender)
		formData.append('age', inputs.age)

		if (inputs.imageProfile instanceof File) {
			// Это объект File
			formData.append('imageProfile', inputs.imageProfile)
			console.log(inputs.imageProfile, 'file')
		} else if (
			typeof inputs.imageProfile === 'string' &&
			isValidURL(inputs.imageProfile)
		) {
			// Это строка URL
			formData.append('imageProfile', inputs.imageProfile)
			console.log('Это URL:', inputs.imageProfile)
		} else {
			console.log('Ни файл, ни URL')
		}

		// Функция проверки валидности URL
		function isValidURL(string) {
			try {
				const url1 = new URL(string)
				console.log(url1)
				return true
			} catch (_) {
				return false
			}
		}

		let imageListNoURL = imageList.filter(image => {
			if (image instanceof File) {
				return image
			}
		})
		imageListNoURL.forEach((image, index) => {
			if (image instanceof File) {
				formData.append(`images[${index}]`, image)
			}
		})

		formData.append('deleteImageIdArray', JSON.stringify(imageDeleteList))
		formData.append('imgCount', imageListNoURL.length)

		console.log(imageDeleteList)
		console.log(imageListNoURL)

		editData
			? createModelMutation.mutate({ data: formData, id: editData.id })
			: createModelMutation.mutate(formData)
	}

	return {
		handleSubmit,
		createModelMutation
	}
}

export default useUpdateModelForm
