import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@medusajs/ui/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		theme: {
			fontSize: {
				"heading1-bold": [
					"50px",
					{
						lineHeight: "100%",
						fontWeight: "700",
					},
				],
				"heading2-bold": [
					"30px",
					{
						lineHeight: "100%",
						fontWeight: "700",
					},
				],
				"heading3-bold": [
					"24px",
					{
						lineHeight: "100%",
						fontWeight: "700",
					},
				],
				"heading4-bold": [
					"20px",
					{
						lineHeight: "100%",
						fontWeight: "700",
					},
				],
				"body-bold": [
					"18px",
					{
						lineHeight: "100%",
						fontWeight: "700",
					},
				],
				"body-semibold": [
					"18px",
					{
						lineHeight: "100%",
						fontWeight: "600",
					},
				],
				"body-medium": [
					"18px",
					{
						lineHeight: "100%",
						fontWeight: "500",
					},
				],
				"base-bold": [
					"16px",
					{
						lineHeight: "100%",
						fontWeight: "600",
					},
				],
				"base-medium": [
					"16px",
					{
						lineHeight: "100%",
						fontWeight: "500",
					},
				],
				"small-bold": [
					"14px",
					{
						lineHeight: "140%",
						fontWeight: "700",
					},
				],
				"small-medium": [
					"14px",
					{
						lineHeight: "140%",
						fontWeight: "500",
					},
				],
			},
			extend: {
				colors: {
					"red-1": "#FF0000",
					"grey-1": "#F7F7F7",
					"grey-2": "#8A8A8A",
				},
			},
		},
		plugins: [require("tailwind-scrollbar-hide")],
	}
};

export default config;