import { useCallback } from 'react'
import { M_NUMBER } from '../../utils/constans' // Импортируем номер телефона

const useWhatsApp = ({ message }) => {
	const openWhatsApp = useCallback(() => {
		const phoneNumber = M_NUMBER // Номер телефона в международном формате

		const isMobile =
			/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
				navigator.userAgent
			)

		// URL для WhatsApp Web или мобильной версии
		const whatsappUrl = isMobile
			? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
			: `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
					message
			  )}`

		// Открытие WhatsApp
		window.open(whatsappUrl, '_blank')
	}, [])

	return openWhatsApp
}

export default useWhatsApp
