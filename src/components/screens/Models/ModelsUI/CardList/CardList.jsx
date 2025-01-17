import { Button } from '@mui/material'
import styles from './CardList.module.scss'
import Card from '../Card/Card'
import { useEffect, useState } from 'react'

const CardListWithLoadMore = ({ data, onLoadMore, isFetching }) => {
	const [dataLength, setDataLength] = useState(0) // Состояние для хранения длины данных

	useEffect(() => {
		if (data) {
			setDataLength(data.length)
		}
	}, [data])

	return (
		<div>
			<div className={styles.main__cards}>
				{data?.map((item, index) => (
					<Card
						key={item.id}
						data={item}
						delayInSeconds={
							dataLength ? (index - dataLength) * 0.3 : index * 0.3
						}
					/>
				))}
			</div>

			{data?.length > 0 && (
				<div
					style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}
				>
					<Button
						className={styles.loadMoreButton}
						onClick={onLoadMore}
						variant='outlined'
						disabled={isFetching}
						fullWidth
						color=''
					>
						{isFetching ? 'Загружается...' : 'Загрузить еще'}
					</Button>
				</div>
			)}
		</div>
	)
}

export default CardListWithLoadMore
