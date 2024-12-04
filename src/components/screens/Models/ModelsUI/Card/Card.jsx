import starIcon from './star.svg';
import styles from './style.module.scss';

const Card = ({ data }) => {
	const {
		title,
		desc,
		rating,
		price_per_night,
		dates_available,
		img,
		img2x,
	} = data;

	return (
		<article className={styles.card}>
			<a href="#" className={styles.link}></a>
			<img
				src={data.img}
				srcSet={`${data.img2x} 2x`}
				alt={data.title}
				className={styles.img}
			/>

			<div className={styles.descWrapper}>
				<div className={styles.titleWrapper}>
					<h3 className={styles.title}>{title}</h3>
					<div className={styles.rating}>
						<img src={starIcon} alt="starIcon" />
						{data.rating}
					</div>
				</div>

				<p className={styles.desc}>{data.desc}</p>
				<p className={styles.date}>{data.dates_available}</p>

				<p className={styles.price}>
					<strong>${data.price_per_night}</strong> night
				</p>
			</div>
		</article>
	);
};

export default Card;
