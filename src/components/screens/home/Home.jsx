import Layout from '../../layout/Layout'
import ModelsVS from './homeUI/ModelsVS/ModelsVS'
import Onas from './homeUI/Onas/Onas'
import Footer from '../../layout/Footer/Footer'
import VidioUI from './homeUI/VidioUI/VidioUI'

function Home() {
	// const { isAuth } = useAuth()
	// const navigate = useNavigate()

	return (
		<Layout>
			<VidioUI />
			<Onas />
			<ModelsVS />
			{/* <Footer /> */}
		</Layout>
	)
}

export default Home
