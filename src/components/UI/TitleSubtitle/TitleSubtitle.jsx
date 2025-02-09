import { useRef } from 'react'
import useIntersectionObserver from '../../../shared/hooks/useIntersectionObserver'
import './TitleSubtitle.scss'

const TitleSubtitle = ({ titleText, subtitleText }) => {
	const titleRef = useRef(null)
	const subtitleRef = useRef(null)

	const titleVisible = useIntersectionObserver({ target: titleRef })
	const subtitleVisible = useIntersectionObserver({ target: subtitleRef })

	return (
		<>
			<h1
				ref={titleRef}
				className={`servicesTitle ${titleVisible ? 'visible' : ''}`}
			>
				<span className='textPartLeft'>{titleText.split(' ')[0]}</span>{' '}
				<span className='textPartRight'>{titleText.split(' ')[1]}</span>
			</h1>
			<h2
				ref={subtitleRef}
				className={`servicesSubtitle ${subtitleVisible ? 'visible' : ''}`}
			>
				{subtitleText}
			</h2>
		</>
	)
}

export default TitleSubtitle
