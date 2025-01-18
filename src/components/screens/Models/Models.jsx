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

	if (isLoading) {
		return <div>Loading...</div>
	}
	if (isError) {
		return <div>Error: {error.message}</div>
	}

	return (
		<Layout screen={'models'}>
			<main className={styles.main}>
				<div className='container'>
					<CardList
						data={data?.models}
						onLoadMore={loadMore}
						isFetching={isFetching}
					/>
				</div>
			</main>
		</Layout>
	)
}

export default Models
