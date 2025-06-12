import { Helmet } from 'react-helmet-async'
import Layout from '../../layout/Layout'

export const HomePageLayout = ({
	VidioUI,
	Onas,
	ServicesNew,
	ModelsVS,
	DetailedInformation,
	Employees
}) => {
	console.log('render HOME layout')
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
