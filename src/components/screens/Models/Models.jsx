import Layout from '../../layout/Layout'
// import styles from './Models.module.scss';
import Card from './ModelsUI/Card/Card'
import cardsData from '../../../data/data.json'

function Models() {
	// const { isAuth } = useAuth()
	// const navigate = useNavigate()
	return (
		<Layout>
			<main className='main'>
				<div className='container'>
					<div className='main__cards'>
						{cardsData.map((item, index) => {
							return <Card data={item} key={index} />
						})}
					</div>
				</div>
			</main>
		</Layout>
	)
}

export default Models
