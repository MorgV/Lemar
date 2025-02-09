import styles from './VidioUI.module.scss'
import RequestButton from '../../../../UI/Button/Button'

function VidioUI() {
	return (
		<div id='SignUp' className={styles.home}>
			<video
				src='/video/vidio.mp4'
				playsInline
				muted
				autoPlay
				loop
				className={styles.home__video}
			></video>
			<div className={styles.home__requestForm}>
				<h2>Школа Моды и творчества</h2>
				<h1>Lemar</h1>
				<h3>Приглашает мальчиков и девочек от 3 до 15 лет на обучение</h3>
				<RequestButton
					link='https://taplink.cc/lemar_models'
					text='Оставить заявку'
				/>
			</div>
		</div>
	)
}

export default VidioUI
