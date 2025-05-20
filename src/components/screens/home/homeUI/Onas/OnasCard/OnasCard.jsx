/* eslint-disable react/display-name */
import { useRef } from 'react'
import classNames from 'clsx'
import './OnasCard.scss'
import useIntersectionObserver from '../../../../../../shared/hooks/useIntersectionObserver'

const OnasCard = ({
	text,
	img,
	dataNumber,
	articleSubtitle = 'get started',
	articleTitle = 'Title',
	textPositionRight = false // Пропс для условного добавления класса
}) => {
	const ref = useRef(null)
	const isVisible = useIntersectionObserver({
		target: ref,
		threshold: 0.5
	})
	// Используем classNames для динамического добавления класса
	const articleClass = classNames('article', {
		'article-reverse': textPositionRight == false, // Если textPositionRight true, добавится класс 'article-reverse'
		visible: isVisible,
		hidden: !isVisible
	})
	return (
		<div
			ref={ref}
			className={articleClass} // Применяем динамический класс
		>
			<div className='article-img'>
				<img src={img} alt='img' />
			</div>
			<div data-number={dataNumber} className='article-text'>
				{articleSubtitle && (
					<div className='article-subtitle'>{articleSubtitle}</div>
				)}
				{articleTitle && <div className='article-title'>{articleTitle}</div>}
				<p>{text}</p>
			</div>
		</div>
	)
}

export default OnasCard
