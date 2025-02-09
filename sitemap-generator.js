import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import path from 'path'
import reactSitemapGenerator from 'react-sitemap-generator'

reactSitemapGenerator({
	baseUrl: 'https://lemar-models.ru', // Замените на URL вашего сайта
	routes: [
		'/', // Главная страница
		'/models', // Страница "О нас"
		'/models/male',
		'models/female' // Страница "Контакты"
		// Добавьте другие страницы сюда
	],
	outputPath: path.join(__dirname, 'public/sitemap.xml')
})
