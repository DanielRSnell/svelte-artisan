import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import url from 'url';

const endpoint = 'https://dev.domartisan.com'; // Replace with your endpoint
const sitemapUrl = `${endpoint}/sitemap.xml`;

const config = {
	path_rules: [
		{
			path: '/blog',
			children: 1
		}
	],
	extension: '.html' // File extension for saving files
};

// Function to ensure directory exists
function ensureDirectoryExistence(dirPath) {
	if (fs.existsSync(dirPath)) {
		return;
	}
	ensureDirectoryExistence(path.dirname(dirPath));
	fs.mkdirSync(dirPath);
}

axios
	.get(sitemapUrl)
	.then((response) => {
		const $ = cheerio.load(response.data, { xmlMode: true });

		$('url > loc').each((index, element) => {
			const loc = $(element).text();
			const parsedUrl = url.parse(loc);
			const pathname = parsedUrl.pathname || '';
			const segments = pathname.split('/').filter((segment) => segment);

			// Check path_rules and limit to one child
			if (
				config.path_rules.some((rule) => {
					const regex = new RegExp(`^${rule.path}(/[^/]+){0,${rule.children}}/?$`);
					return regex.test(pathname);
				})
			) {
				const fileName = segments[segments.length - 1] || `page${index}`;
				const fileDir = `./src/wordpress/${segments.slice(0, -1).join('/')}`;
				const filePath = `${fileDir}/${fileName}${config.extension}`;

				// Ensure directory exists
				ensureDirectoryExistence(fileDir);

				// Download and save the page content
				axios
					.get(loc)
					.then((pageResponse) => {
						fs.writeFileSync(filePath, pageResponse.data); // Save the downloaded content
						console.log(`File created: ${filePath}`);
					})
					.catch((error) => {
						console.error(`An error occurred while downloading ${loc}:`, error);
					});
			}
		});
	})
	.catch((error) => {
		console.error('An error occurred:', error);
	});
