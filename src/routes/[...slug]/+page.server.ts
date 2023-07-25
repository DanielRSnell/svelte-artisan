import got from 'got';
import * as cheerio from 'cheerio';

export async function load({ params }) {
	const config = {
		project: 'https://spotlight.tailwindui.com',
		absolute: false
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

		const $ = cheerio.load(response.body);

		const attributes = ['src', 'href', 'srcset'];

		// Iterate over each attribute
		attributes.forEach(attr => {
			// Select all elements with the given attribute
			$(`[${attr}]`).each((i, element) => {
				// If the attribute starts with '/', prefix it with the project path
				let attrValue = $(element).attr(attr);
				if (attrValue.startsWith('/')) {
					$(element).attr(attr, config.project + attrValue);
				}
			});
		});

		const dom = $('html').html();

		return {
			props: {
				bodyContent: dom.split(config.project).join(''),
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
