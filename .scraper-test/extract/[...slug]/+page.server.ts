import axios from 'axios';
  import * as cheerio from 'cheerio';
  
  export async function load({params, page}) {
    let { slug } = params;
    console.log(slug)

    const url = slug;

    try {
      const response = await axios.get(url);

      if (!response) {
        throw new Error('Not found');
      }

      const $ = cheerio.load(response.data);
    
      // update all script tags to have a unique id and be absolute
        $('script').each((i, element) => {
            const currentSrc = $(element).attr('src');
            if (currentSrc && currentSrc.startsWith('/')) {
                $(element).attr('src', `${url}${currentSrc}`);
            }
            $(element).attr('id', `script-${i}`);
        });
        

      // Update all link takes that aren't absolute to be absolute
        $('a').each((i, element) => {
            const currentHref = $(element).attr('href');
            if (currentHref && currentHref.startsWith('/')) {
                $(element).attr('href', `${url}${currentHref}`);
            }
        });

        // Update all image sources that aren't absolute to be absolute
        $('img').each((i, element) => {
            const currentSrc = $(element).attr('src');
            if (currentSrc && currentSrc.startsWith('/')) {
                $(element).attr('src', `${url}${currentSrc}`);
            }
        });

      const updatedHtmlContent = $.html();

      return {
        props: {
          bodyContent: updatedHtmlContent,
        }
      }

    } catch (error) {
      console.error('Failed to fetch content from data:', url);

      return {
        props: {
          bodyContent: '<h1 id="lost">Not Found</h1>',
        },
      }
    }
  }