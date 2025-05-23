import { Box } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { EffectCoverflow, Navigation } from 'swiper/modules'
import CardPlan from './CardPlan/CardPlan'
import './ServicesNew.scss'
import TitleSubtitle from '../../../../UI/TitleSubtitle/TitleSubtitle'

const plans = [
	{
		name: 'Вместе с мамой',
		price: '14 000 ₽ / месяц',
		description:
			'Уникальный обучающий курс, созданный для того, чтобы сблизить маму и ребёнка через увлекательные совместные занятия. Наша программа рассчитана на 3 месяца и охватывает разнообразные темы, такие как макияж, психология, творчество и имидж. Мы проводим совместные мастер-классы в атмосфере творчества и вдохновения, где вы и ваш ребенок сможете создавать уникальные украшения и индивидуальные поделки. Каждые три месяца мы организуем специальные съемки в различных стилях, таких как Нежность, Фэшн и Гламур, с помощью профессиональных стилистов и визажистов. В процессе обучения вы получите не только новые навыки, но и возможность создать незабываемые воспоминания, ведь в конце курса вас ждет подарок — печать совместной фотографии на холсте. Присоединяйтесь к нам и откройте для себя мир творчества и совместного роста! Вместе с мамой — это не просто курс, это возможность укрепить вашу связь и создать что-то удивительное вместе.',
		icon: '/images/01.jpg'
	},
	{
		name: 'Школа модели',
		price: '6000 ₽ / месяц',
		description:
			'Обучение в нашей школе моды и творчества рассчитано на один год и предлагает уникальную программу, направленную на развитие креативности и уверенности у детей. В пакет входит 10 съемок и 2 показа мод, которые позволят вашим детям испытать себя на сцене и в мире моды. Каждая съемка предоставляет возможность детям проявить свои способности, а показы мод помогут обрести уверенность и опыт публичного выступления. Наша программа создана таким образом, чтобы гармонично сочетать обучение с практической деятельностью, что делает процесс увлекательным и продуктивным.',
		icon: '/images/01.jpg'
	},
	{
		name: 'Съёмка без границ',
		price: '4000 рублей за съемку',
		description:
			'Мы рады представить новый пакет, который позволяет детям просто приходить к нам на съемку! Это отличная возможность для ваших детей проявить свои таланты и получить ценный опыт в мире моды и творчества. Каждый визит обойдется всего в 4000 рублей за съемку. Этот пакет подходит для тех, кто хочет попробовать себя в модели без обязательного обучения, предоставляя шанс насладиться процессом фотосессий и развить уверенность на камеру.',
		icon: '/images/01.jpg'
	},
	{
		name: 'Premium Package',
		price: '25 000 ₽ / месяц',
		description:
			'Это эксклюзивный пакет, который предлагает все возможности для развития и роста. Включает в себя индивидуальные занятия с профессиональными тренерами, доступ в эксклюзивные зоны и многое другое. Этот пакет для тех, кто хочет получить максимальные результаты и погрузиться в мир моды на высшем уровне.',
		icon: '/images/01.jpg'
	}
]

const ServicesNew = () => {
	console.log('Services render')
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
				{plans.map((plan, index) => (
					<SwiperSlide key={index}>
						<CardPlan {...plan} />
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	)
}

export default ServicesNew
