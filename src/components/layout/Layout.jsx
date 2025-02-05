// import Header from './Header/Header'
import cn from 'clsx'
import styles from './Layout.module.scss'
import Header from '../layout/Header/Header'
import Footer from './Footer/Footer'

// eslint-disable-next-line react/prop-types
const Layout = ({ children, bgImage, heading = '' }) => {
	return (
		<div>
			<section
				className={cn(styles.wrapper, { [styles.otherPage]: !!heading })}
				style={{ backgroundImage: `url(${bgImage})` }}
			>
				<Header rr={screen == 'models' ? false : undefined} />
				{children && <div>{children}</div>}
			</section>
			<Footer />
		</div>
	)
}

export default Layout
