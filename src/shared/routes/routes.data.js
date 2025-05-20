import Home from '../../components/screens/home/HomePage.jsx'
import Models from '../../components/screens/Models/Models.jsx'
import Auth from '../../components/screens/Auth/Auth.jsx'
import Admin from '../../components/screens/Admin/Admin.jsx'
import Model from '../../components/screens/Model/Model.jsx'
import {
	HOME_ROUTE,
	MODELS_ROUTE,
	AUTH_ROUTE,
	ADMIN_ROUTE
} from '../../utils/constans.js'

export const routes = [
	{
		path: HOME_ROUTE,
		component: Home,
		isAuth: false
	},
	{
		path: MODELS_ROUTE,
		component: Models,
		isAuth: false
	},
	{
		path: `${MODELS_ROUTE}/:category`,
		component: Models,
		isAuth: false
	},
	{
		path: `${MODELS_ROUTE}/:category/:id`,
		component: Model,
		isAuth: false
	},
	{
		path: AUTH_ROUTE,
		component: Auth,
		isAuth: false
	},
	{
		path: ADMIN_ROUTE,
		component: Admin,
		isAuth: false
	}
]
