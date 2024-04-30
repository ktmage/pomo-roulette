/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					...require('daisyui/src/theming/themes')['wireframe'],
				},
			},
		],
	},
};
