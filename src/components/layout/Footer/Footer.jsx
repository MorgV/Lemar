import { useEffect, useState, useRef } from 'react'
import styles from './Footer.module.scss'
import { HOME_ROUTE } from '../../../utils/constans'
import { FaEnvelope, FaVk, FaWhatsapp } from 'react-icons/fa'
import useScrollTo from '../../../shared/hooks/useScrollTo'
import useWhatsApp from '../../../shared/hooks/useWhatsApp'
import { NavLink } from 'react-router-dom'

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

	useEffect(() => {
		if (isMapLoaded) {
			const script = document.createElement('script')
			script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
			script.async = true
			script.onload = () => {
				ymaps.ready(() => {
					const map = new ymaps.Map('map', {
						center: [56.109966, 40.355235],
						zoom: 17
					})

					const placemark = new ymaps.Placemark(
						[56.109966, 40.355235],
						{},
						{
							iconLayout: 'default#image',
							iconImageHref: '/images/logo.ico',
							iconImageSize: [32, 32],
							iconImageOffset: [-15, -42]
						}
					)

					// Устанавливаем контент для балуна
					placemark.properties.set(
						'balloonContent',
						'Lemar models<br>Владимир, ул Сперанского д.1'
					)

					// Настроим стили для балуна
					placemark.events.add('balloonopen', () => {
						const balloonContent = document.querySelector(
							'.ymaps-2-1-79-balloon__content'
						)
						if (balloonContent) {
							balloonContent.classList.add(styles.balloonContent) // Добавляем стили из SCSS
						}

						const closeButton = document.querySelector(
							'.ymaps-2-1-79-balloon__close-button'
						)
						if (closeButton) {
							closeButton.classList.add(styles.closeButton) // Добавляем стили из SCSS
						}
					})

					// Добавляем обработчики событий для открытия/закрытия балуна
					placemark.events.add('mouseenter', function () {
						placemark.balloon.open() // Открытие балуна при наведении
					})
					placemark.events.add('mouseleave', function () {
						placemark.balloon.close() // Закрытие балуна при уходе
					})

					// Добавляем маркер на карту
					map.geoObjects.add(placemark)
				})
			}
			document.body.appendChild(script)
		}
	}, [isMapLoaded])

	return (
		<div ref={mapRef} className={styles.mapContainer}>
			{isMapLoaded ? (
				<div id='map' className={styles.map}></div>
			) : (
				<p>Карта загружается...</p>
			)}
		</div>
	)
}

const Footer = () => {
	console.log('FooterRender')
	const message =
		'Добрый день! Меня заинтересовало обучение в Школе Моды и творчества Lemar'
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
				<NavLink className={styles.logoSection} to={HOME_ROUTE}></NavLink>
				<div className={styles.contacts}>
					<h3>Контакты</h3>
					<p>
						<NavLink to='tel:+79209079927'>+7 910 677-10-60</NavLink>
					</p>
					<p>
						<NavLink to='tel:+79209079927'>+7 920 907-99-27</NavLink>
					</p>
					<div className={styles.icons}>
						<NavLink
							to='mailto:Mariya-legotina@yandex.ru'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaEnvelope />
						</NavLink>
						<NavLink
							to='https://vk.com/lemar_models'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaVk />
						</NavLink>
						<NavLink onClick={openWhatsApp}>
							<FaWhatsapp />
						</NavLink>
					</div>
				</div>
				<nav className={styles.navLinks}>
					<h3>Навигация</h3>
					<NavLink onClick={ToModals}>База моделей</NavLink>
					<NavLink onClick={ToSignUp}>Записаться</NavLink>
					<NavLink onClick={ToOnas}>О нас</NavLink>
					<NavLink onClick={ToEmployees}>Преподаватели</NavLink>
					<NavLink onClick={ToPartners}>Партнерам</NavLink>
					<NavLink onClick={ToServices}>Наши услуги</NavLink>
				</nav>
			</div>
		</footer>
	)
}

export default Footer
