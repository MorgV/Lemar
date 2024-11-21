import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.scss'
import Router from './routes/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from './components/layout/Header/Header'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Header />
			<Router />
		</QueryClientProvider>
	</StrictMode>
)
