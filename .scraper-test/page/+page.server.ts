export const prerender = true;

import got from 'got';
import { JSDOM } from 'jsdom';

export async function load({ params }) {
	const config = {
		project: 'https://artisan.feather.blog',
		absolute: true
	};

	function GenerateRoute() {
		const keys = Object.keys(params);
		let route = '';
		keys.forEach((key) => {
			route += params[key] + '/';
		});
		return route;
	}

	const url = `${config.project}/` + GenerateRoute();
	console.log(`🔥 ${url} is building.`);
	try {
		const response = await got(url.split('/?').join('?'));

		if (!response) {
			throw new Error('Not found');
		}

		const dom = new JSDOM(response.body);
		const { document } = dom.window;

		const updatePath = (element, attribute) => {
			const attr = element.getAttribute(attribute);
			if (attr && attr.startsWith('/')) {
				element.setAttribute(
					attribute,
					config.absolute ? `${config.project}${attr}` : attr.slice(1)
				);
			}
		};

		document.querySelectorAll('img, script, link').forEach((element) => {
			updatePath(element, 'src');
		});

		document.querySelectorAll('a, link').forEach((element) => {
			updatePath(element, 'href');
		});

		// Select the element
		const element = dom.window.document.querySelector(
			'body > section > main > section.normal-post-content.bg-white.py-12.sm\\:py-16.lg\\:py-20 > div > div > div.lg\\:col-span-9 > div.mt-8.sm\\:mt-12.sm\\:pt-12'
		);

		// Remove the element
		if (element) {
			element.remove();
		}

		// Select the form
		const form = dom.window.document.querySelector('.newsletter-form');

		// Modify the action attribute and add HTMX attributes
		if (form) {
			form.action = '/subscribe';
			form.removeAttribute('action');
			form.setAttribute('hx-post', '/subscribe');
			form.setAttribute('hx-trigger', 'submit');
		}

		const aElements = dom.window.document.querySelectorAll('a');

		// Iterate over 'a' elements
		aElements.forEach((aElement) => {
			// Skip if 'noopener' attribute exists
			if (aElement.rel.includes('noopener')) return;

			// Parse the URL
			const url = new URL(aElement.href);

			// Change href to a relative URL
			aElement.href = url.pathname + url.search + url.hash;

			// Add the hx-boost attribute
			aElement.setAttribute('hx-boost', 'true');
		});

		let button = document.querySelector('button');

		// Create a new anchor element
		let a = document.createElement('a');

		// Copy attributes from the button to the anchor
		for (let i = 0; i < button.attributes.length; i++) {
			let attr = button.attributes[i];
			a.setAttribute(attr.name, attr.value);
		}

		// Set href attribute using the button's value
		a.href = `${config.project}/page/${button.value}`;

		// Copy the button's innerHTML to the anchor
		a.innerHTML = button.innerHTML;

		// Replace the button with the anchor in the DOM
		button.parentNode.replaceChild(a, button);

		// Check for header and footer - then remove
		// Select the header and footer by their tag
		const header = dom.window.document.querySelector('header');
		const footer = dom.window.document.querySelector('footer');

		// Remove the header and footer
		if (header) header.remove();
		if (footer) footer.remove();

		return {
			props: {
				bodyContent: dom.serialize()
			}
		};
	} catch (error) {
		console.error('Failed to fetch content from data:', url);

		return {
			props: {
				bodyContent: '<h1 id="lost">Not Found</h1>',
				headContent: '<script id="lost-script" />'
			}
		};
	}
}
