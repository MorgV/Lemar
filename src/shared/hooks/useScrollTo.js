import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const useScrollTo = (id, targetPage = '/') => {
	const navigate = useNavigate()

	const scrollTo = useCallback(() => {
		const element = document.getElementById(id)

		if (element) {
			// Если элемент есть, просто скроллим
			element.scrollIntoView({ behavior: 'smooth' })
		} else if (targetPage) {
			// Если элемент не найден, но указана целевая страница — переходим на неё
			navigate(targetPage, { state: { scrollToId: id } })
		}
	}, [id, navigate, targetPage])

	return scrollTo
}

export default useScrollTo
