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
		<>
			<div style={{ maxWidth: '1280px', margin: '0 auto' }}>
				{!hideHeader && <Header />}
				<section
					// className={cn(styles.wrapper, { [styles.otherPage]: !!heading })}
					style={{ backgroundImage: `url(${bgImage})` }}
				>
					{children && <div>{children}</div>}
				</section>
			</div>
			{!hideHeader && <Footer />}
		</>
	)
}

export default Layout
