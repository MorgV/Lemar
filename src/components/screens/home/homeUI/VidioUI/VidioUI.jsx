import styles from './VidioUI.module.scss'
import RequestButton from '../../../../UI/Button/Button'
import useWhatsApp from '../../../../../shared/hooks/useWhatsApp'

function VidioUI() {
	const openWhatsApp = useWhatsApp({
		message:
			'Добрый день! Меня заинтересовало обучение в Школе Моды и творчества Lemar'
	})

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
				<RequestButton text='Оставить заявку' onClick={openWhatsApp} />
			</div>
		</div>
	)
}

export default VidioUI
