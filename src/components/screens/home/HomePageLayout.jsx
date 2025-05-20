import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import Layout from '../../layout/Layout'

export const HomePageLayout = ({
	VidioUI,
	Onas,
	ServicesNew,
	ModelsVS,
	DetailedInformation,
	Employees
}) => {
	const location = useLocation()
	console.log('render HOME layout')

	// TODO: HomeLayout - Бизнес вынести scroll

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
			{VidioUI}
			<Layout>
				{Onas}
				{ServicesNew}
				{ModelsVS}
				{DetailedInformation}
				{Employees}
			</Layout>
		</>
	)
}
