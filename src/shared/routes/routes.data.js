import Home from '../../components/screens/Home/Home'
import Models from '../../components/screens/Models/Models'
import Auth from '../../components/screens/Auth/Auth.jsx'
import Admin from '../../components/screens/Admin/Admin.jsx'

export const routes = [
	{
		path: '/Lemar',
		component: Home,
		isAuth: false
	},
	{
		path: '/Lemar/models',
		component: Models,
		isAuth: false
	},
	{
		path: '/Lemar/auth',
		component: Auth,
		isAuth: false
	},
	{
		path: '/Lemar/admin',
		component: Admin,
		isAuth: false
	}
]
