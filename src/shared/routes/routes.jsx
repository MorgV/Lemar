import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { routes } from './routes.data'
import NotFound from '../../components/screens/NotFound/NotFound'
// import { useAuth } from '../hooks/useAuth'

const Router = () => {
	// const { isAuth } = useAuth()

	return (
		<BrowserRouter>
			<Routes>
				{routes.map(route => {
					// if (route.isAuth && !isAuth) {
					// 	return false
					// }
					console.log(route)
					return (
						<Route
							key={route.path}
							path={route.path}
							element={<route.component />}
						/>
					)
				})}
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
