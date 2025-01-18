import { useState, useEffect } from 'react'
import './Corusel.scss' // Подключение глобального SCSS
import { M_NUMBER } from '../../../../../../utils/constans'

const Carousel = ({ items }) => {
	const [active, setActive] = useState(1)
	const countItem = items.length

	const next = () => {
		setActive(prevActive => (prevActive + 1) % countItem)
	}

	const prev = () => {
		setActive(prevActive => (prevActive - 1 + countItem) % countItem)
	}

	useEffect(() => {
		// Таймер автопрокрутки
		const autoPlay = setInterval(() => {
			next()
		}, 9000)

		// Обновление переменной высоты окна
		const updateVh = () => {
			const vh = window.innerHeight // Получаем высоту окна
			document.documentElement.style.setProperty('--window-height', `${vh}px`)
		}

		updateVh() // Устанавливаем высоту при загрузке
		window.addEventListener('resize', updateVh) // Обновляем высоту при изменении размера окна

		// Очистка ресурсов
		return () => {
			clearInterval(autoPlay) // Останавливаем автопрокрутку
			window.removeEventListener('resize', updateVh) // Удаляем обработчик изменения высоты
		}
	}, [active, next])

	const getClassName = index => {
		if (index === active) return 'active'
		if (index === (active - 1 + countItem) % countItem) return 'other_1'
		if (index === (active + 1) % countItem) return 'other_2'
		return ''
	}

	const handleClick = item => {
		const phoneNumber = M_NUMBER // Номер телефона в международном формате
		const message = `Здравствуйте, я хочу купить услугу! Меня интересует ${item?.title}, ${item?.price}` // Ваше сообщение
		const isMobile =
			/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
				navigator.userAgent
			)

		// URL для WhatsApp Web или мобильной версии
		const whatsappUrl = isMobile
			? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
			: `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
					message
			  )}`

		// Открытие WhatsApp
		window.open(whatsappUrl, '_blank')
	}
	return (
		<main>
			<section className='carousel'>
				<div className='list'>
					{items?.map((item, index) => (
						<article key={item.id} className={`item ${getClassName(index)}`}>
							<div
								className='main-content'
								style={{ backgroundColor: item.backgroundColor }}
							>
								<div className='content'>
									<h2>{item.title}</h2>
									<p className='price'>{item.price}</p>
									<p className='description'>{item.description}</p>
									<button
										onClick={() => handleClick(item)}
										className='addToCard'
									>
										Купить
									</button>
								</div>
							</div>
							<figure className='image'>
								<img src={item.image} alt={item.title} />
								<figcaption>{item.title}</figcaption>
							</figure>
						</article>
					))}
				</div>
				<div className='arrows'>
					<button onClick={prev}>&lt;</button>
					<button onClick={next}>&gt;</button>
				</div>
			</section>
		</main>
	)
}

export default Carousel
