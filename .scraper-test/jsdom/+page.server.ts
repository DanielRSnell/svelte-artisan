import axios from 'axios';
import { JSDOM } from 'jsdom';

export async function load() {
	const project = 'https://edg.io';
	const url = `${project}/`;

	try {
		const response = await axios.get(url);

		if (!response) {
			throw new Error('Not found');
		}

		const dom = new JSDOM(response.data);
		const document = dom.window.document;

		// Update 'src' attribute of tags.
		const srcElements = document.querySelectorAll('[src]');
		srcElements.forEach((element) => {
			const currentSrc = element.getAttribute('src');
			if (currentSrc.startsWith('/')) {
				element.setAttribute('src', `${project}${currentSrc}`);
			}
		});

		// Update 'href' attribute of tags.
		const hrefElements = document.querySelectorAll('[href]');
		hrefElements.forEach((element) => {
			const currentHref = element.getAttribute('href');
			if (currentHref.startsWith('/')) {
				element.setAttribute('href', `${project}${currentHref}`);
			}
		});

		// Update 'href' attribute of anchor tags.
		const aElements = document.querySelectorAll('a');
		aElements.forEach((element) => {
			const currentHref = element.getAttribute('href');
			if (currentHref && currentHref.startsWith(project)) {
				element.setAttribute('href', currentHref.replace(project, ''));
			}
		});

		return {
			props: {
				bodyContent: dom.serialize()
			}
		};
	} catch (error) {
		console.error('Failed to fetch content from data:', project);

		// Return default values or handle the error as needed
		return {
			props: {
				bodyContent: '<h1 id="lost">Not Found</h1>',
				headContent: '<script id="lost-script" />'
			}
		};
	}
}
