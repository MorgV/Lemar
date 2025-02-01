import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { modelsClient } from '../../../shared/api/axios-request'
import Layout from '../../layout/Layout'
import styles from './Models.module.scss'
import CardList from './ModelsUI/CardList/CardList'

function Models() {
	console.log('render models')
	const [tableParams, setTableParams] = useState({
		page: 0,
		rowsPerPage: 8,
		sortBy: 'id',
		sortDirection: 'asc'
	})

	const { data, error, isLoading, isError, isFetching } = useQuery(
		modelsClient.getAllModelsInfiniteQueryOptions(
			{ tableParams },
			{ searchQuery: '' }
		)
	)

	const loadMore = () => {
		setTableParams(prev => ({
			...prev,
			rowsPerPage: prev.rowsPerPage + 4
		}))
	}

	return (
		<Layout screen={'models'}>
			<main className={styles.main}>
				<div className='container'>
					{isLoading ? (
						<div>Loading...</div>
					) : isError ? (
						<div>Error: {error.message}</div>
					) : (
						<CardList
							data={data?.models}
							onLoadMore={loadMore}
							isFetching={isFetching}
						/>
					)}
				</div>
			</main>
		</Layout>
	)
}

export default Models
