// fetch-posts.mjs

import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

const endpoint = 'https://dev.domartisan.com' + '/graphql';

const query = `
{
  artisanPosts(postTypes: ["lc_dynamic_template", "lc_partial", "mb-views"]) {
    title
    content
    type
    fileName
    slug
    permalink
  }
}
`;

axios
  .post(`${endpoint}`, { query })
  .then(async (response) => {
    const posts = response.data.data.artisanPosts;

    for (const post of posts) {
      const directory = `./src/wordpress/components/${post.fileName}`;
      const patternsDirectory = path.join(directory, 'patterns');

      // Create directories if they don't exist
      await fs.mkdir(directory, { recursive: true });
      await fs.mkdir(patternsDirectory, { recursive: true });

      // Create index.html with all the content
      await fs.writeFile(path.join(directory, 'index.html'), post.content);
      console.log(`File created: ${directory}/index.html`);

      // Load the content into Cheerio
      const $ = cheerio.load(post.content);

      // Extract each <section> and save it into a separate file
      $('section').each(async (index, section) => {
        const sectionContent = $.html(section);
        const sectionFilePath = path.join(patternsDirectory, `section_${index}.html`);
        await fs.writeFile(sectionFilePath, sectionContent);
        console.log(`File created: ${sectionFilePath}`);
      });
    }

    console.log('All files have been created successfully.');
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
