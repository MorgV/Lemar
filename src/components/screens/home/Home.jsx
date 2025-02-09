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
import { Helmet } from 'react-helmet-async'
function Home() {
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
		<>
			<Helmet>
				<title>Lemar-models</title>
				<meta
					name='description'
					content='Модельное агентство LEMAR: кастинги, фотосессии, обучение для моделей. Запишитесь на пробный урок и станьте профессиональной моделью! Школа моды Владимир. lemar-models'
				/>
			</Helmet>
			<Layout>
				<VidioUI />
				<Onas />
				<ServicesNew />
				<ModelsVS />
				<DetailedInformation />
				<Employees />
			</Layout>
		</>
	)
}

export default Home
