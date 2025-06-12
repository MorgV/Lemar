import { useMemo, useState } from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import RequestButton from '../../../../../UI/Button/Button'
import useWhatsApp from '../../../../../../shared/hooks/useWhatsApp'
import styles from './CardPlan.module.scss'
import { ModalUI } from '../../../../../UI/modal/Modal'

const CardPlan = ({ name, price, description, icon }) => {
	const [open, setOpen] = useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const openWhatsApp = useWhatsApp({
		message: `Добрый день! Меня заинтересовала услуга: ${name}`
	})

	return (
		<>
			{useMemo(
				() => (
					<Card className={styles.card} style={{ borderRadius: '20px' }}>
						<CardContent className={styles.cardContent}>
							<Box className={styles.icon}>
								<img src={icon} alt='plan-icon' className={styles.iconImage} />
							</Box>
							<h2 className={styles.title}>{name}</h2>
							<p className={styles.description}>{description}</p>
							<div style={{ marginTop: '30px' }}>
								<RequestButton
									text='Подробнее'
									className={styles.button}
									onClick={handleOpen}
								/>
							</div>
						</CardContent>
					</Card>
				),
				[]
			)}
			<ModalUI
				isOpen={open}
				handleClose={handleClose}
				headerModal={
					<div>
						<Box className={styles.modalIcon}>
							<img
								src={icon}
								alt='plan-icon'
								className={styles.modalIconImage}
							/>
						</Box>
					</div>
				}
				bodyModal={
					<div>
						<Typography variant='h6' className={styles.modalTitle}>
							{name}
						</Typography>
						<Typography className={styles.modalDescription}>
							{description}
						</Typography>
						<Typography className={styles.modalPrice}>{price}</Typography>
					</div>
				}
				footerModal={
					<div style={{ marginTop: '20px' }}>
						<RequestButton
							text='Оставить заявку'
							className={styles.button}
							onClick={openWhatsApp}
						/>
					</div>
				}
			/>
		</>
	)
}

export default CardPlan
