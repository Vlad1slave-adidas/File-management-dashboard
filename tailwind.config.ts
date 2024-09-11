import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'black-default': '#111726',
				'white-main': '#F6F8FF',
				'primary-color': '#6A29FF',
				'primary-color-hover': '#5521cc',
				'pink-error': '#F62B6F',
				'green-success': '#3EC43B',
			},
			boxShadow: {
				'toast-shadow':
					'0px 0px 2px 0px rgba(0, 0, 0, 0.12),0px 8px 16px 0px rgba(0, 0, 0, 0.14)',
			},
			keyframes: {
				toastSlide: {
					'0%': { transform: 'translateX(100%)', opacity: '10%' },
					'100%': { transform: 'translateX(0)', opacity: '100%' },
				},
			},
			animation: {
				toastSlide: 'toastSlide .5s ease',
			},
		},
	},
	plugins: [],
}
export default config
