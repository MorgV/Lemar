import { Box, Typography } from '@mui/material'
import styles from './EmployModal.module.scss'
import { ModalUI } from '../../../../../UI/modal/Modal'

const EmployeeModal = ({ employee, onClose }) => {
	return (
		<ModalUI
			className={styles.modalContent}
			isOpen={!!employee}
			handleClose={onClose}
			bodyModal={
				<>
					<Typography variant='h6' className={styles.modalTitle}>
						{employee.name}
					</Typography>
					<Typography className={styles.modalPrice}>
						{employee.position}
					</Typography>

					<Typography className={styles.modalDescription}>
						{employee.bio}
					</Typography>
				</>
			}
			headerModal={
				<Box className={styles.modalIcon}>
					<img
						src={employee.employImg}
						alt='plan-icon'
						className={styles.modalIconImage}
					/>
				</Box>
			}
		/>
	)
}

export default EmployeeModal
