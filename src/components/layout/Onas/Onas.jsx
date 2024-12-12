import { useRef } from 'react'
import Layout from '../Layout'
import styles from './Onas.module.scss'
import { motion, useInView } from 'motion/react'
import Motion from '../../UI/motion/Motion'

const Onas = () => {
	// const { isAuth } = useAuth()
	// const navigate = useNavigate()
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true })
	return (
		<Layout bgImage={'/images/home-bg.jpg'}>
			<div className={styles.wrapper}>
				<h1>О нас</h1>
				<div className={styles.wrapper__list}>
					<Motion blockType={'p'} isInView={isInView}>
						Наша модельная школа для детей от 3 до 15 лет уникальна в своём
						подходе к раскрытию талантов через творчество. Мы верим, что каждый
						ребёнок обладает безграничным потенциалом, и наша многогранная
						методика обучения становится надёжной базой для их развития.
						<span ref={ref} />
					</Motion>
					<Motion blockType={'p'} isInView={isInView}>
						В отличие от других школ, где программа обучения длится только год,
						мы предлагаем пятилетнюю программу, которая позволяет глубже освоить
						навыки моделирования и самопрезентации. Каждый урок построен так,
						чтобы вдохновлять детей, развивать их креативность и уверенность.
					</Motion>
					<Motion blockType={'p'} isInView={isInView}>
						Кроме того, в процессе обучения ваши дети получат возможность
						путешествовать по интересным локациям и участвовать в коммерческих
						съёмках, начиная зарабатывать свои первые деньги. Мы растим будущих
						гениев, готовых сиять на сцене и уверенно шагать по жизни!
						Присоединяйтесь к нам и дайте вашему ребёнку возможность раскрыть
						свои таланты в полной мере!
					</Motion>
				</div>
			</div>
		</Layout>
	)
}

export default Onas
