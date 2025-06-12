import Layout from '../../layout/Layout'
import styles from './Models.module.scss'

export const ModelsLayout = ({
	search,
	buttons,
	filterDrawer,
	chips,
	modelsList
}) => {
	return (
		<Layout>
			<main className={styles.main}>
				{search}
				{buttons}
				{chips}
				{filterDrawer}
				{modelsList}
			</main>
		</Layout>
	)
}
