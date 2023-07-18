import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetWind,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';

export default defineConfig({
	content: {
		filesystem: ['**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}']
	},
	presets: [presetWind(), presetAttributify(), presetIcons(), presetTypography(), presetWebFonts()]
});
