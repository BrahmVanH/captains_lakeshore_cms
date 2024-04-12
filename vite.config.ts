import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/

export default defineConfig({
	plugins: [react()],
});
// VitePWA({
// 	registerType: 'autoUpdate',
// 	manifest: {
// 		name: 'Lake Superior Captains',
// 		short_name: 'LSC',
// 		theme_color: '#000000',
// 		background_color: '#ffffff',
// 		display: 'standalone',
// 		start_url: '/',
// 		icons: [
// 			{
// 				src: '/logo.svg',
// 				sizes: '48x48',
// 				type: 'image/svg+xml',
// 			},
// 			{
// 				src: '/logo.svg',
// 				sizes: '96x96',
// 				type: 'image/svg+xml',
// 			},
// 			{
// 				src: '/logo.svg',
// 				sizes: '192x192',
// 				type: 'image/svg+xml',
// 			},
// 		],
// 	},
// 	workbox: {
// 		runtimeCaching: [
// 			{
// 				urlPattern: ({ url }) => {
// 					return url.pathname.startsWith('/graphql');
// 				},
// 				handler: 'CacheFirst' as const,
// 				options: {
// 					cacheName: 'api-cache',
// 					cacheableResponse: {
// 						statuses: [0, 200, 204],
// 					},
// 				},
// 			},
// 		],
// 	},
// }),
