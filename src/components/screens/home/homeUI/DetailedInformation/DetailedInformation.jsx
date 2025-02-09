import TitleSubtitle from '../../../../UI/TitleSubtitle/TitleSubtitle'
import { useState, useRef } from 'react'
import './DetailedInformation.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa' // Import left arrow icon
import Button from '../../../../UI/Button/Button'
import useWhatsApp from '../../../../../shared/hooks/useWhatsApp'

const DetailedInformation = () => {
	const swiperRef = useRef(null) // Reference to Swiper for slide control
	const openWhatsApp = useWhatsApp({
		message:
			'Добрый день! Меня заинтересовала услуга: Детские модели для коммерческих съемок'
	})
	const slides = [
		'Наша модельная школа предлагает уникальную возможность для заказчиков найти талантливых и уверенных детей моделей в возрасте от 3 до 15 лет.',
		'Мы предоставляем полный спектр услуг по подбору моделей для различных коммерческих проектов, включая рекламные кампании, фотосессии, показы и ивенты.',
		'Наши дети обучены не только позировать перед камерой, но и чувствовать себя комфортно на площадке, что позволяет создавать качественный и выразительный контент.',
		'Вы можете быть уверены, что наши модели отлично справятся с любыми задачами, демонстрируя свою уникальность и харизму.',
		'Мы активно сотрудничаем с брендами, рекламными агентствами и продюсерами, предоставляя модели, соответствующие всем требованиям и концепциям ваших проектов.',
		'С нами вы получите надежных и профессиональных партнеров для реализации ваших идей. Свяжитесь с нами, чтобы обсудить детали и получить доступ к нашим талантливым детям моделям!'
	]

	// Function to go to the next slide
	const handleNextSlide = () => {
		if (swiperRef.current) {
			swiperRef.current.swiper.slideNext() // Go to next slide
		}
	}

	// Function to go to the previous slide
	const handlePrevSlide = () => {
		if (swiperRef.current) {
			swiperRef.current.swiper.slidePrev() // Go to previous slide
		}
	}

	return (
		<div id='Partners' className='wrapper'>
			<TitleSubtitle titleText='Партнерам' className='titleOverlay' />

			<div className='containerDetailedInformation'>
				<h2 className='titleService'>
					Услуга: Детские модели для коммерческих съемок
				</h2>
				<video autoPlay loop muted className='backgroundVideo'>
					<source src='/video/vidio.mp4' type='video/mp4' />
				</video>
				<div className='contentOverlay'>
					<Swiper
						className='textSlider'
						modules={[Navigation]}
						navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
						loop
						ref={swiperRef} // Reference to Swiper for control
					>
						{slides.map((slide, index) => (
							<SwiperSlide key={index} className='slide'>
								<p>{slide}</p>
							</SwiperSlide>
						))}
					</Swiper>
					<button className='custom-prev' onClick={handlePrevSlide}>
						<FaArrowLeft className='prev' />
					</button>
					<Button text='Оставить заявку' onClick={openWhatsApp} />
					<button className='custom-next' onClick={handleNextSlide}>
						<FaArrowRight className='next' />
					</button>
				</div>
			</div>
		</div>
	)
}

export default DetailedInformation
