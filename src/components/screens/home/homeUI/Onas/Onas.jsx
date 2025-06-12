import styles from './Onas.module.scss'
import OnasCard from './OnasCard/OnasCard'
import { CARDS } from './OnasCard/constans'

const Onas = () => {
	return (
		<div className={styles.wrapper}>
			<div id='Onas' className={styles.wrapper__list}>
				{CARDS.map(card => {
					return <OnasCard key={card.dataNumber} {...card} />
				})}
			</div>
		</div>
	)
}

export default Onas
