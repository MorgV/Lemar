import starIcon from './star.svg'
import styles from './style.module.scss'
import boysPhoto from '../../../../../../public/images/boy.jpg'

const Card = ({ data }) => {
	const { height, shoeSize, gender, FI, age } = data
	return (
		<article className={styles.card}>
			<a href='#' className={styles.link}></a>
			<img
				src={
					'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmimigram.ru%2Fblog%2Fchto-takoe-foto-tekhnologiya-ili-iskusstvo%2F&psig=AOvVaw26qOZz3vTC5dWXu2yf7zUy&ust=1734470998276000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOCBrY-erYoDFQAAAAAdAAAAABAJ'
				}
				srcSet={boysPhoto}
				alt={FI}
				className={styles.img}
			/>

			<div className={styles.descWrapper}>
				<div className={styles.titleWrapper}>
					<h3 className={styles.title}>{FI}</h3>
					<div className={styles.rating}>
						<img src={starIcon} alt='starIcon' />
						{gender[0]}
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
