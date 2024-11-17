import Home from '../components/screens/Home/Home'
import Models from '../components/screens/Models/Models'

export const routes = [
	{
		path: '/',
		component: Home,
		isAuth: false
	},
	{
		path: '/Lemar',
		component: Home,
		isAuth: false
	},
	{
		path: 'Lemar/models',
		component: Models,
		isAuth: false
	}
]
