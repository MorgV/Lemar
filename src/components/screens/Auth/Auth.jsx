import Layout from '../../layout/Layout'
import { useForm } from 'react-hook-form'
import Button from '../../UI/button/Button'
import Field from '../../UI/field/Field'
import Loader from '../../UI/Loader'
import styles from './Auth.module.scss'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import authService from '../../../services/auth.service'

const isLoadingAuth = true

const Auth = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		mode: 'onChange'
	})
	const [type, setType] = useState('auth')

	const { mutate, isLoading } = useMutation((email, password) =>
		authService.main(email, password, type)
	)

	const onSubmit = data => {
		mutate(data.email, data.password)
	}

	return (
		<>
			<Layout heading='Sign in' />
			<div className='wrapper-inner-page'>
				{(isLoading || isLoadingAuth) && <Loader />}
				<form onSubmit={handleSubmit(onSubmit)}>
					<Field
						error={errors.email?.message}
						name='email'
						register={register}
						options={{
							required: 'Email is required'
						}}
						type='text'
						placeholder='Enter email'
					/>
					<Field
						error={errors.password?.message}
						name='password'
						register={register}
						options={{
							required: 'Password is required'
						}}
						type='password'
						placeholder='Enter password'
					/>
					<div className={styles.wrapperButtons}>
						<Button clickHandler={() => setType('auth')}>Sign in</Button>
						<Button clickHandler={() => setType('auth')}>Sign up</Button>
					</div>
				</form>
			</div>
		</>
	)
}

export default Auth
