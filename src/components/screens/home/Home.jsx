import Layout from '../../layout/Layout'
import styles from './Home.module.scss'
import Header from '../../layout/Header/Header'
import ModelsVS from '../../layout/ModelsVS/ModelsVS'
import Onas from '../../layout/Onas/Onas'
import Footer from '../../layout/Footer/Footer'
function Home() {
	// const { isAuth } = useAuth()
	// const navigate = useNavigate()

	return (
		<Layout>
			<Header />
			<div className={styles.home}>
				<video
					src='/video/vidio.MOV'
					playsInline
					muted
					autoPlay
					loop
					className={styles.home__video}
				></video>
				<div className={styles.home__requestForm}>
					<h2>Модельное агенство</h2>
					<h1>Lemar</h1>
					<h3>
						Модельная школа LEMAR приглашает мальчиков и <br />
						девочек от 3 до 15 лет на обучение
					</h3>
					<div className={styles.a}>
						<a href='https://taplink.cc/lemar_models'>Оставить заявку</a>
					</div>{' '}
				</div>
			</div>
			<Onas />
			<ModelsVS />
			<Footer />
		</Layout>
	)
}

export default Home
