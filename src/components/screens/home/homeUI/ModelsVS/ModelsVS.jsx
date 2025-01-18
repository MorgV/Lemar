import styles from './ModelsVS.module.scss'

function ModelsVS() {
	// const { isAuth } = useAuth()
	return (
		<div className={styles.wrapper}>
			<div className={styles.vs}>
				<a href='/models' className={styles.boy}>
					<h1>Boys</h1>
				</a>
				<a href='/models' className={styles.girl}>
					<h1>Girls</h1>
				</a>
			</div>
		</div>
	)
}

export default ModelsVS
