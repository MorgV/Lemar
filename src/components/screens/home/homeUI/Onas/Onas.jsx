import styles from './Onas.module.scss'
import OnasCard from './OnasCard/OnasCard'
import { CARDS } from './OnasCard/constans'

const Onas = () => {
	console.log('Onas render')

	// TODO: Onas - Бизнес вынести логику cards
	// TODO: Оптимизировать рендер
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
