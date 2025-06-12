import CloseIcon from '@mui/icons-material/Close'
import styles from './Modal.module.scss'
import { Box, Modal } from '@mui/material'
import clsx from 'clsx'

export const ModalUI = ({
	handleClose,
	isOpen,
	footerModal,
	headerModal,
	bodyModal,
	className
}) => {
	if (!isOpen) return null

	console.log('render modal')

	return (
		<Modal open={isOpen} onClose={handleClose} className={styles.modal}>
			<Box className={clsx(styles.modalContent, className)}>
				{/* Close Button */}
				<div className={styles.closeButton} onClick={handleClose}>
					<CloseIcon className={styles.closeButtonButton} />
				</div>
				{headerModal}
				<div className={styles.body}>{bodyModal}</div>
				{footerModal}
			</Box>
		</Modal>
	)
}
