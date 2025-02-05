import { Button } from '@mui/material'
import styles from './CardList.module.scss'
import Card from '../Card/Card'
import { useEffect, useState } from 'react'

const CardList = ({ data, onLoadMore, isFetching }) => {
	const [dataLength, setDataLength] = useState(0) // Состояние для хранения длины данных
	console.log(data)
	useEffect(() => {
		if (data) {
			setDataLength(data.length)
		}
	}, [data])

	return (
		<div>
			<div className={styles.main__cards}>
				{dataLength
					? data?.map((item, index) => (
							<Card
								key={item.id}
								data={item}
								delayInSeconds={
									dataLength ? (index - dataLength) * 0.3 : index * 0.3
								}
							/>
					  ))
					: 'Models undefined'}
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
						{isFetching ? 'Загружается...' : 'Показать еще'}
					</Button>
				</div>
			)}
		</div>
	)
}

export default CardList
