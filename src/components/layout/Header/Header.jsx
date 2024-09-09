import { useAuth } from '../../../hooks/useAuth'
import styles from './Header.module.scss'
import { TiArrowLeft } from 'react-icons/ti'
import Humburger from '../Hamburger/Hamburger'
import { useLocation, useNavigate } from 'react-router-dom'
import { CiUser } from 'react-icons/ci'

const Header = ({ backLink = '/' }) => {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const { isAuth } = useAuth()

	return (
		<header className={styles.header}>
			{pathname !== '/' ? (
				<button
					onClick={() => {
						navigate(backLink)
					}}
				>
					<TiArrowLeft />
				</button>
			) : (
				<button
					onClick={() => {
						navigate(isAuth ? '/profile' : '/auth')
					}}
				>
					<CiUser color='white' />
				</button>
			)}
			{/* <UserProfile/> */}
			<Humburger />
		</header>
	)
}

export default Header
