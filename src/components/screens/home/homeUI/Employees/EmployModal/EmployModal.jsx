import { Box, Modal, Typography } from '@mui/material'
import styles from './EmployModal.module.scss'
import CloseIcon from '@mui/icons-material/Close'

const EmployeeModal = ({ employee, onClose }) => {
	return (
		<Modal open={open} onClose={onClose} className={styles.modal}>
			<Box className={styles.modalContent}>
				{/* Close Button */}
				<div className={styles.closeButton} onClick={onClose}>
					<CloseIcon className={styles.closeButtonButton} />
				</div>

				<Box className={styles.modalIcon}>
					<img
						src={employee.employImg}
						alt='plan-icon'
						className={styles.modalIconImage}
					/>
				</Box>
				<Typography variant='h6' className={styles.modalTitle}>
					{employee.name}
				</Typography>
				<Typography className={styles.modalPrice}>
					{employee.position}
				</Typography>

				<Typography className={styles.modalDescription}>
					{employee.bio}
				</Typography>
			</Box>
		</Modal>
	)
}

export default EmployeeModal
