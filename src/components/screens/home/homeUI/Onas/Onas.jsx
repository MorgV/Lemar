import { useRef } from 'react'
import Layout from '../../../../layout/Layout'
import styles from './Onas.module.scss'
import OnasCard from './OnasCard/OnasCard'
import useIntersectionObserver from '../../../../../shared/hooks/useIntersectionObserver'

const Onas = () => {
	const cards = [
		{
			dataNumber: '01',
			text: `
                Наша школа — это уникальное место, где каждый ребенок может раскрыть свой потенциал, 
                стать уверенным в себе и научиться смело выражать свои мысли. Мы понимаем, как важно 
                для детей чувствовать себя свободными и раскрепощенными, поэтому наша программа 
                обучения ориентирована на развитие личных качеств и навыков.`,
			img: '/images/01.jpg',
			articleSubtitle: 'get started',
			articleTitle:
				'Добро пожаловать в нашу Модельную школу для детей от 3 до 15 лет!'
		},
		{
			dataNumber: '02',
			text: `
                Обучение проходит по воскресеньям. Каждый урок длится 40 минут, что позволяет комфортно усваивать материал. Всего занятия занимают 1,5 часа в неделю.`,
			img: '/images/02.jpg',
			articleSubtitle: 'time for learning',
			articleTitle: 'Обучение в нашей школе проходит в удобное время',
			textPositionRight: true
		},
		{
			dataNumber: '03',
			text: `
                Мы гордимся тем, что наши дети начинают зарабатывать свои первые деньги на коммерческих съемках и участвуют в модных показах.`,
			img: '/images/03.jpg',
			articleSubtitle: "let's travel",
			articleTitle: 'Мы гордимся...'
		},
		{
			dataNumber: '04',
			text: `
                Лучшее обучение иллюстрирует Фэшн Мастерская — это яркий кейс, показывающий, как мы помогаем детям осуществлять их мечты.`,
			img: '/images/04.jpg',
			articleSubtitle: "let's dream",
			articleTitle: 'Фэшн Мастерская',
			textPositionRight: true
		}
	]

	// Создайте массив ссылок и состояний видимости
	const refs = cards.map(() => useRef(null))
	const visibilityStates = refs.map(ref =>
		useIntersectionObserver({ threshold: 0.5, target: ref })
	)

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapper__list}>
				{cards.map((card, index) => {
					const isVisible = visibilityStates[index]
					return (
						<OnasCard
							key={card.dataNumber}
							{...card}
							ref={refs[index]}
							isVisible={isVisible}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Onas
