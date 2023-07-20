const path = require('path');
const fs = require('fs-extra');

// define the paths
const sourcePagesPath = path.join(__dirname, '../.svelte-kit/output/prerendered/pages');
const destPagesPath = path.join(__dirname, '../src/wordpress');

const sourceDepsPath = path.join(__dirname, '../.svelte-kit/output/prerendered/dependencies');
const destDepsPath = path.join(__dirname, '../static');

// function to copy pages
async function copyPages() {
	if (fs.existsSync(sourcePagesPath)) {
		if (!fs.existsSync(destPagesPath)) {
			fs.mkdirSync(destPagesPath, { recursive: true });
		}
		await fs.copy(sourcePagesPath, destPagesPath, {
			filter: (src, dest) => {
				// exclude directories and files starting with "/" or "https://"
				if (path.basename(src).startsWith('/') || path.basename(src).startsWith('https://')) {
					return false;
				}
				// copy directories and HTML files only
				return fs.lstatSync(src).isDirectory() || path.extname(src) === '.html';
			}
		});
		console.log('Pages copied successfully.');
	} else {
		console.log(`Source pages path does not exist: ${sourcePagesPath}`);
	}
}

// function to copy dependencies
async function copyDeps() {
	if (fs.existsSync(sourceDepsPath)) {
		if (!fs.existsSync(destDepsPath)) {
			fs.mkdirSync(destDepsPath, { recursive: true });
		}
		await fs.copy(sourceDepsPath, destDepsPath, {
			filter: (src, dest) => {
				// exclude files starting with "/" or "https://"
				if (path.basename(src).startsWith('/') || path.basename(src).startsWith('https://')) {
					return false;
				}
				// copy files that start with 'wp-'
				return path.basename(src).startsWith('wp-');
			}
		});
		console.log('Dependencies copied successfully.');
	} else {
		console.log(`Source dependencies path does not exist: ${sourceDepsPath}`);
	}
}

// run the functions
copyPages();
copyDeps();
