import puppeteer from 'puppeteer';

export async function load() {
	const project = 'https://edg.io';
	const url = `${project}/`;

	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(url);

		let bodyHTML = await page.evaluate(() => document.body.innerHTML);

		// Add your base URL to relative paths.
		bodyHTML = bodyHTML.replace(/href="\//g, `href="${project}/`);
		bodyHTML = bodyHTML.replace(/src="\//g, `src="${project}/`);

		// Remove base URL from the href attributes in anchor tags
		bodyHTML = bodyHTML.replace(new RegExp(`href="${project}`, 'g'), 'href="');

		await browser.close();

		return {
			props: {
				bodyContent: bodyHTML
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
