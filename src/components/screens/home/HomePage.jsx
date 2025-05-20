import ModelsVS from './homeUI/ModelsVS/ModelsVS'
import Onas from './homeUI/Onas/Onas'
import VidioUI from './homeUI/VidioUI/VidioUI'
import ServicesNew from './homeUI/ServicesNew/ServicesNew'
import Employees from './homeUI/Employees/Employees'
import DetailedInformation from './homeUI/DetailedInformation/DetailedInformation'
import { HomePageLayout } from './HomePageLayout'
function HomePage() {
	console.log('render HomePage')
	return (
		<HomePageLayout
			VidioUI={<VidioUI />}
			Onas={<Onas />}
			ServicesNew={<ServicesNew />}
			ModelsVS={<ModelsVS />}
			DetailedInformation={<DetailedInformation />}
			Employees={<Employees />}
		/>
	)
}

export default HomePage
