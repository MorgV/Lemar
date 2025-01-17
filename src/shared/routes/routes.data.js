import Home from '../../components/screens/Home/Home'
import Models from '../../components/screens/Models/Models'
import Auth from '../../components/screens/Auth/Auth.jsx'
import Admin from '../../components/screens/Admin/Admin.jsx'
import Model from '../../components/screens/Model/Model.jsx'

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
		path: '/models/:id',
		component: Model,
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
