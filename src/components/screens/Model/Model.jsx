import { useParams } from 'react-router-dom'

const Model = () => {
	const { id } = useParams() // Получение id из URL

	return (
		<div>
			<h1>Model ID: {id}</h1>
		</div>
	)
}

export default Model
