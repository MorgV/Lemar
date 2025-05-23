import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.scss'
import Router from './shared/routes/routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { queryClient } from './shared/api/query-client'

import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@mui/material/styles'
import theme from './utils/them'

createRoot(document.getElementById('root')).render(
	<HelmetProvider>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<Router />
				<ReactQueryDevtools />
			</ThemeProvider>
		</QueryClientProvider>
	</HelmetProvider>
)
