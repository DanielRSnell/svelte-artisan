import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			force: false
		}),
		prerender: {
			concurrency: 5, // The number of pages that can be prerendered simultaneously.
			crawl: true, // Whether SvelteKit should find pages to prerender by following links from entries.
			entries: ['*'], // An array of pages to prerender, or start crawling from (if crawl: true).

			handleHttpError: ({ status, path, referrer, referenceType, message }) => {
				// Handle HTTP errors according to your own logic.
				if (status >= 500) {
					throw new Error(message);
				}
			},
			handleMissingId: ({ path, id, referrers, message }) => {
				// Handle missing id errors according to your own logic.
				console.warn(`Missing id: ${id} on path: ${path}`);
			},
			handleEntryGeneratorMismatch: ({ generatedFromId, entry, matchedId, message }) => {
				// Handle entry generator mismatch errors according to your own logic.
				console.warn(`Mismatch in entry generated from id: ${generatedFromId}`);
			}
		},
		serviceWorker: {
			register: true, // Whether to automatically register the service worker, if it exists.
			files: (filename) => !/\.DS_Store/.test(filename) // Determine which files in your static directory will be available in $service-worker.files.
		}
	}
};

export default config;
