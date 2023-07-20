import got from 'got';
import * as cheerio from 'cheerio';
import * as urlModule from 'url';
import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({ params }) {
	const config = {
		project: 'https://dev.domartisan.com',
		absolute: false
	};

	function GenerateRoute() {
		const keys = Object.keys(params);
		let route = '';
		keys.forEach((key) => {
			const disallowedCharacters = ["\\", "/", ":", "*", "?", "\"", "<", ">", "|", "#", "%", "[", "]", "(", ")"];
			if (disallowedCharacters.some(char => params[key].includes(char))) {
				throw error(404, 'Not Found');
			}
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

		console.log(response.body);
		const $ = cheerio.load(response.body);

		$('img[src]').each((i, element) => {
			let src = $(element).attr('src');
			if (src && !src.startsWith('http')) {
				src = `https://media.domartisan.com/${src}`;
				$(element).attr('src', src);
			}
		});

		$('a[href]').each((i, element) => {
			let attr = $(element).is('a') ? 'href' : 'src';
			let elementUrl = $(element).attr(attr);

			if (elementUrl) {
				let parsedURL = urlModule.parse(elementUrl, true, true);
				if (parsedURL.host === urlModule.parse(config.project).host) {
					let relativePath = parsedURL.pathname + (parsedURL.search || '') + (parsedURL.hash || '');
					$(element).attr(attr, relativePath);
				}
			}
		});

		const dom = $('#boost').html();
		console.log(dom);

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
