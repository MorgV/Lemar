import Header from './Header/Header'
import cn from 'clsx'
import styles from './Layout.module.scss'
// eslint-disable-next-line react/prop-types
const Layout = ({ children, bgImage, heading = '', backLink = '/' }) => {
	return (
		<section
			className={cn(styles.wrapper, { [styles.otherPage]: !!heading })}
			style={{ backgroundImage: `url(${bgImage})` }}
		>
			<Header backLink={backLink} />
			{heading && <h1 className={styles.heading}>{heading}</h1>}
			{children && <div>{children}</div>}
		</section>
	)
}

export default Layout
