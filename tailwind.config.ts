import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@medusajs/ui/dist/**/*.{js,ts,jsx,tsx}',
		'./node_modules/swiper/swiper-bundle.css'
	],
	theme: {
		fontSize: {
				sm: '0.8rem',
				base: '1rem',
				xl: '1.25rem',
				'2xl': '1.563rem',
				'3xl': '1.953rem',
				'4xl': '2.441rem',
				'5xl': '3.052rem',

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
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				"red-1": "#FF0000",
				"grey-1": "#F7F7F7",
				"grey-2": "#8A8A8A",
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)",
				},
				skeleton: {
					DEFAULT: "hsl(var(--skeleton))",
				}
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [
		require("tailwind-scrollbar-hide"),
		plugin(function ({ addBase }) {
			addBase({
				':root': {
					'--sidebar-background': '0 0% 98%',
					'--sidebar-foreground': '240 5.3% 26.1%',
					'--sidebar-primary': '240 5.9% 10%',
					'--sidebar-primary-foreground': '0 0% 98%',
					'--sidebar-accent': '240 4.8% 95.9%',
					'--sidebar-accent-foreground': '240 5.9% 10%',
					'--sidebar-border': '220 13% 91%',
					'--sidebar-ring': '217.2 91.2% 59.8%',
				},
				'.dark': {
					'--sidebar-background': '240 5.9% 10%',
					'--sidebar-foreground': '240 4.8% 95.9%',
					'--sidebar-primary': '224.3 76.3% 48%',
					'--sidebar-primary-foreground': '0 0% 100%',
					'--sidebar-accent': '240 3.7% 15.9%',
					'--sidebar-accent-foreground': '240 4.8% 95.9%',
					'--sidebar-border': '240 3.7% 15.9%',
					'--sidebar-ring': '217.2 91.2% 59.8%',
				},
			});
		}),
	],
};

export default config;
