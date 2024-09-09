import Home from '../components/screens/home/Home'
import Profile from '../components/screens/Profile/Profile'
import NewWorkout from '../components/screens/NewWorkout/NewWorkout'
import Auth from '../components/screens/Auth/Auth'

export const routes = [
	{
		path: '/',
		component: Home,
		isAuth: false
	},
	{
		path: '/auth',
		component: Auth,
		isAuth: false
	},
	{
		path: '/new-workout',
		component: NewWorkout,
		isAuth: true
	},
	{
		path: '/profile',
		component: Profile,
		isAuth: false
	}
]
