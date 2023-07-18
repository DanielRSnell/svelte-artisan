export const prerender = true;

import got from 'got';
import * as cheerio from 'cheerio'

export async function load({ params }) {
	const config = {
		project: 'https://domartisan.com',
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
    console.log(`🔥 ${url} is building.`)
	try {
		const response = await got(url.split('/?').join('?'));

		if (!response) {
			throw new Error('Not found');
		}

		const $ = cheerio.load(response.body);

// 		$('a[href], img[src]').each((i, element) => {
//     let attr = $(element).is('a') ? 'href' : 'src';

//     let parsedURL = url.parse($(element).attr(attr), true, true);
//     if (parsedURL.host === url.parse(baseURL).host) {
//         let relativePath = parsedURL.pathname + (parsedURL.search || '') + (parsedURL.hash || '');
//         $(element).attr(attr, relativePath);
//     }
// });

		const dom = $('html').html();


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
				headContent: '<script id="lost-script" />'
			}
		};
	}
}
