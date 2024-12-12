import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.scss'
import Router from './shared/routes/routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './shared/api/query-client'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Router />
		</QueryClientProvider>
	</StrictMode>
)
