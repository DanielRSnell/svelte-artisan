import { chromium } from 'playwright';
import * as cheerio from 'cheerio'

export async function load() {
    const project = 'https://edg.io'
    const url = `${project}/`;
    
    try {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(url);

        let bodyHTML = await page.evaluate(() => document.documentElement.outerHTML);

        // Add your base URL to relative paths.
        // bodyHTML = bodyHTML.replace(/href="\//g, `href="${project}/`);
        // bodyHTML = bodyHTML.replace(/src="\//g, `src="${project}/`);

        // // Remove base URL from the href attributes in anchor tags
        // bodyHTML = bodyHTML.replace(new RegExp(`href="${project}`, 'g'), 'href="');

        await browser.close();

        const $ = cheerio.load(bodyHTML);

         // // Update 'src' attribute of tags.
    $('[src]').each((i, element) => {
        const currentSrc = $(element).attr('src');
        if (currentSrc.startsWith('/')) {
            $(element).attr('src', `${url}${currentSrc}`);
        }
    });

    // Update 'href' attribute of tags.
    $('[href]').each((i, element) => {
        const currentHref = $(element).attr('href');
        if (currentHref.startsWith('/')) {
            $(element).attr('href', `${url}${currentHref}`);
        }
    });

        $('a').each((i, element) => {
            const currentHref = $(element).attr('href');
            if (currentHref && currentHref.startsWith(project)) {
                $(element).attr('href', currentHref.replace(project, ''));
            }
        });

        $('#__NEXT_DATA__').remove();

        return {
            props: {
                bodyContent: $.html(),
            }
        }
    } catch (error) {
        console.error('Failed to fetch content from data:', project);

        // Return default values or handle the error as needed
        return {
            props: {
                bodyContent: '<h1 id="lost">Not Found</h1>',
                headContent: '<script id="lost-script" />',
            },
        }
    }
}
