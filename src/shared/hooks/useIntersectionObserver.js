import { useState, useEffect } from 'react'

const useIntersectionObserver = ({
	threshold = 0.1,
	root = null,
	rootMargin = '0px',
	target
}) => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		if (!target?.current) return

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting)
			},
			{
				root,
				rootMargin,
				threshold
			}
		)

		observer.observe(target.current)

		return () => {
			if (target.current) {
				observer.unobserve(target.current)
			}
		}
	}, [target, root, rootMargin, threshold])

	return isVisible
}

export default useIntersectionObserver
