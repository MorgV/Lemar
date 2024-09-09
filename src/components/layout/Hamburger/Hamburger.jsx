import styles from './Hamburger.module.scss'
import { CiMenuFries } from 'react-icons/ci'
import { IoCloseOutline } from 'react-icons/io5'
import Menu from './Menu'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'

const Hamburger = () => {
	const { isShow, ref, setIsShow } = useOnClickOutside(false)
	return (
		<div className={styles.wrapper} ref={ref}>
			<button onClick={() => setIsShow(!isShow)}>
				{isShow ? (
					<IoCloseOutline color='white' />
				) : (
					<CiMenuFries color='white' />
				)}
			</button>
			<Menu isShow={isShow} />
		</div>
	)
}

export default Hamburger
