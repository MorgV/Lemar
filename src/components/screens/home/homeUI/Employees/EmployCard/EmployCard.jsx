import { Box } from '@mui/material'
import styles from './EmployCard.module.scss'

const EmployCard = ({ name, position, employImg }) => {
	return (
		<div className={styles.employCard}>
			<Box className={styles.employImg}>
				<img src={employImg} alt='employ-Img' loading='lazy' />
			</Box>
			<h2>{name}</h2>
			<h3>{position}</h3>
		</div>
	)
}

export default EmployCard
