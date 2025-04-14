// import Header from './Header/Header'

import Header from './Header/Header'
import Footer from './Footer/Footer'
import { useLocation } from 'react-router-dom'
// eslint-disable-next-line react/prop-types
const Layout = ({ children, bgImage }) => {
	const location = useLocation()
	const hideHeader =
		/^\/models\/female\/\d+/.test(location.pathname) ||
		/^\/models\/male\/\d+/.test(location.pathname)
	return (
		<div>
			{!hideHeader && <Header />}
			<section
				// className={cn(styles.wrapper, { [styles.otherPage]: !!heading })}
				style={{ backgroundImage: `url(${bgImage})` }}
			>
				{children && <div>{children}</div>}
			</section>
			{!hideHeader && <Footer />}
		</div>
	)
}

export default Layout
