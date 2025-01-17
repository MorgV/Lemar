import Home from '../../components/screens/Home/Home'
import Models from '../../components/screens/Models/Models'
import Auth from '../../components/screens/Auth/Auth.jsx'
import Admin from '../../components/screens/Admin/Admin.jsx'

export const routes = [
	{
		path: '/',
		component: Home,
		isAuth: false
	},
	{
		path: '/models',
		component: Models,
		isAuth: false
	},
	{
		path: '/auth',
		component: Auth,
		isAuth: false
	},
	{
		path: '/admin',
		component: Admin,
		isAuth: false
	}
]
