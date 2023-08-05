import scrape from 'website-scraper'; // only as ESM, no CommonJS
import SaveToExistingDirectoryPlugin from 'website-scraper-existing-directory';

scrape({
	urls: ['http://dev.domartisan.com/'],
	directory: './helpers/',
	recursive: true,
	maxDepth: 50,
	prettifyUrls: true,
	filenameGenerator: 'bySiteStructure',
	sources: [
		{ selector: 'img', attr: 'src' },
		{ selector: 'link[rel="stylesheet"]', attr: 'href' },
		{ selector: 'script', attr: 'src' }
	],
	plugins: [new SaveToExistingDirectoryPlugin()]
});
