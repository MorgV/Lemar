import Layout from '../Layout'
import styles from './ModelsVS.module.scss'

function ModelsVS() {
	// const { isAuth } = useAuth()
	// const navigate = useNavigate()
	return (
		<Layout bgImage={'/images/home-bg.jpg'}>
			<div className={styles.wrapper}>
				<div className={styles.vs}>
					<a className={styles.boy}>
						<h1>Boys</h1>
					</a>
					<a className={styles.girl}>
						<h1>Girls</h1>
					</a>
				</div>
			</div>
		</Layout>
	)
}

export default ModelsVS
