// src/components/layout/Footer/Footer.jsx
import styles from './Footer.module.scss'
import { HOME_ROUTE } from '../../../utils/constans'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<a className={styles.logoSection} href={HOME_ROUTE}></a>

				<div className={styles.contacts}>
					<h3>Контакты</h3>
					<p>
						Email:{' '}
						<a href='mailto:Mariya-legotina@yandex.ru'>
							Mariya-legotina@yandex.ru
						</a>
					</p>
					<p>
						VK:{' '}
						<a
							href='https://vk.com/lemar_models'
							target='_blank'
							rel='noopener noreferrer'
						>
							lemar_models
						</a>
					</p>
					<p>
						Мария Леготина: <a href='tel:+79106771060'>+7 910 677-10-60</a>
					</p>
					<p>
						Марина Семина: <a href='tel:+79209079927'>+7 920 907-99-27</a>
					</p>
				</div>
				{/* Навигационные ссылки */}
				<nav className={styles.navLinks}>
					<h3>Навигация </h3>
					<a href='#models'>База моделей</a>
					<a href='#signup'>Записаться</a>
					<a href='#about'>О нас</a>
					<a href='#teachers'>Преподаватели</a>
					<a href='#partners'>Партнерам</a>
					<a href='#services'>Наши услуги</a>
				</nav>
			</div>
		</footer>
	)
}

export default Footer
