import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const useScrollTo = (id, targetPage = '/') => {
	const navigate = useNavigate()

	const scrollTo = useCallback(() => {
		const element = document.getElementById(id)
		console.log(element)
		if (element) {
			// Если элемент есть, просто скроллим
			element.scrollIntoView({ behavior: 'smooth' })
		} else if (targetPage) {
			// Если элемент не найден, но указана целевая страница — переходим на неё
			console.log(targetPage, 'targetPage')
			navigate(targetPage, { state: { scrollToId: id } })
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}, [id, navigate, targetPage])

	return scrollTo
}

export default useScrollTo
