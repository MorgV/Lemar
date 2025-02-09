import { useEffect, useState, useRef } from 'react'
import styles from './Footer.module.scss'
import { HOME_ROUTE } from '../../../utils/constans'
import { FaEnvelope, FaVk, FaWhatsapp } from 'react-icons/fa'
// import useWhatsApp from '../../../shared/hooks/useWhatsApp'
import useScrollTo from '../../../shared/hooks/useScrollTo'
import useWhatsApp from '../../../shared/hooks/useWhatsApp'
const LazyMap = () => {
	const [isMapLoaded, setIsMapLoaded] = useState(false)
	const mapRef = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) {
					setIsMapLoaded(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.1 }
		)

		if (mapRef.current) {
			observer.observe(mapRef.current)
		}

		return () => observer.disconnect()
	}, [])

	return (
		<div ref={mapRef} className={styles.mapContainer}>
			{isMapLoaded ? (
				<iframe
					className={styles.map}
					src='https://yandex.ru/map-widget/v1/?um=constructor%3A4e3f3f6d2781b100013ec1d7b1ffb83c4283fa4fe2f432a73b6c36b1909078be&amp;source=constructor'
					width='100%'
					height='300px'
					frameBorder='0'
					allowFullScreen
				></iframe>
			) : (
				<div className={styles.mapPlaceholder}>
					<img src='/images/map-placeholder.jpg' alt='Карта' />
					<p>Карта загружается...</p>
				</div>
			)}
		</div>
	)
}

const Footer = () => {
	const message = 'Здравствуйте, хочу записаться!'
	const openWhatsApp = useWhatsApp({ message })

	const ToSignUp = useScrollTo('SignUp')
	const ToOnas = useScrollTo('Onas')
	const ToModals = useScrollTo('Modals')
	const ToEmployees = useScrollTo('Employees')
	const ToPartners = useScrollTo('Partners')
	const ToServices = useScrollTo('Services')

	return (
		<footer className={styles.footer}>
			<LazyMap />
			<div className={styles.container}>
				<a className={styles.logoSection} href={HOME_ROUTE}></a>
				<div className={styles.contacts}>
					<h3>Контакты</h3>
					<p>
						<a href='tel:+79209079927'>+7 910 677-10-60</a>
					</p>
					<p>
						<a href='tel:+79209079927'>+7 920 907-99-27</a>
					</p>
					<div className={styles.icons}>
						<a
							href='mailto:Mariya-legotina@yandex.ru?subject=Вопрос&body=Здравствуйте,'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaEnvelope />
						</a>
						<a
							href='https://vk.com/lemar_models'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaVk />
						</a>
						<a onClick={openWhatsApp}>
							<FaWhatsapp />
						</a>
					</div>
				</div>
				<nav className={styles.navLinks}>
					<h3>Навигация</h3>
					<a onClick={ToModals}>База моделей</a>
					<a
						onClick={e => {
							e.preventDefault
							ToSignUp()
						}}
					>
						Записаться
					</a>
					<a
						onClick={e => {
							e.preventDefault
							ToOnas()
						}}
					>
						О нас
					</a>
					<a
						onClick={e => {
							e.preventDefault
							ToEmployees()
						}}
					>
						Преподаватели
					</a>
					<a
						onClick={e => {
							e.preventDefault
							ToPartners()
						}}
					>
						Партнерам
					</a>
					<a
						onClick={e => {
							e.preventDefault
							ToServices()
						}}
					>
						Наши услуги
					</a>
				</nav>
			</div>
		</footer>
	)
}

export default Footer
