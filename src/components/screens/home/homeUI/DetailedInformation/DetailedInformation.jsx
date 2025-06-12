import TitleSubtitle from '../../../../UI/TitleSubtitle/TitleSubtitle'
import { useRef } from 'react'
import './DetailedInformation.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import Button from '../../../../UI/Button/Button'
import useWhatsApp from '../../../../../shared/hooks/useWhatsApp'
import { SLIDES } from './consts'

const DetailedInformation = () => {
	const swiperRef = useRef(null)
	const openWhatsApp = useWhatsApp({
		message:
			'Добрый день! Меня заинтересовала услуга: Детские модели для коммерческих съемок'
	})

	const handleNextSlide = () => {
		if (swiperRef.current) {
			swiperRef.current.swiper.slideNext()
		}
	}

	const handlePrevSlide = () => {
		if (swiperRef.current) {
			swiperRef.current.swiper.slidePrev()
		}
	}

	return (
		<div id='Partners' className='wrapper'>
			<TitleSubtitle titleText='Партнерам' className='titleOverlay' />
			<div className='containerDetailedInformation'>
				<video autoPlay loop muted className='backgroundVideo'>
					<source src='/video/vidio.mp4' type='video/mp4' />
				</video>

				<div className='contentOverlay'>
					<h2 className='titleService'>Дети модели для коммерческих съемок</h2>
					<Swiper
						className='textSlider'
						modules={[Navigation]}
						navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
						loop
						ref={swiperRef}
					>
						{SLIDES.map((slide, index) => (
							<SwiperSlide key={index} className='slide'>
								<p>{slide}</p>
							</SwiperSlide>
						))}
					</Swiper>
					<div className='nav-panel'>
						<button className='custom-prev' onClick={handlePrevSlide}>
							<FaArrowLeft className='prev' />
						</button>
						<div>
							<Button text='Оставить заявку' onClick={openWhatsApp} />
						</div>
						<button className='custom-next' onClick={handleNextSlide}>
							<FaArrowRight className='next' />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DetailedInformation
