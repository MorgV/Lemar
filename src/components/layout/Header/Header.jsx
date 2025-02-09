import { useState } from 'react'
import './Header.scss'
import useScrollTo from '../../../shared/hooks/useScrollTo'

const Header = ({ rr }) => {
	const [burgerState, setBurgerState] = useState(false)

	// Хуки для плавного скроллинга
	const ToModals = useScrollTo('Modals')
	const ToSignUp = useScrollTo('SignUp')
	const ToOnas = useScrollTo('Onas')
	const ToEmployees = useScrollTo('Employees')
	const ToPartners = useScrollTo('Partners')
	const ToServices = useScrollTo('Services')

	// Обработчик для мобильного меню
	const heandlerSwapBurger = () => {
		document.body.style.overflow = burgerState ? '' : 'hidden'
		setBurgerState(!burgerState)
	}

	// Функция для закрытия меню при клике на ссылку
	const closeBurgerMenu = () => {
		if (burgerState) {
			setBurgerState(false) // Закрыть меню
			document.body.style.overflow = '' // Восстановить прокрутку
		}
	}

	// Скролл, когда страница прокручена вниз
	if (rr === undefined) {
		window.addEventListener('scroll', () => {
			const scrollPos = window.scrollY
			const headerObg = document.getElementById('header')

			if (scrollPos >= 350 && rr === false) {
				headerObg.classList.add('header_fixed')
			} else {
				headerObg.classList.remove('header_fixed')
			}
		})
	}

	return (
		<header id='header' className='header'>
			<div className='container'>
				<div className='header__body'>
					<a href='/' className='header__logo'></a>
					<label className='hamburger'>
						<input type='checkbox' onChange={() => heandlerSwapBurger()} />
						<svg viewBox='0 0 32 32'>
							<path
								className='line line-top-bottom'
								d='M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22'
							></path>
							<path className='line' d='M7 16 27 16'></path>
						</svg>
					</label>
					<nav className={burgerState ? 'header__menu active' : 'header__menu'}>
						<ul className='header__list'>
							<li>
								<a
									onClick={e => {
										e.preventDefault()
										ToModals()
										closeBurgerMenu() // Закрыть меню
									}}
									className='header__link'
								>
									База моделей
								</a>
							</li>
							<li>
								<a
									onClick={e => {
										e.preventDefault()
										ToSignUp()
										closeBurgerMenu() // Закрыть меню
									}}
									className='header__link'
								>
									Записаться
								</a>
							</li>
							<li>
								<a
									onClick={e => {
										e.preventDefault()
										ToOnas()
										closeBurgerMenu() // Закрыть меню
									}}
									className='header__link'
								>
									О нас
								</a>
							</li>
							<li>
								<a
									onClick={e => {
										e.preventDefault()
										ToEmployees()
										closeBurgerMenu() // Закрыть меню
									}}
									className='header__link'
								>
									Преподаватели
								</a>
							</li>
							<li>
								<a
									onClick={e => {
										e.preventDefault()
										ToPartners()
										closeBurgerMenu() // Закрыть меню
									}}
									className='header__link'
								>
									Партнерам
								</a>
							</li>
							<li>
								<a
									onClick={e => {
										e.preventDefault()
										ToServices()
										closeBurgerMenu() // Закрыть меню
									}}
									className='header__link'
								>
									Наши услуги
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header
