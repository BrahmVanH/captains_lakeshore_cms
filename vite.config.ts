import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				runtimeCaching: [
					{
						urlPattern: ({ url }) => {
							return url.pathname.startsWith('/graphql');
						},
						handler: 'CacheFirst' as const,
						options: {
							cacheName: 'api-cache',
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
			},
		}),
	],
});
