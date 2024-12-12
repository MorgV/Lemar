// import Header from './Header/Header'
import cn from 'clsx'
import styles from './Layout.module.scss'
import Header from '../layout/Header/Header'

// eslint-disable-next-line react/prop-types
const Layout = ({ children, bgImage, heading = '' }) => {
	return (
		<section
			className={cn(styles.wrapper, { [styles.otherPage]: !!heading })}
			style={{ backgroundImage: `url(${bgImage})` }}
		>
			<Header />

			{children && <div>{children}</div>}
		</section>
	)
}

export default Layout
