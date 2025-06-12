import { Box } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { EffectCoverflow, Navigation } from 'swiper/modules'
import CardPlan from './CardPlan/CardPlan'
import './ServicesNew.scss'
import TitleSubtitle from '../../../../UI/TitleSubtitle/TitleSubtitle'
import { PLANS } from './constans'

const ServicesNew = () => {
	return (
		<Box id='Services' className='servicesContainer'>
			{/* Заголовок, который анимируется при появлении на экране */}
			<TitleSubtitle
				titleText='Наши услуги'
				subtitleText='Откройте для вашего ребенка двери в мир моды и творчества...'
			/>
			{/* Свайпер с карточками */}
			<Swiper
				modules={[EffectCoverflow, Navigation]}
				spaceBetween={10}
				slidesPerView={3}
				loop={true}
				breakpoints={{
					310: { slidesPerView: 1 },
					713: { slidesPerView: 2 },
					1064: { slidesPerView: 3 }
				}}
				navigation
			>
				{PLANS.map((plan, index) => (
					<SwiperSlide key={index}>
						<CardPlan {...plan} />
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	)
}

export default ServicesNew
