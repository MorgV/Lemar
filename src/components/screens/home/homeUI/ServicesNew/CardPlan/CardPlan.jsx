import { useState } from 'react'
import {
	Card,
	CardContent,
	Typography,
	Box,
	Modal,
	IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import RequestButton from '../../../../../UI/Button/Button'
import styles from './CardPlan.module.scss'

const CardPlan = ({ name, price, description, icon }) => {
	const [open, setOpen] = useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<>
			<Card className={styles.card} style={{ borderRadius: '20px' }}>
				<CardContent className={styles.cardContent}>
					<Box className={styles.icon}>
						<img src={icon} alt='plan-icon' className={styles.iconImage} />
					</Box>
					<h2 className={styles.title}>{name}</h2>
					<p className={styles.description}>{description}</p>
					<RequestButton
						text='Подробнее'
						className={styles.button}
						onClick={handleOpen}
					/>
				</CardContent>
			</Card>

			{/* Modal */}
			<Modal open={open} onClose={handleClose} className={styles.modal}>
				<Box className={styles.modalContent}>
					{/* Close Button */}
					<div className={styles.closeButton} onClick={handleClose}>
						<CloseIcon className={styles.closeButtonButton} />
					</div>

					<Box className={styles.modalIcon}>
						<img src={icon} alt='plan-icon' className={styles.modalIconImage} />
					</Box>
					<Typography variant='h6' className={styles.modalTitle}>
						{name}
					</Typography>
					<Typography className={styles.modalDescription}>
						{description}
					</Typography>
					<Typography className={styles.modalPrice}>{price}</Typography>
					<RequestButton
						text='Оставить заявку'
						className={styles.button}
						link={'/'}
					/>
				</Box>
			</Modal>
		</>
	)
}

export default CardPlan
