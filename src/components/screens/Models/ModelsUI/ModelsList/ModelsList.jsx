import CardList from '../CardList/CardList'

const ModelsList = ({
	isLoading,
	isError,
	error,
	data,
	loadMore,
	isFetching
}) => {
	return (
		<div className='container'>
			{isLoading ? (
				<div>Loading...</div>
			) : isError ? (
				<div>Error: {error.message}</div>
			) : (
				<CardList
					data={data?.models}
					total={data?.total}
					onLoadMore={loadMore}
					isFetching={isFetching}
				/>
			)}
		</div>
	)
}

export default ModelsList
