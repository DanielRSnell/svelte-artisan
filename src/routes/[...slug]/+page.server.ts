import got from 'got';
import { JSDOM } from 'jsdom';

export async function load({ params }) {
	const config = {
		project: 'https://tailwindui.com',
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

	try {
		const response = await got(url);

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
export const prerender = true;
