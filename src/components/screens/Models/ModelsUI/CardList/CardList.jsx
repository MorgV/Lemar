import { Button } from '@mui/material'
import styles from './CardList.module.scss'
import Card from '../Card/Card'

const CardList = ({ data, onLoadMore, isFetching, total }) => {
	return (
		<div>
			<div className={styles.main__cards}>
				{data?.length
					? data.map(item => <Card key={item.id} data={item} />)
					: 'Models undefined'}
			</div>

			{data?.length > 0 && total - data.length !== 0 && (
				<div
					style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}
				>
					<Button
						className={styles.loadMoreButton}
						onClick={onLoadMore}
						variant='outlined'
						disabled={isFetching}
						fullWidth
						color='111'
					>
						{isFetching ? 'Загружается...' : 'Показать еще'}
					</Button>
				</div>
			)}
		</div>
	)
}

export default CardList
