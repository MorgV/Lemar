import { useNavigate } from 'react-router-dom'
import Layout from '../../layout/Layout'
import './Auth.scss'
import { useForm } from 'react-hook-form'
// import { useState } from 'react'
import { ADMIN_ROUTE } from '@/utils/constans'
const Auth = () => {
	// const [isLoginAuth, setIsLoginAuth] = useState(false)
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const onSubmit = data => {
		console.log('Form Data: ', data)
		// setIsLoginAuth(true)
		navigate(ADMIN_ROUTE)
		// alert('Форма отправлена!')
	}

	return (
		<Layout>
			<div className='form-container'>
				<form onSubmit={handleSubmit(onSubmit)} className='form'>
					{/* Поле для email */}
					<div className='form-group'>
						<label htmlFor='email'>Email:</label>
						<input
							id='email'
							type='email'
							placeholder='Введите ваш email'
							{...register('email', {
								required: 'Email обязателен',
								pattern: {
									value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
									message: 'Некорректный email'
								}
							})}
							className={errors.email ? 'input-error' : ''}
						/>
						{errors.email && (
							<p className='error-message'>{errors.email.message}</p>
						)}
					</div>

					{/* Поле для пароля */}
					<div className='form-group'>
						<label htmlFor='password'>Пароль:</label>
						<input
							id='password'
							type='password'
							placeholder='Введите пароль'
							{...register('password', {
								required: 'Пароль обязателен',
								minLength: {
									value: 6,
									message: 'Пароль должен содержать минимум 6 символов'
								}
							})}
							className={errors.password ? 'input-error' : ''}
						/>
						{errors.password && (
							<p className='error-message'>{errors.password.message}</p>
						)}
					</div>

					{/* Кнопка отправки */}
					<button type='submit' className='submit-button'>
						Отправить
					</button>
				</form>
			</div>
		</Layout>
	)
}

export default Auth
