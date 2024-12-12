// import styles from './motion.module.scss'
// import cn from 'clsx'
import { motion } from 'motion/react'

const block = (blockType, children, finalAnimate, transition) => {
	let motionBlock

	// Иницилизация блока
	if (blockType == 'p') {
		motionBlock = (
			<motion.p animate={finalAnimate} transition={transition}>
				{children}
			</motion.p>
		)
	} else if (blockType == 'div') {
		motionBlock = (
			<motion.div animate={finalAnimate} transition={transition}>
				{children}
			</motion.div>
		)
	}
	return motionBlock
}

const Motion = ({
	children,
	blockType,
	isInView,
	animate,
	transition = { duration: 1 }
}) => {
	const finalAnimate =
		animate ?? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 })

	return block(blockType, children, finalAnimate, transition)
}

export default Motion
