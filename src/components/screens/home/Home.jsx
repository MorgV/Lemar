import Layout from '../../layout/Layout'
import ModelsVS from './homeUI/ModelsVS/ModelsVS'
import Onas from './homeUI/Onas/Onas'
import VidioUI from './homeUI/VidioUI/VidioUI'
// import Services from './homeUI/Services/Services'
import ServicesNew from './homeUI/ServicesNew/ServicesNew'
import Employees from './homeUI/Employees/Employees'
import DetailedInformation from './homeUI/DetailedInformation/DetailedInformation'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Home() {
	// const { isAuth } = useAuth()
	// const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (location.state?.scrollToId) {
			const element = document.getElementById(location.state.scrollToId)
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' })
			}
		}
	}, [location])
	return (
		<Layout>
			<VidioUI />
			<Onas />
			<ServicesNew />
			<ModelsVS />
			<DetailedInformation />
			<Employees />
		</Layout>
	)
}

export default Home
