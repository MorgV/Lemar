import { useNavigate } from 'react-router-dom'
import Layout from '../../layout/Layout'
import Button from '../../UI/button/Button'
import styles from './Home.module.scss'
import { useAuth } from '../../../hooks/useAuth'

function Home() {
	const { isAuth } = useAuth()
	const navigate = useNavigate()
	return (
		<Layout bgImage={'/images/home-bg.jpg'}>
			<Button clickHandler={() => navigate(isAuth ? '/new-workout' : '/auth')}>
				{isAuth ? 'New' : 'Sign in'}
			</Button>

			<h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
			{/* Counters */}
		</Layout>
	)
}

export default Home
