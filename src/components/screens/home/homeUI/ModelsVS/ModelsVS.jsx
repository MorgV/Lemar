import TitleSubtitle from '../../../../UI/TitleSubtitle/TitleSubtitle'
import styles from './ModelsVS.module.scss'

function ModelsVS() {
	// const { isAuth } = useAuth()
	return (
		<div id='Modals' className={styles.wrapper}>
			<TitleSubtitle titleText='Наши модели' />
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
