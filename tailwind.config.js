/** @type {import('tailwindcss').Config} */

const baseTheme = {
	'color-scheme': 'normal',
	fontFamily: 'Poetsen One, Potta One, sans-serif',
	'--rounded-box': '0rem',
	'--rounded-btn': '0.4rem',
	'--rounded-badge': '1.9rem',
	'--tab-radius': '0rem',

	primary: '#ffffff',
	secondary: '#597353',

	info: '#00aeff',
	success: '#00f937',
	warning: '#ff9600',
	error: '#f02654',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				work: {
					...baseTheme,
					'base-100': '#b91c1c',
				},
				break: {
					...baseTheme,
					'base-100': '#047857',
				},
			},
		],
	},
};
