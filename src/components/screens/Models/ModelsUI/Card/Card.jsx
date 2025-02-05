import React, { useEffect, useState } from 'react'
import classNames from 'clsx'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import styles from './style.module.scss'
import { REACT_APP_API_URL } from '../../../../../utils/constans'

const Card = React.memo(
	({ data, delayInSeconds }) => {
		const { height, FI, age, imageProfile, id } = data
		const [isVisible, setIsVisible] = useState(false)

		useEffect(() => {
			const timeout = setTimeout(() => {
				setIsVisible(true)
			}, delayInSeconds * 1000)
			return () => clearTimeout(timeout)
		}, [delayInSeconds])

		return (
			<article
				className={classNames(styles.card, { [styles.visible]: isVisible })}
			>
				<a href={`${window.location.pathname}/${id}`} alt='Profile link'>
					<LazyLoadImage
						src={`${REACT_APP_API_URL}${imageProfile}`}
						alt='Profile'
						className={styles.img}
						effect='blur' // Эффект размытия при загрузке
					/>
					<div className={styles.info}>
						<p>{FI}</p>
						<p>Возраст: {age}</p>
						<p>Рост: {height} см</p>
					</div>
				</a>
			</article>
		)
	},
	(prevProps, nextProps) =>
		JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
)

export default Card
