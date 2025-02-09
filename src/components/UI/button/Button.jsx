import styles from './Button.module.scss'

const RequestButton = ({ link, text, onClick }) => {
	return (
		<div className={styles.buttonWrapper}>
			<a onClick={onClick} href={link} className={styles.button}>
				{text}
			</a>
		</div>
	)
}

export default RequestButton
