import { $axios } from '../api'
import Cookies from 'js-cookie'

class AuthService {
	async main(email, password, type) {
		try {
			const { data } = await $axios.post(`/users/${type}`, {
				email,
				password
			})

			if (data.token) Cookies.set('token', data.token)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default new AuthService()
