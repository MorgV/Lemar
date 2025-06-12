import { NavLink } from 'react-router-dom'
import TitleSubtitle from '../../../../UI/TitleSubtitle/TitleSubtitle'
import styles from './ModelsVS.module.scss'

function ModelsVS() {
	return (
		<div id='Modals' className={styles.wrapper}>
			<TitleSubtitle titleText='Наши модели' />
			<div className={styles.vs}>
				<NavLink to='/models/male' className={styles.boy}>
					<h1>Boys</h1>
				</NavLink>
				<NavLink to='/models/female' className={styles.girl}>
					<h1>Girls</h1>
				</NavLink>
			</div>
		</div>
	)
}

export default ModelsVS
