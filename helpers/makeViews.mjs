// fetch-content.mjs

import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const endpoint = 'https://dev.domartisan.com' + '/graphql';

const query = `
{
  artisanPosts(postTypes: ["lc_dynamic_template", "lc_partial", "mb-views", "lc_section", "lc_block"]) {
    title
    content
    type
    fileName
    slug
    permalink
  }
  singlePost: posts(first: 1) {
    nodes {
      title
      content
      slug
    }
  }
  pages: pages {
    nodes {
      title
      content
      slug
    }
  }
}
`;

axios
	.post(`${endpoint}`, { query })
	.then(async (response) => {
		const { artisanPosts, singlePost, pages } = response.data.data;

		const directory = './src/components/wordpress/views';

		// Create directories if they don't exist
		await fs.mkdir(directory, { recursive: true });

		await Promise.all([
			...artisanPosts.map(async (post) => {
				const postTypeDirectory = path.join(directory, post.type);
				await fs.mkdir(postTypeDirectory, { recursive: true });
				const filePath = path.join(postTypeDirectory, `${post.fileName}.html`);
				await fs.writeFile(filePath, post.content);
				console.log(`File created: ${filePath}`);
			}),
			...singlePost.nodes.map(async (post) => {
				const postTypeDirectory = path.join(directory, 'posts');
				await fs.mkdir(postTypeDirectory, { recursive: true });
				const filePath = path.join(postTypeDirectory, `${post.slug}.html`);
				await fs.writeFile(filePath, post.content);
				console.log(`File created: ${filePath}`);
			}),
			...pages.nodes.map(async (page) => {
				const postTypeDirectory = path.join(directory, 'pages');
				await fs.mkdir(postTypeDirectory, { recursive: true });
				const filePath = path.join(postTypeDirectory, `${page.slug}.html`);
				await fs.writeFile(filePath, page.content);
				console.log(`File created: ${filePath}`);
			})
		]);

		console.log('All files have been created successfully.');
	})
	.catch((error) => {
		console.error('An error occurred:', error);
	});
