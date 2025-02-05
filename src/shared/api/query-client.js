import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// staleTime: 1000 * 60 * 5, // 5 минут кэширования для предотвращения перезапросов
			// gcTime: 1000 * 60 * 10,
			// refetchOnWindowFocus: false
		}
	}
})
