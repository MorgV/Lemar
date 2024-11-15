import Layout from '../Layout'
import styles from './Onas.module.scss'

function Onas() {
	// const { isAuth } = useAuth()
	// const navigate = useNavigate()
	return (
		<Layout bgImage={'/images/home-bg.jpg'}>
			<div className={styles.wrapper}>
				<h1>О нас</h1>
				<div className={styles.wrapper__list}>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero sequi
						veritatis saepe recusandae fugit doloremque, ut animi pariatur
						numquam maiores totam consectetur iste maxime at sit voluptate
						voluptatibus quis quidem cupiditate asperiores unde quas ea amet.
						Voluptatum blanditii
					</p>
					<p>
						minima perspiciatis id repellat tenetur dolor dolorem et nihil
						similique aut quia maiores commodi magni ex ad voluptatum? Ullam ex
						explicabo nobis enim illo quibusdam at exercitationem nisi,
						consequatur quo delectus quae neque sed repellat numquam fugiat!
						Ipsam hic repudiandae recusandae vel.
					</p>
				</div>
			</div>
		</Layout>
	)
}

export default Onas
