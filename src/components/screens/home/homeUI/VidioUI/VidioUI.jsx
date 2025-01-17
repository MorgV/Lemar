import styles from './VidioUI.module.scss'

function VidioUI() {
	// const { isAuth } = useAuth()
	// const navigate = useNavigate()
	return (
		<div className={styles.home}>
			<video
				src='Lemar/video/vidio.mp4'
				playsInline
				muted
				autoPlay
				loop
				className={styles.home__video}
			></video>
			<div className={styles.home__requestForm}>
				<h2>Модельное агенство</h2>
				<h1>Lemar</h1>
				<h3>
					Модельная школа LEMAR приглашает мальчиков и <br />
					девочек от 3 до 15 лет на обучение
				</h3>
				<div className={styles.a}>
					<a href='https://taplink.cc/lemar_models'>Оставить заявку</a>
				</div>{' '}
			</div>
		</div>
	)
}

export default VidioUI
