import {} from 'module'

const ServiceCard = ({ paragraph, title, price }) => {
	return (
		<div>
			<p>
				<h1>{title}</h1>
				{paragraph}
				<br />
				<br />
			</p>
		</div>
	)
}

export default ServiceCard
