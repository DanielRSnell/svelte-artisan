import got from 'got';
import * as cheerio from 'cheerio';

export async function load({ params }) {
	const config = {
		project: 'https://dev.domartisan.com/', // Fixed typo
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

		// Uncommented the following section to handle 'src' and 'srcset'
		const attributes = ['src', 'srcset'];

		// Iterate over each attribute
		attributes.forEach((attr) => {
			// Select all elements with the given attribute
			$(`[${attr}]`).each((i, element) => {
				// If the attribute starts with '/', prefix it with the project path
				let attrValue = $(element).attr(attr);
				if (attrValue.startsWith('/')) {
					$(element).attr(attr, config.project + attrValue);
				}
			});
		});

		// You can include the line below if you want to remove all script tags
		// $('script').remove();
		// Iterate over each img tag
		$('img').each((i, elem) => {
			// Get the list of all attributes
			let attributes = Object.keys(elem.attribs);

			// Filter attributes that start with 'data-' or 'srcset' and remove them
			attributes
				.filter((attr) => attr.startsWith('data-') || attr === 'srcset')
				.forEach((attr) => {
					$(elem).removeAttr(attr);
				});
		});

		$('a').each(function (i, link) {
			let href = $(link).attr('href');
			if (href && href.startsWith('https://dev.domartisan.com')) {
				$(link).attr('href', href.replace('https://dev.domartisan.com', ''));
			}
		});
		$('.skip-link').remove();
		$('script').remove();
		const dom = $('body').html();

		return {
			props: {
				bodyContent: dom
			}
		};
	} catch (error) {
		console.error('Failed to fetch content from data:', url);

		return {
			props: {
				bodyContent: '<h1 id="lost">Not Found</h1>',
				headContent: '<script id="lost-script" />' // Ensured self-closing tag
			}
		};
	}
}

export const prerender = true;
