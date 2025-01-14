import { forwardRef } from 'react'
import './OnasCard.scss'

const OnasCard = forwardRef(
	(
		{
			text,
			img,
			dataNumber,
			articleSubtitle = 'get started',
			articleTitle = 'Title',
			textPositionRight = false,
			isVisible
		},
		ref
	) => {
		return (
			<div ref={ref} className={`article ${isVisible ? 'visible' : 'hidden'}`}>
				{textPositionRight ? (
					<>
						<div className='article-img'>
							<img src={img} alt='img' />
						</div>
						<div data-number={dataNumber} className='article-text'>
							{articleSubtitle && (
								<div className='article-subtitle'>{articleSubtitle}</div>
							)}
							{articleTitle && (
								<div className='article-title'>{articleTitle}</div>
							)}
							<p>{text}</p>
						</div>
					</>
				) : (
					<>
						<div data-number={dataNumber} className='article-text'>
							{articleSubtitle && (
								<div className='article-subtitle'>{articleSubtitle}</div>
							)}
							{articleTitle && (
								<div className='article-title'>{articleTitle}</div>
							)}
							<p>{text}</p>
						</div>
						<div className='article-img'>
							<img src={img} alt='img' />
						</div>
					</>
				)}
			</div>
		)
	}
)

export default OnasCard
