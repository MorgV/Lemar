import Home from '../../components/screens/Home/Home'
import Models from '../../components/screens/Models/Models'
import Auth from '../../components/screens/Auth/Auth.jsx'
import Admin from '../../components/screens/Admin/Admin.jsx'
import Model from '../../components/screens/Model/Model.jsx'
import {
	HOME_ROUTE,
	MODELS_ROUTE,
	AUTH_ROUTE,
	ADMIN_ROUTE
} from '../../utils/constans'

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
		path: `${MODELS_ROUTE}:id`,
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
