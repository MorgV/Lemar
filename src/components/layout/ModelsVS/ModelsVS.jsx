import Layout from '../Layout'
import styles from './ModelsVS.module.scss'

function ModelsVS() {
	// const { isAuth } = useAuth()
	// const navigate = useNavigate()
	return (
		<Layout bgImage={'/images/home-bg.jpg'}>
			<div className={styles.wrapper}>
				<div className={styles.vs}>
					<a className={styles.boy}></a>
					<a className={styles.girl}></a>
				</div>
			</div>
		</Layout>
	)
}

export default ModelsVS
