import { useState } from 'react'
import './Header.scss'
import { RxHamburgerMenu } from 'react-icons/rx'
import { RxCross1 } from 'react-icons/rx'

const Header = () => {
	let [burgerState, setBurgerState] = useState(false)
	window.addEventListener('scroll', () => {
		const scrollPos = window.scrollY
		const headerObg = document.getElementById('header')

		if (scrollPos >= 1) {
			headerObg.classList.add('header_fixed')
		} else {
			headerObg.classList.remove('header_fixed')
		}
	})
	return (
		<header id='header' className='header'>
			<div className='container'>
				<div className='header__body'>
					<a href='' className='header__logo'></a>
					<div
						onClick={() => setBurgerState(!burgerState)}
						className={burgerState ? 'header__burger active' : 'header__burger'}
					>
						<span>
							{!burgerState ? (
								<RxHamburgerMenu size={'25px'} />
							) : (
								<RxCross1 size={'25px'} />
							)}
						</span>
					</div>
					<nav className={burgerState ? 'header__menu active' : 'header__menu'}>
						<ul className='header__list'>
							<li>
								<a href='' className='header__link'>
									База моделей
								</a>
							</li>
							<li>
								<a href='' className='header__link'>
									Записаться
								</a>
							</li>
							<li>
								<a href='' className='header__link'>
									О нас
								</a>
							</li>
							<li>
								<a href='' className='header__link'>
									Преподаватели
								</a>
							</li>
							<li>
								<a href='' className='header__link'>
									Партнерам
								</a>
							</li>
							<li>
								<a href='' className='header__link'>
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
