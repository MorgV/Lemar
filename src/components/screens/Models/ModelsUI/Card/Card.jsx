import starIcon from './star.svg'
import styles from './style.module.scss'
import boysPhoto from '../../../../../../public/images/boy.jpg'
import { REACT_APP_API_URL } from '../../../../../utils/constans'

const Card = ({ data }) => {
	const { height, shoeSize, gender, FI, age, imageProfile } = data
	console.log(imageProfile)
	return (
		<article className={styles.card}>
			<a href='#' className={styles.link}></a>
			<img
				src={''}
				srcSet={`${REACT_APP_API_URL}${imageProfile}`}
				alt={FI}
				className={styles.img}
			/>

			<div className={styles.descWrapper}>
				<div className={styles.titleWrapper}>
					<h3 className={styles.title}>{FI}</h3>
					<div className={styles.rating}>
						<img src={starIcon} alt='starIcon' />
						{gender}
					</div>
				</div>

				<p className={styles.desc}>{age}</p>
				<p className={styles.date}>{shoeSize}</p>

				<p className={styles.price}>
					<strong>${height}</strong> night
				</p>
			</div>
		</article>
	)
}

export default Card
