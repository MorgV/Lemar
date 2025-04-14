import React, { useState } from 'react'
import styles from './style.module.scss'
import { REACT_APP_API_URL } from '../../../../../utils/constans'

const Card = React.memo(
	({ data }) => {
		const { height, FI, age, imageProfile, id } = data
		const [imageLoaded, setImageLoaded] = useState(false)

		return (
			<article className={styles.card}>
				<a href={`${window.location.pathname}/${id}`} alt='Profile link'>
					<div className={styles.imageWrapper}>
						{/* Показываем лоадер, пока изображение не загрузилось */}
						{!imageLoaded && (
							<div className={styles.loader}>
								{/* Тут можно добавить лоадер, если нужно */}
							</div>
						)}

						{/* Обычное изображение */}
						<img
							src={`${REACT_APP_API_URL}${imageProfile}`}
							alt='Profile'
							className={styles.img}
							onLoad={() => setImageLoaded(true)} // Событие на загрузку
							style={{
								opacity: imageLoaded ? 1 : 0, // Применяем плавное появление
								transition: 'opacity 0.3s ease-in-out'
							}}
						/>
					</div>
					{imageLoaded && (
						<div className={styles.info}>
							<p>{FI}</p>
							<p>Возраст: {age}</p>
							<p>Рост: {height} см</p>
						</div>
					)}
				</a>
			</article>
		)
	},
	(prevProps, nextProps) =>
		JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
)

export default Card
